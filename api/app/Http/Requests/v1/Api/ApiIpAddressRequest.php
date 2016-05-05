<?php

namespace App\Http\Requests\v1\Api;

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
        }

        return $rules;
    }
}