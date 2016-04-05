<?php

namespace App\Http\Requests\v1;

use App\Nrb\Http\v1\Requests\NrbRequest;
use App\User;

// UsersController::forgotPassword
class ForgotPasswordRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'login'         => 'required',
            'user_type'     => 'required',
            'callback_url'  => 'required|url'
        ];
    }
}