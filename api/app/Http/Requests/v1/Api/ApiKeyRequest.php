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
                'name'                   => 'max:255',
                'description'            => 'required|max:255',
                'permissions'            => 'array',
                'ip_addresses'           => 'required_if:is_whitelist,1|array',
                'is_api_call_restricted' => 'boolean',
                'is_whitelist'           => 'boolean',
                'is_active'              => 'boolean',
                'is_testKey'             => 'boolean'
            ];

            if (is_admin_user_logged_in())
            {
                $rules['client_id'] = 'exists:clients,id|required';
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
            // Validate IP Addresses
            if ($this->get('ip_addresses'))
            {
                $rules_ip_addresses = [
                    'ip_address' => ['required', 'ip'],
                ];
                foreach ($this->get('ip_addresses') as $ip_address)
                {
                    $validation = Validator::make(
                        [
                            'ip_address' => get_val($ip_address, 'ip_address', ''),
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