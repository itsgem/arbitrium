<?php
namespace App\Http\Controllers\v1;

use App\Errors;
use App\Http\Requests\v1\LoginRequest;
use App\Http\Requests\v1\LoginSocialRequest;
use App\Models\ResetToken;
use App\Nrb\Http\v1\Controllers\ApiController;
use App\Nrb\NrbAuth;
use App\User;

class AuthController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return ['login']; // Manually log API Access
    }

    protected function getMethods()
    {
        return [
            'login'     => 'Login',
            'loginViaSocial'     => 'Login via Social',
            'logout'    => 'Logout'
        ];
    }

    public function login(LoginRequest $request)
    {
        $user = User::usernameOrEmail($request->get('login'))->userType($request->get('user_type'))->active()->first();
        if ($user)
        {
            if ($user->isLocked())
            {
                return $this->respondWithError(Errors::ACCOUNT_LOCKED);
            }

            $can_login = true;
            if ($user->isClient())
            {
                $can_login = $user->client->isApproved();
            }

            if ($can_login)
            {
                if (NrbAuth::attempt(['username' => $user->username, 'password' => $request->get('password'), 'id' => $user->id]))
                {
                    log_api_access($this, __FUNCTION__);
                    $data = [
                        'token'     => $user->access_token->token,
                        'lifetime'  => get_sesssion_lifetime(),
                        'timezone'  => $user->timezone,
                        'username'  => $user->username
                    ];
                    return $this->respondWithSuccess($data);
                }

                // Increment Invalid Login Attempts
                $user->increment('login_attempts');
                if ($user->isMaxLogAttempts())
                {
                    log_api_error($this, __FUNCTION__, $user);
                    return $this->respondWithError(Errors::ACCOUNT_LOCKED);
                }
            }
        }
        log_api_error($this, __FUNCTION__, get_user_from_request($request));
        $this->addResponseMessage(Errors::INACTIVE);
        $this->addResponseMessage(Errors::FORGOT_PASSWORD);
        return $this->respondWithError(Errors::INVALID_CREDENTIALS);
    }

    public function loginViaSocial(LoginSocialRequest $request)
    {
        $user = User::providerId($request->get('provider_id'))->first();
        if (!$user)
        {
            $user = new User([
                'name'          => $request->get('name'),
                'username'      => $request->get('username'),
                'email_address' => $request->get('email_address')
            ]);
            $user->provider     = $request->get('provider');
            $user->provider_id  = $request->get('provider_id');
            $user->activated_at = current_datetime();
        }

        auth()->login($user);
        log_api_access($this, __FUNCTION__);

        $user = $user->fresh();
        return $this->respondWithSuccess([
                    'token'     => $user->access_token->token,
                    'lifetime'  => get_sesssion_lifetime(),
                    'timezone'  => $user->timezone,
                    'username'  => $user->username
                ]);
    }

    public function logout(LoginRequest $request)
    {
        NrbAuth::logout();
        return $this->respondWithSuccess();
    }
}