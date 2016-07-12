<?php

namespace App\Http\Requests\v1\Client;

use App\Nrb\Http\v1\Requests\NrbRequest;
use App\Models\ClientSubscription;

// Client\ClientsController::subscribe
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
                'subscription_id' => 'required|exists:subscriptions,id,deleted_at,NULL',
                'term'            => 'required|in:'.implode(',', ClientSubscription::getTerms()),
                'is_auto_renew'   => 'required|boolean',
            ];
        }

        return $rules;
    }
}