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
                'ipAddresses'            => 'required_if:isWhitelist,1|array',
                'isApiCallRestricted'    => 'boolean',
                'isWhitelist'            => 'boolean',
                'isActive'               => 'boolean',
                'isTestKey'              => 'boolean'
            ];

            if (is_admin_user_logged_in())
            {
                $rules['clientId'] = 'exists:clients,id|required';
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
            if ($this->get('ipAddresses'))
            {
                $rules_ipAddresses = [
                    'ipAddress' => ['required', 'ip'],
                ];
                foreach ($this->get('ipAddresses') as $ip_address)
                {
                    $validation = Validator::make(
                        [
                            'ipAddress' => get_val($ip_address, 'ipAddress', ''),
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