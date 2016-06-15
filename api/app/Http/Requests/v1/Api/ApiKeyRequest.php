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
                'clientId'               => 'required|exists:clients,id',
                'name'                   => 'max:255',
                'description'            => 'required|max:255',
                'permissions'            => 'array',
                'ipAddresses'            => 'required_if:isWhitelist,1|array',
                'isApiCallRestricted'    => 'boolean',
                'isWhitelist'            => 'boolean',
                'isCctive'               => 'boolean',
                'isTestKey'              => 'boolean'
            ];
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
            $rules_ipAddresses = [
                'ipAddress' => ['required', 'ip'],
            ];
            if ($this->get('ipAddresses'))
            {
                foreach ($this->get('ipAddresses') as $ip_address)
                {
                    $validation = Validator::make(
                        [
                            // 'api_key_id' => get_val($ip_address, 'api_key_id', ''),
                            'ipAddress' => get_val($ip_address, 'ipAddress', ''),
                            // 'name'       => get_val($ip_address, 'name', ''),
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