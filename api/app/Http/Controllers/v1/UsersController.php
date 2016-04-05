<?php

namespace App\Http\Controllers\v1;

use App\Http\Requests\v1\ChangeEmailRequest;
use App\Http\Requests\v1\ChangePasswordRequest;
use App\Http\Requests\v1\ClientUserRequest;
use App\Http\Requests\v1\Field\UsernameRequest;
use App\Http\Requests\v1\ForgotPasswordRequest;
use App\Http\Requests\v1\PasswordResetRequest;
use App\Http\Requests\v1\UserVerificationRequest;
use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\ClientServices;
use App\Services\UserServices;

class UsersController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return [
            'checkUsernameAvailability',
            'forgotPassword', 'resetPassword',
            'getResetPasswordToken', 'getChangeEmailToken', 'getVerifyEmailToken',
            'registerClient', 'verifyEmail'
        ];
    }

    protected function getMethods()
    {
        return [
            'activate'          => 'Activate User',
            'cancelChangeEmail' => 'Cancel Change Email Request',
            'changeEmail'       => 'Change Email Request',
            'doChangeEmail'     => 'Change Email',
            'changePassword'    => 'Change Password',
            'deactivate'        => 'Deactivate User',
            'forgotPassword'    => 'Forgot Password',
            'resetPassword'     => 'Reset Password',
            'registerClient'    => 'Client Registration',
            'unlock'            => 'Unlock User',
            'verifyEmail'       => 'Verify User'
        ];
    }

    public function activate($id, UserServices $service)
    {
        return $service->activate($id);
    }

    public function cancelChangeEmail(UserServices $service)
    {
        return $service->cancelChangeEmail();
    }

    public function changeEmail(ChangeEmailRequest $request, UserServices $service)
    {
        return $service->changeEmail($request);
    }

    public function doChangeEmail(ChangeEmailRequest $request, UserServices $service)
    {
        return $service->doChangeEmail($request, $this);
    }

    public function getChangeEmailToken(PasswordResetRequest $request, UserServices $service)
    {
        return $service->getChangeEmailToken($request);
    }

    public function changePassword(ChangePasswordRequest $request, UserServices $service)
    {
        return $service->changePassword($request);
    }

    public function checkUsernameAvailability(UsernameRequest $request, UserServices $service)
    {
        return $this->respondWithSuccess();
    }

    public function deactivate($id, UserServices $service)
    {
        return $service->deactivate($id);
    }

    public function forgotPassword(ForgotPasswordRequest $request, UserServices $service)
    {
        return $service->forgotPassword($request, $this);
    }

    public function resetPassword(PasswordResetRequest $request, UserServices $service)
    {
        return $service->resetPassword($request, $this);
    }

    public function getResetPasswordToken(PasswordResetRequest $request, UserServices $service)
    {
        return $service->getResetPasswordToken($request);
    }

    public function registerClient(ClientUserRequest $request, ClientServices $service)
    {
        return $service->register($this, $request);
    }

    public function unlock($id, UserServices $service)
    {
        return $service->unlock($id);
    }

    public function getVerifyEmailToken(PasswordResetRequest $request, UserServices $service)
    {
        return $service->getVerifyEmailToken($request);
    }

    public function verifyEmail(UserVerificationRequest $request, UserServices $service)
    {
        return $service->verifyEmail($request, $this);
    }

}