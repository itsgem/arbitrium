<?php

namespace App\Http\Requests\v1;

use App\Errors;
use App\Models\ClientSubscription;
use App\Nrb\Http\v1\Requests\NrbRequest;

class PaypalIpnRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [
            'recurring_payment_id' => 'required',
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
            if ($this->get('recurring_payment_id'))
            {
                $client_subscription = ClientSubscription::paypalAgreementId($this->get('recurring_payment_id'))->first();

                // Validate if subscription exists
                if (!$client_subscription)
                {
                    $errors['recurring_payment_id'] = trans('errors.'.Errors::SUBSCRIPTION_INVALID);
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