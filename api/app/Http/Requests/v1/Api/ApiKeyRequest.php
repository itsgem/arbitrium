<?php

namespace App\Http\Requests\v1\Api;

use App\Nrb\Http\v1\Requests\NrbRequest;
use Illuminate\Support\Facades\Validator;

class ApiKeyRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [];
        $method = $this->method();
        if ($method == 'POST' || $method == 'PUT')
        {
            $rules = [
                'client_id'              => 'exists:clients,id',
                'name'                   => 'max:255',
                'description'            => 'required|max:255',
                'permissions'            => 'array',
                'ip_addresses'           => 'array',
                'is_api_call_restricted' => 'boolean',
                'is_whitelist'           => 'boolean',
                'is_active'              => 'boolean',
                'is_test_key'            => 'boolean'
            ];

            if (is_admin_user_logged_in())
            {
                $rules['client_id'] .= '|required';
            }
        }

        return $rules;
    }

    public function validate()
    {
        $errors = [];
        // validate based on the rules defined above
        $instance = $this->getValidatorInstance();
        if (!$instance->passes())
        {
            $errors = $instance->errors()->toArray();
        }
        else
        {
            // Validate Permissions
            $rules_permissions = [
                'api_permission_id' => ['required', 'exists:api_permissions,id'],
                'value'             => ['required', 'boolean'],
            ];
            if ($this->get('permissions'))
            {
                foreach ($this->get('permissions') as $permission)
                {
                    $validation = Validator::make(
                        [
                            'api_permission_id' => get_val($permission, 'api_permission_id', ''),
                            'value'             => get_val($permission, 'value', ''),
                        ],
                        $rules_permissions
                    );
                    if ($validation->fails())
                    {
                        $errors['permissions'][] = $validation->messages()->toArray();
                    }
                }
            }
            // Validate IP Addresses
            $rules_ip_addresses = [
                'api_key_id' => ['exists:api_keys,id'],
                'ip_address' => ['required', 'ip'],
                'name'       => ['max:255']
            ];
            if ($this->get('ip_addresses'))
            {
                foreach ($this->get('ip_addresses') as $ip_address)
                {
                    $validation = Validator::make(
                        [
                            'api_key_id' => get_val($ip_address, 'api_key_id', ''),
                            'ip_address' => get_val($ip_address, 'ip_address', ''),
                            'name'       => get_val($ip_address, 'name', ''),
                        ],
                        $rules_ip_addresses
                    );
                    if ($validation->fails())
                    {
                        $errors['ip_addresses'][] = $validation->messages()->toArray();
                    }
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