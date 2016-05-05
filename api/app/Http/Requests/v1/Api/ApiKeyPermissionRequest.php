<?php

namespace App\Http\Requests\v1\Api;

use App\Nrb\Http\v1\Requests\NrbRequest;

class ApiKeyPermissionRequest extends NrbRequest
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
                'api_permission_id' => 'required|exists:api_permissions,id',
                'value'             => 'required|boolean',
            ];
        }

        return $rules;
    }
}