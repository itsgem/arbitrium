<?php

namespace App\Http\Requests\v1;

use App\Http\Requests\v1\Field\PasswordRequest;
use App\Nrb\Http\v1\Requests\NrbRequest;

// UsersController::getChangeEmailToken
// UsersController::resetPassword
// UsersController::getResetPasswordToken
// UsersController::getVerifyEmailToken
class PasswordResetRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [];
        switch($this->method())
        {
            case 'GET': // RESET PASSWORD
                $rules = [
                    'token'     => 'required',
                    'user_type' => 'required'
                ];
                break;
            case 'PATCH': // DO RESET PASSWORD
                $rules = [
                    'token'     => 'required|exists:reset_tokens,password_reset_token,deleted_at,NULL',
                    'password'  => with(new PasswordRequest())->rules()['password']
                ];
                break;
        }

        return $rules;
    }
}