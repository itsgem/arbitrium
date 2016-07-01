<?php

namespace App\Services;

use DB;
use App\Errors;
use App\Models\ResetToken;
use App\Nrb\NrbServices;
use App\User;

class UserServices extends NrbServices
{
    // UsersController::activate
    public function activate($id)
    {
        $user = User::findOrFail($id);

        // if client's approval status is PENDING do not allow activation of account
        if ($user->isClient() && $user->client->isApprovalPending())
        {
            return $this->respondWithSuccess();
        }

        $user->activate();
        return $this->respondWithSuccess();
    }

    // UsersController::cancelChangeEmail
    public function cancelChangeEmail()
    {
        $user = auth()->user();
        $user->cancelChangeEmail();
        return $this->respondWithSuccess([], trans("messages.success_cancel_email_change_request"));
    }

    // UsersController::changeEmail
    public function changeEmail($request)
    {
        $user = auth()->user();
        $user->sendChangeEmail($request->get('callback_url'), $request->get('new_email_address'));

        return $this->respondWithSuccess([], trans("messages.success_email_change_request"));
    }

    // UsersController::getChangeEmailToken
    public function getChangeEmailToken($request)
    {
        return $this->getResetToken(ResetToken::NEW_EMAIL_ADDRESS, $request);
    }

    // UsersController::doChangeEmail
    public function doChangeEmail($request, $controller)
    {
        return DB::transaction(function () use ($request, $controller)
        {
            $field = ResetToken::NEW_EMAIL_ADDRESS;
            $reset_token = ResetToken::token($field, $request->get('token'))->notExpired($field)->first();
            if ($reset_token)
            {
                $user = $reset_token->user;
                $exists = User::emailAddress($user->new_email_address)->userType($user->user_type)->first();
                if ($exists)
                {
                    return $this->respondWithError(Errors::EMAIL_TAKEN);
                }
                $reset_token->resetTokens($field);
                $user->setNewEmailAddress();
                $user->logout();
                log_api_access($controller, 'doChangeEmail', $user);
                return $this->respondWithSuccess();
            }
            return $this->respondWithError(Errors::EXPIRED_TOKEN);
        });
    }

    // UsersController::changePassword
    public function changePassword($request)
    {
        $user = auth()->user();
        $user->update(['password' => $request->password]);

        // TODO-GEM: send notification that user has changed password?
        // with(new MailServices())->changePassword($user);

        return $this->respondWithSuccess();
    }

    // UsersController::deactivate
    public function deactivate($id)
    {
        $user = User::findOrFail($id);
        if ($user->canDelete())
        {
            $user->deactivate();

            if ($user->isClient())
            {
                // [Core-API] Deactivate account
                // @TODO-Arbitrium: While waiting for deactivate endpoint in core, reset allowed requests and decisions
                $user->client->coreApiSubscribe();
            }

            return $this->respondWithSuccess();
        }
        return $this->respondWithError(Errors::CANNOT_DEACTIVATE, ['str_replace' => ['model' => 'User']]);
    }

    // UsersController::forgotPassword
    public function forgotPassword($request, $controller)
    {
        $login = $request->get('login');
        $user = User::select('id', 'username', 'email_address', 'user_type', 'name')->usernameOrEmail($login)->userType($request->get('user_type'))->first();
        // Note: Check if username is same as parameter; 0 value disregards the username query.
        if ($user && ($login == $user->email_address || $login == $user->username))
        {
            $user->sendForgotPassword($request->get('callback_url'));
            log_api_access($controller, __FUNCTION__, $user);
        }
        else
        {
            log_api_error($controller, __FUNCTION__, get_user_from_request($request));
        }
        return $this->respondWithSuccess();
    }

    // UsersController::resetPassword
    public function resetPassword($request, $controller)
    {
        return DB::transaction(function () use ($request, $controller)
        {
            $field = ResetToken::PASSWORD_RESET;
            $reset_token = ResetToken::token($field, $request->get('token'))->notExpired($field)->first();
            if ($reset_token)
            {
                $reset_token->resetTokens($field);
                $user = $reset_token->user;
                $user->password = $request->get('password');
                $user->unlock();
                $user->logout();
                log_api_access($controller, 'doResetPassword', $user);

                // If asked to reset password for the first time
                // (Happens when admin creates account for client)
                if (!$user->hasApi())
                {
                    // [Core-API] Signup
                    $user->registerApiCredentials();
                }

                return $this->respondWithSuccess();
            }
            return $this->respondWithError(Errors::EXPIRED_TOKEN);
        });
    }

    // UsersController::getResetPasswordToken
    public function getResetPasswordToken($request)
    {
        return $this->getResetToken(ResetToken::PASSWORD_RESET, $request);
    }

    // UsersController::unlock
    public function unlock($id)
    {
        User::findOrFail($id)->unlock();
        return $this->respondWithSuccess();
    }

    // UsersController::getVerifyEmailToken
    public function getVerifyEmailToken($request)
    {
        return $this->getResetToken(ResetToken::VERIFICATION, $request);
    }

    // UsersController::verifyEmail
    public function verifyEmail($request, $controller)
    {
        return DB::transaction(function () use ($request, $controller)
        {
            $field = ResetToken::VERIFICATION;
            $reset_token = ResetToken::token($field, $request->get('token'))->notExpired($field)->first();
            if ($reset_token)
            {
                $user = $reset_token->user;
                $user->activate();

                $reset_token->resetTokens($field);
                // if user is a client we need to send pending approval email to system admin
                if ($user->isClient())
                {
                    with(new MailServices())->clientVerifiedForApproval($user, $request->get('callback_url'));
                }

                log_api_access($controller, 'verifyEmail', $user);
                return $this->respondWithSuccess();
            }
            return $this->respondWithError(Errors::EXPIRED_TOKEN);
        });
    }

    private function getResetToken($field, $request)
    {
        $user_type = $request->get('user_type');
        $reset_token = ResetToken::codeOrToken($field, $request->get('token'))
            ->notExpired($field)
            ->whereHas('user', function($query) use ($user_type)
            {
                $query->userType($user_type);
            })->first();
        
        if ($reset_token)
        {
            $data = ['token' => $reset_token->getTokenField($field)];

            // if client, append client_id
            if($client = $reset_token->user->client)
            {
                $data['client_id'] = $client->id;
            }

            // if admin, append admin_id
            if($admin = $reset_token->user->admin)
            {
                $data['admin_id'] = $admin->id;
            }

            return $this->respondWithSuccess($data);
        }
        return $this->respondWithError(Errors::EXPIRED_TOKEN);
    }
}
