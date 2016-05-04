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
        if ($method == 'POST' || $method == 'PUT')
        {
            $rules = [
                'slug'      => 'required|unique:api_permissions|max:255',
                'name'      => 'required|max:255',
                'parent_id' => 'integer',
            ];
        }

        return $rules;
    }
}