<?php

namespace App\Http\Requests\v1\Admin;

use App\Errors;
use App\Models\Subscription;
use App\Nrb\Http\v1\Requests\NrbRequest;

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
                'name'                    => 'required|max:120',
                'description'             => 'required|max:120',
                'type'                    => 'required|in:'.Subscription::TYPE_TRIAL.','.Subscription::TYPE_PLAN,
                'country_id'              => 'required|exists:countries,id',
                'fee_monthly'             => 'required|money',
                'fee_monthly_maintenance' => 'required|money',
                'fee_yearly'              => 'required|money',
                'fee_yearly_license'      => 'required|money',
                'fee_yearly_maintenance'  => 'required|money',
                'fee_initial_setup'       => 'required|money',
                'max_api_calls'           => 'required|integer|min:0',
                'max_decisions'           => 'required|integer|min:0',
                'discounts'               => 'required|money',
                'order'                   => 'required|unique:subscriptions,order'
            ];
        }

        return $rules;
    }

    public function validate()
    {
        $errors = [];
        // validate based on the rules defined above
        $instance = $this->getValidatorInstance();
        if (!$instance->passes())
        {
            $errors = $instance->errors()->toArray();
        }
        else
        {
            // Validate that there should only be one TRIAL subscription
            if ($this->get('type') == Subscription::TYPE_TRIAL)
            {
                if (!$this->get('no_days')) {
                    $errors['no_days'] = trans('errors.'.Errors::SUBSCRIPTOIN_TRIAL_NUMBER_DAYS);
                }

                if (Subscription::type(Subscription::TYPE_TRIAL)->count() > 0)
                {
                    $errors['type'] = trans('errors.'.Errors::EXISTING_TRIAL_SUBSCRIPTION);
                }
            }
        }

        if (!empty($errors))
        {
            $this->errors = $errors;
            $this->failedValidation($instance);
        }
    }

    public function response(array $errors)
    {
        return parent::response($this->errors);
    }
}