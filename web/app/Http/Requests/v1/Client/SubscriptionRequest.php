<?php

namespace App\Http\Requests\v1\Client;

use App\Nrb\Http\v1\Requests\NrbRequest;

// Client\ClientsController::purchaseSubscription
class SubscriptionRequest extends NrbRequest
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
                'subscription_id'   => 'required|exists:subscriptions,id,deleted_at,NULL'
            ];
        }

        return $rules;
    }
}