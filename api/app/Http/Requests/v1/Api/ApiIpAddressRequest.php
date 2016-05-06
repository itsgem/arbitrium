<?php

namespace App\Http\Requests\v1\Api;

use App\Errors;
use App\Models\ApiKey;
use App\Models\ApiIpAddress;
use App\Nrb\Http\v1\Requests\NrbRequest;

class ApiIpAddressRequest extends NrbRequest
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
                'api_key_id' => 'exists:api_keys,id',
                'ip_address' => 'required|ip',
                'name'       => 'max:255'
            ];

            if (is_client_user_logged_in())
            {
                $rules['api_key_id'] .= '|required';
            }
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
            if ($method == 'POST' || $method == 'PUT')
            {
                if (is_client_user_logged_in())
                {
                    // Validate if IP address accessing is owned by user
                    if ($this->route('ip_address'))
                    {
                        $is_ip_owned_by_client = ApiIpAddress::findOrFail($this->route('ip_address'))
                            ->isOwnedByClientId(get_logged_in_client_id());

                        if (!$is_ip_owned_by_client)
                        {
                            $errors['ip_address'] = trans('errors.'.Errors::UNAUTHORIZED_API_KEY_IP_ADDRESS);
                        }
                    }

                    // Validate if api_key_id entered is owned by user
                    $is_key_owned_by_client = ApiKey::findOrFail($this->get('api_key_id'))
                        ->isOwnedByClientId(get_logged_in_client_id());

                    if (!$is_key_owned_by_client)
                    {
                        $errors['api_key_id'] = trans('errors.'.Errors::UNAUTHORIZED_API_KEY);
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