<?php

namespace App\Http\Requests\v1;

use App\Nrb\Http\v1\Requests\NrbRequest;

// AuthController::login
// AuthController::logout
class LoginRequest extends NrbRequest
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
            case 'POST': // LOGIN
                $rules = [
                    'login' => 'required',
                    'password' => 'required',
                    'user_type' => 'required'
                ];
                break;
        }

        return $rules;
    }
}