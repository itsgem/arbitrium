<?php

namespace App\Http\Requests\v1\Client;

use App\Nrb\Http\v1\Requests\NrbRequest;
use App\Models\ClientSubscription;

// Client\ClientsController::subscribeConfirm
class SubscriptionConfirmRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [];
        $method = $this->method();
        if ($method == 'POST')
        {
            $rules = [
                'success' => 'required|boolean',
                'token'   => 'required'
            ];
        }

        return $rules;
    }
}