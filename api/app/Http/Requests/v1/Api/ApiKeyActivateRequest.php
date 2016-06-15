<?php

namespace App\Http\Requests\v1\Api;

use App\Errors;
use App\Nrb\Http\v1\Requests\NrbRequest;
use App\Models\ApiKey;

class ApiKeyActivateRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [
            'isActive' => 'required|boolean'
        ];

        return $rules;
    }

    // public function validate()
    // {
    //     $errors = [];
    //     // validate based on the rules defined above
    //     $instance = $this->getValidatorInstance();
    //     if (!$instance->passes())
    //     {
    //         $errors = $instance->errors()->toArray();
    //     }
    //     else
    //     {
    //         // Validate API Key
    //         $api_key = ApiKey::findOrFail($this->route('api_key'));

    //         if (is_client_user_logged_in())
    //         {
    //             // Validate if API Key accessing is owned by user
    //             if (!$api_key->isOwnedByClientId(get_logged_in_client_id()))
    //             {
    //                 $errors['api_key'] = trans('errors.'.Errors::UNAUTHORIZED_API_KEY);
    //             }
    //         }
    //     }

    //     if (!empty($errors))
    //     {
    //         $this->errors = $errors;
    //         $this->failedValidation($instance);
    //     }
    // }
    // public function response(array $errors)
    // {
    //     return parent::response($this->errors);
    // }
}