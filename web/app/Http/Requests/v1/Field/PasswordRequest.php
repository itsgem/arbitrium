<?php

namespace App\Http\Requests\v1\Field;

use App\Nrb\Http\v1\Requests\NrbRequest;

// Admin/AdminsController::store
// Admin/AdminsController::update
// Admin/ClientsController::store
// Admin/ClientsController::update
// Client/ClientsController::update
// UsersController::forgotPassword
// UsersController::getChangeEmailToken
// UsersController::getResetPasswordToken
// UsersController::getVerifyEmailToken
// UsersController::registerClient
// UsersController::resetPassword
class PasswordRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return ['password' => 'required|min:8|max:32|password|common_password|confirmed'];
    }
}