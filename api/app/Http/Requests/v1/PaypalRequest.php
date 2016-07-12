<?php

namespace App\Http\Requests\v1;

use App\Models\ClientSubscription;
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
            $rules = [
                'subscription_id' => 'required|exists:subscriptions,id,deleted_at,NULL',
                'term'            => 'in:'.implode(',', ClientSubscription::getTerms()),
                'callback_url'    => 'required'
            ];
        }

        return $rules;
    }
}