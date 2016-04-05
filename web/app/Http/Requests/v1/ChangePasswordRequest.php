<?php

namespace App\Http\Requests\v1;

use App\Errors;
use App\Http\Requests\v1\Field\PasswordRequest;
use App\Nrb\Http\v1\Requests\NrbRequest;
use Hash;
use Illuminate\Http\Exception\HttpResponseException;

// UsersController::changePassword
class ChangePasswordRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [];
        if ($this->method() == 'PUT')
        {
            $rules = [
                'current_password'  => 'required',
                'password'          => with(new PasswordRequest())->rules()['password']
            ];
        }
        return $rules;
    }

    public function validate()
    {
        if ($this->method() == 'PUT')
        {
            $invalid = false;
            $errors = [];

            // validate based on the rules defined above
            $instance = $this->getValidatorInstance();
            if (!$instance->passes())
            {
                $invalid = true;
                $errors = $instance->errors()->toArray();
            }
            else
            {
                $current_password   = $this->get('current_password');
                $current_logged_in  = auth()->user();
                if (!$current_logged_in)
                {
                    throw new HttpResponseException($this->respondWithError(Errors::UNAUTHORIZED));
                }
                if (!Hash::check($current_password, $current_logged_in->password))
                {
                    $invalid = true;
                    $errors = ['current_password' => [trans('errors.'.Errors::INVALID_PASSWORD, ['attribute' => 'current password'])]];
                }
            }

            if ($invalid)
            {
                $this->errors = $errors;
                $this->failedValidation($instance);
            }
        }
    }

    public function response(array $errors)
    {
        return parent::response($this->errors);
    }
}