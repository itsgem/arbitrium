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
                'token'   => 'required'
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
                // Validate if IP address accessing is owned by user
                if ($this->get('token'))
                {
                    $subscription = ClientSubscription::paypalTokenId($this->get('token'))->first();

                    if (!$subscription->isOwnedByClientId(get_logged_in_client_id()))
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