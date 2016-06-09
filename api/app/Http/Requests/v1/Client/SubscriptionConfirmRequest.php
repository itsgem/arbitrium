<?php

namespace App\Http\Requests\v1\Client;

use App\Errors;
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
                'token'   => 'required|exists:client_subscriptions,paypal_token_id'
            ];
        }

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
            if (is_client_user_logged_in())
            {
                if ($this->get('token'))
                {
                    $subscription = ClientSubscription::paypalTokenId($this->get('token'))->first();
                    $is_owned_by_client = $subscription->isOwnedByClientId(get_logged_in_client_id());

                    // Validate if token is owned by client
                    if ($is_owned_by_client)
                    {
                        // Validate if token already used for confirming an agreement
                        if ($subscription->hasAlreadyConfirmed())
                        {
                            $errors['token'] = trans('errors.'.Errors::PAYPAL_ALREADY_CONFIRMED, ['id' => $subscription->paypal_agreement_id]);
                        }
                        // Validate if subscription already cancelled
                        if ($subscription->isCancelled())
                        {
                            $errors['token'] = trans('errors.'.Errors::PAYPAL_ALREADY_CANCELLED, ['id' => $subscription->paypal_agreement_id]);
                        }
                    }
                    else
                    {
                        $errors['token'] = trans('errors.'.Errors::UNAUTHORIZED_PAYPAL_TOKEN);
                    }
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