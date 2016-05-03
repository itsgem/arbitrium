<?php

namespace App\Http\Requests\v1\Api;

use App\Nrb\Http\v1\Requests\NrbRequest;

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
                'client_id'              => 'required|exists:clients,id',
                'token'                  => 'required',
                'name'                   => 'required|max:255',
                'description'            => 'max:255',
                'api_permissions'        => 'array',
                'is_api_call_restricted' => 'boolean',
                'is_whitelist'           => 'boolean',
                'is_active'              => 'boolean',
                'is_test_key'            => 'boolean'
            ];
        }

        return $rules;
    }
}