<?php

namespace App\Http\Requests\v1\Api;

use App\Nrb\Http\v1\Requests\NrbRequest;

class ApiIpAddressAssignRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [
            'api_key_id' => 'required|exists:api_keys,id'
        ];

        return $rules;
    }
}