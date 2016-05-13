<?php

namespace App\Http\Requests\v1\Admin;

use App\Nrb\Http\v1\Requests\NrbRequest;
use App\Models\Subscription;

// Admin/SubscriptionsController::store
// Admin/SubscriptionsController::update
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
        if ($method == 'POST' || $method == 'PUT')
        {
            $rules = [
                'name'                    => 'required',
                'type'                    => 'required|in:'.Subscription::TYPE_TRIAL.','.Subscription::TYPE_PLAN,
                'country_id'              => 'required|exists:countries,id',
                'fee_monthly'             => 'required|regex:'.get_regex_money(),
                'fee_monthly_maintenance' => 'required|regex:'.get_regex_money(),
                'fee_yearly'              => 'required|regex:'.get_regex_money(),
                'fee_yearly_license'      => 'required|regex:'.get_regex_money(),
                'fee_yearly_maintenance'  => 'required|regex:'.get_regex_money(),
                'fee_initial_setup'       => 'required|regex:'.get_regex_money(),
                'max_api_calls'           => 'required|integer|min:0',
                'max_decisions'           => 'required|integer|min:0',
                'discounts'               => 'required|regex:'.get_regex_money()
            ];
        }

        return $rules;
    }
}