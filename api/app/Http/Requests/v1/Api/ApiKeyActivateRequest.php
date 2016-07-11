<?php

namespace App\Http\Requests\v1\Api;

use App\Errors;
use App\Nrb\Http\v1\Requests\NrbRequest;
use App\Models\ApiKey;

class ApiKeyActivateRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [
            'is_active' => 'required|boolean'
        ];

        return $rules;
    }
}