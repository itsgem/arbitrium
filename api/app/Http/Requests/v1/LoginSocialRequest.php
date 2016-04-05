<?php

namespace App\Http\Requests\v1;

use App\Nrb\Http\v1\Requests\NrbRequest;

// AuthController::loginViaSocial
class LoginSocialRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [];
        if ($this->method() == 'POST')
        {
            $rules = [
                'provider'      => 'required',
                'provider_id'   => 'required',
                'name'          => 'required',
                'username'      => 'required', // TODO-GEM: need to check if unique
                'email_address' => 'required|email'
            ];
        }

        return $rules;
    }
}