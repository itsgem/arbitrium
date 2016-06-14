<?php

namespace App\Http\Requests\v1;

use App\Errors;
use App\Models\ClientSubscription;
use App\Nrb\Http\v1\Requests\NrbRequest;
use Illuminate\Support\Facades\Log;

class PaypalIpnRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    /**
     * Further Validations:
     * - Check whether subscription exists
     * - Check whether the payment_status is Completed
     * - Check that txn_id has not been previously processed
     * - Check that payment_amount/payment_currency are correct
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'txn_type'             => 'required',
            'txn_id'               => 'required_if:txn_type,'.ClientSubscription::PAYPAL_TRANSACTION_TYPE_SUBSCRIPTION_PAYMENT.'|unique:client_subscriptions,paypal_transaction_id',
            'recurring_payment_id' => 'required_if:txn_type,'.ClientSubscription::PAYPAL_TRANSACTION_TYPE_SUBSCRIPTION_PAYMENT,
            'payment_status'       => 'required_if:txn_type,'.ClientSubscription::PAYPAL_TRANSACTION_TYPE_SUBSCRIPTION_PAYMENT,
            'amount'               => 'required',
            'currency_code'        => 'required',
        ];

        return $rules;
    }

    public function validate()
    {
        $errors = [];
        $method = $this->method();
        // validate based on the rules defined above
        $instance = $this->getValidatorInstance();
        if (!$instance->passes())
        {
            $errors = $instance->errors()->toArray();
        }
        else
        {
            //----- HOOK: Subscription Payment
            if ($this->get('txn_type') == ClientSubscription::PAYPAL_TRANSACTION_TYPE_SUBSCRIPTION_PAYMENT)
            {
                $client_subscription = ClientSubscription::paypalAgreementId($this->get('recurring_payment_id'))->latest()->first();
                // Check whether subscription exists
                if ($client_subscription)
                {
                    // Check whether subscription payment match
                    if ($this->get('amount') != (float) $client_subscription->calculateTotal($client_subscription->term)
                        || $this->get('currency_code') != $client_subscription->currency)
                    {
                        $errors['subscription'] = trans('errors.'.Errors::INVALID_INPUT);
                    }
                }
                else
                {
                    $errors['recurring_payment_id'] = trans('errors.'.Errors::SUBSCRIPTION_INVALID);
                }
            }
        }

        if (!empty($errors))
        {
            Log::error('[IPN] Request Validation Errors: '.json_encode($errors));

            $this->errors = $errors;
            $this->failedValidation($instance);
        }
    }

    public function response(array $errors)
    {
        return parent::response($this->errors);
    }
}