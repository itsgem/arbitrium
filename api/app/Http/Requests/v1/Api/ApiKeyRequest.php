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
                'clientId'               => '',
                'name'                   => 'max:255',
                'description'            => 'required|max:255',
                'permissions'            => 'array',
                'ipAddresses'            => 'required_if:isWhitelist,1|array',
                'isApiCallRestricted'    => 'boolean',
                'isWhitelist'            => 'boolean',
                'isCctive'               => 'boolean',
                'isTestKey'              => 'boolean'
            ];

            if (is_admin_user_logged_in())
            {
                $rules['clientId'] .= '|required';
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
                'apiPermissionId'   => ['required', 'exists:api_permissions,id'],
                'value'             => ['required', 'boolean'],
            ];
            if ($this->get('permissions'))
            {
                foreach ($this->get('permissions') as $permission)
                {
                    //dd($permission);
                    $validation = Validator::make(
                        [
                            'apiPermissionId' => get_val($permission, 'apiPermissionId', ''),
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
            $rules_ipAddresses = [
                'api_key_id' => ['exists:api_keys,id'],
                'ipAddress' => ['required', 'ip'],
                'name'       => ['max:255']
            ];
            if ($this->get('ipAddresses'))
            {
                foreach ($this->get('ipAddresses') as $ip_address)
                {
                    $validation = Validator::make(
                        [
                            'api_key_id' => get_val($ip_address, 'api_key_id', ''),
                            'ipAddress' => get_val($ip_address, 'ipAddress', ''),
                            'name'       => get_val($ip_address, 'name', ''),
                        ],
                        $rules_ipAddresses
                    );
                    if ($validation->fails())
                    {
                        $errors['ipAddresses'][] = $validation->messages()->toArray();
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