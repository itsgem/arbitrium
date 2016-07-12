<?php

namespace App\Http\Requests\v1;

use App\Models\ClientSubscription;
use App\Nrb\Http\v1\Requests\NrbRequest;

class SubscriptionValidityRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'date' => 'date_format:Y-m-d',
            'term' => 'required|in:'.implode(',', ClientSubscription::getTerms()),
        ];
    }
}