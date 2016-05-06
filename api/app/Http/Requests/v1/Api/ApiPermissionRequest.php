<?php

namespace App\Http\Requests\v1\Api;

use App\Nrb\Http\v1\Requests\NrbRequest;

class ApiPermissionRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [];
        $method = $this->method();

        $permission_id = $this->route('api_permission');

        if ($method == 'POST' || $method == 'PUT')
        {
            $rules = [
                'name'      => 'required|max:255',
                'parent_id' => 'integer',
            ];

            if ($method == 'POST')
            {
                $rules['slug'] = 'required|unique:api_permissions,slug,'.$permission_id.'|max:255';
            }
        }

        return $rules;
    }
}