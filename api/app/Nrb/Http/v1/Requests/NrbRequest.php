<?php

namespace App\Nrb\Http\v1\Requests;

use App\Errors;
use App\Http\Requests\Request;
use App\Nrb\Http\v1\Traits\JsonResponseTrait;

class NrbRequest extends Request
{
    use JsonResponseTrait;

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [];
    }

    public function response(array $errors)
    {
        return $this->respondWithError(Errors::INVALID_INPUT, $errors);
    }
}