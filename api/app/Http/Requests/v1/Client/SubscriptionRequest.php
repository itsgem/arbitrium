<?php

namespace App\Http\Requests\v1\Client;

use App\Errors;
use App\Nrb\Http\v1\Requests\NrbRequest;
use App\Models\ClientSubscription;
use App\Models\Client;
use App\Models\Subscription;

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
                $client = Client::findOrFail(get_logged_in_client_id());
                $client_subscription = $client->subscription->subscription;

                $subscription = Subscription::findOrFail($this->get('subscription_id'));
                if ($client_subscription->order >= $subscription->order)
                {
                    $errors['order'] = trans('errors.'.Errors::SUBSCRIPTION_DOWNGRADE);
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