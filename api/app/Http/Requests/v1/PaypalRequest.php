<?php

namespace App\Http\Requests\v1;

use App\Nrb\Http\v1\Requests\NrbRequest;

class PaypalRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $method = $this->method();

        $rules = [];

        if ($method == 'POST' || $method == 'PUT')
        {
            $rules = [];
        }

        return $rules;
    }
}