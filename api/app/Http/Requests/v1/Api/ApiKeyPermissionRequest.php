<?php

namespace App\Http\Requests\v1\Api;

use App\Errors;
use App\Nrb\Http\v1\Requests\NrbRequest;
use App\Models\ApiKey;
use App\Models\ApiKeyPermission;

class ApiKeyPermissionRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $method = $this->method();

        $rules = [
            'api_permission_id' => 'required|exists:api_permissions,id',
            'value'             => 'boolean',
        ];

        if ($method == 'POST' || $method == 'PUT')
        {
            $rules['value'] .= '|required';
        }

        return $rules;
    }

    public function validate()
    {
        $errors = [];
        $method = $this->method();

        // validate based on the rules defined above
        $instance = $this->getValidatorInstance();
        if (!$instance->passes())
        {
            $errors = $instance->errors()->toArray();
        }
        else
        {
            $permission = [
                'api_key_id'        => ($this->route('api_key')) ? $this->route('api_key') : '',
                'api_permission_id' => $this->get('api_permission_id', ''),
            ];

            // Validate API Key
            $api_key = ApiKey::findOrFail($permission['api_key_id']);
            $permission_exists = ApiKeyPermission::permission($permission)->count();

            // Add: Validate API Key Permission if already exist and prevent it from proceeding
            if ($method == 'POST')
            {
                if ($permission_exists)
                {
                    $errors['permission'] = trans('errors.'.Errors::EXISTING_API_KEY_PERMISSION);
                }
            }

            // Edit / Delete: Validate API Key Permission exists
            if ($method == 'PUT' || $method == 'DELETE')
            {
                if (!$permission_exists)
                {
                    $errors['permission'] = trans('errors.'.Errors::INVALID_API_KEY_PERMISSION);
                }
            }

            if (is_client_user_logged_in())
            {
                // Validate if API Key accessing is owned by user
                if (!$api_key->isOwnedByClientId(get_logged_in_client_id()))
                {
                    $errors['api_key_id'] = trans('errors.'.Errors::UNAUTHORIZED_API_KEY_IP_ADDRESS);
                }
            }
        }

        if (!empty($errors))
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