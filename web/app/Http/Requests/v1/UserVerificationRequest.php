<?php

namespace App\Http\Requests\v1;

use App\Models\ResetToken;
use App\Nrb\Http\v1\Requests\NrbRequest;

// UsersController::verifyEmail
class UserVerificationRequest extends NrbRequest
{
    private $errors;

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [
            'token'         => 'required',
            'callback_url'  => 'url'
        ];

        return $rules;
    }

    public function validate()
    {
        $invalid = false;
        $instance = $this->getValidatorInstance();
        if (!$instance->passes())
        {
            $invalid = true;
            $errors = $instance->errors()->toArray();
        }

        $token = $this->get('token');
        if ($token)
        {
            $reset_token = ResetToken::token(ResetToken::VERIFICATION, $token)->first();
            if ($reset_token)
            {
                if ($reset_token->user->isClient() && !$this->get('callback_url'))
                {
                    $invalid = true;
                    $errors['callback_url'] = [trans('validation.required', ['attribute' => 'callback url'])];
                }
            }
            else
            {
                $invalid = true;
                $errors['token'] = [trans('validation.exists', ['attribute' => 'token'])];
            }
        }

        if ($invalid)
        {
            $this->errors = $errors;
            $this->failedValidation($instance);
        }
    }

    public function response(array $errors)
    {
        return parent::response($this->errors);
    }
}