<?php

namespace App\Services;

use DB;
use App\Errors;
use App\Nrb\NrbServices;
use App\Models\Client;
use App\Models\ClientSubscription;
use App\Models\Subscription;
use Symfony\Component\HttpFoundation\JsonResponse;

class SubscriptionServices extends NrbServices
{
    //----- SUBSCRIPTION PLANS

    // Admin\SubscriptionsController::destroy
    public function destroy($id)
    {
        $subscription = Subscription::findOrFail($id);
        if (is_admin_user_logged_in())
        {
            $subscription->delete();
            return $this->respondWithSuccess($subscription);
        }
        return $this->respondWithError(Errors::CANNOT_DELETE, ['str_replace' => ['model' => 'subscription']]);
    }

    // Admin\SubscriptionsController::index
    // SubscriptionsController::index
    public function index()
    {
        $subscription = Subscription::get();
        $this->addResponseData($subscription);
        return $this->respondWithSuccess();
    }

    // Admin\SubscriptionsController::show
    // SubscriptionsController::show
    public function show($id)
    {
        $subscription = Subscription::findOrFail($id);
        $this->addResponseData($subscription);
        return $this->respondWithSuccess();
    }

    // Admin\SubscriptionsController::store
    public function store($request)
    {
        return DB::transaction(function () use ($request)
        {
            $subscription = Subscription::create($request->all());
            return $this->respondWithSuccess($subscription);
        });
    }

    // Admin\SubscriptionsController::update
    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id)
        {
            $subscription = Subscription::findOrFail($id);
            $subscription->update($request->all());
            return $this->respondWithSuccess($subscription);
        });
    }

    //----- CLIENT SUBSCRIPTIONS

    // Client\ClientsController::subscribe
    public function subscribe($request, $client)
    {
        if (!($client instanceof Client))
        {
            $client = Client::findOrFail($client);
        }

        $paypal = new PaypalServices();
        $result = $paypal->subscribe($request, $client);

        return $result;
    }

    // Admin\ClientsController::changeSubscription
    // Client\ClientsController::subscribeConfirm
    public function subscribeConfirm($request, $client_id = null)
    {
        if (!$client_id)
        {
            $this->respondWithError(Errors::NO_CONTENT);
        }

        // if user did not cancel
        if ($request->get('success') == true)
        {
            $client = Client::findOrFail($client_id);

            // Confirm the subscription agreement
            $paypal = new PaypalServices();
            $result = $paypal->executeAgreement($request);
            $result_data = $result->getData();

            if ($result_data->success == false)
            {
                return $result;
            }

            // Suspend last subscription
            $this->cancelSubscription($client, true);

            $agreement_id = isset($result_data->data->agreement_id) ? $result_data->data->agreement_id : null;
            $payer_id     = isset($result_data->data->payer_id) ? $result_data->data->payer_id : null;
            $token        = $request->get('token');

            DB::transaction(function () use ($agreement_id, $payer_id, $token)
            {
                ClientSubscription::paypalTokenId($token)->update([
                    'paypal_agreement_id' => $agreement_id,
                    'paypal_payer_id'     => $payer_id,
                ]);
            });

            $client_subscription = ClientSubscription::paypalAgreementId($agreement_id, $client_id)->first();
            $subscription_id = $client_subscription->subscription_id;

            // if client has subscribed before
            $latest_subscription = $client->latest_subscription;
            if ($latest_subscription)
            {
                if ($latest_subscription->subscription_id == $subscription_id)
                {
                    $latest_subscription->renew();
                }
                else
                {
                    $latest_subscription->upgrade();
                }
            }

            $finalized_client = DB::transaction(function () use ($client_subscription, $client)
            {
                return $client->finalizeSubscription($client_subscription, current_date_to_string());
            });

            if ($finalized_client)
            {
                // Send client subscription change success email
                $client->sendSubscriptionChangeSuccess($client_subscription);

                return DB::transaction(function () use ($finalized_client)
                {
                    // Mark subscription as paid
                    $finalized_client->invoice->paid();

                    // Send client invoice details
                    $finalized_client->invoice->sendInvoice();

                    return $this->respondWithSuccess($finalized_client);
                });
            }

            return $this->respondWithError(Errors::SUBSCRIPTION_CONFIRMATION_ERROR);
        }

        return $this->respondWithError(Errors::PAYPAL_CANCELLED);
    }

    // Client\ClientsController::subscribe
    public function subscribeCancelConfirm($client)
    {
        if (!($client instanceof Client))
        {
            $client = Client::findOrFail($client);
        }

        $pending_subscription = $client->pending_subscription;

        if (!$pending_subscription)
        {
            return $this->respondWithSuccess();
        }

        $deleted_subscription = $pending_subscription->toArray();

        $deleted_subscription_name = $pending_subscription->getSubscriptionName();

        $is_deleted = $pending_subscription->delete();

        if ($is_deleted)
        {
            // Send email notification
            $client->sendPendingSubscriptionCancellation($deleted_subscription_name);

            return $this->respondWithSuccess($deleted_subscription);
        }

        return $this->respondWithError(Errors::CANNOT_CANCEL_PENDING_SUBSCRIPTION);
    }

    // Admin\ClientsController::getSubscriptionHistory
    // Client\ClientsController::getSubscriptionHistory
    public function getSubscriptionHistory($request, $client_id = null)
    {
        $subscriptions = new ClientSubscription;

        // If non-client
        if (!$client_id)
        {
            $subscriptions = $subscriptions->with(['client.user' => function($query){
                $query->select('id', 'username', 'email_address', 'activated_at', 'items_per_page', 'timezone', 'locked_at');
            }]);

            $client_id = $request->get('client_id', '');
        }

        $subscriptions = $subscriptions->clientId($client_id)
            ->subscriptionId($request->get('subscription_id'))
            ->name($request->get('name'))
            ->type($request->get('type'))
            ->companyName($request->get('company_name'))
            ->validFrom($request->get('valid_from'))
            ->validTo($request->get('valid_to'))
            ->dateFrom('valid_from', $request->get('valid_range_from'))
            ->dateTo('valid_to', $request->get('valid_range_to'))
            ->orderBy($request->get('sort_by', 'created_at'), $request->get('sort_dir', 'desc'))
            ->paginate($request->get('per_page'));

        return $this->respondWithData($subscriptions, $request->get('max_pagination_links'));
    }

    // Admin\ClientsController::getSubscription
    // Client\ClientsController::getSubscription
    public function getSubscription($request, $client_id = null)
    {
        // If user is client
        if ($client_id)
        {
            $current_subscription = Client::findOrFail($client_id)->subscription;

            if (!$current_subscription)
            {
                return $this->respondWithSuccess($current_subscription);
            }

            $additional_data = [];

            if ($current_subscription->hasPaypal() && $request->get('with-paypal') == 1)
            {
                if (!$current_subscription->is_auto_renew)
                {
                    $plan = (new PaypalServices())->showPlan($current_subscription->paypal_agreement_id, false)->getData();
                    $additional_data['plan'] = ($plan->success) ? $plan->data : null;
                }
                else
                {
                    $plan         = (new PaypalServices())->showPlan($current_subscription->paypal_plan_id)->getData();
                    $transactions = (new PaypalServices())->getTransactions($request, $current_subscription->paypal_agreement_id)->getData();

                    $additional_data = [
                        'plan'         => ($plan->success) ? $plan->data : null,
                        'transactions' => ($transactions->success) ? $transactions->data : null,
                    ];
                }
            }

            $this->addResponseData($current_subscription);
            return $this->respondWithSuccess($additional_data);
        }

        $current_subscription = ClientSubscription::clientId($request->get('client_id'))
            ->current()
            ->with(['client.user' => function($query){
                $query->select('id', 'username', 'email_address', 'activated_at', 'items_per_page', 'timezone', 'locked_at');
            }])
            ->subscriptionId($request->get('subscription_id'))
            ->name($request->get('name'))
            ->type($request->get('type'))
            ->companyName($request->get('company_name'))
            ->validFrom($request->get('valid_from'))
            ->validTo($request->get('valid_to'))
            ->dateFrom('valid_from', $request->get('valid_range_from'))
            ->dateTo('valid_to', $request->get('valid_range_to'))
            ->orderBy($request->get('sort_by', 'created_at'), $request->get('sort_dir', 'desc'))
            ->paginate($request->get('per_page'));

        return $this->respondWithData($current_subscription, $request->get('max_pagination_links'));
    }

    // Admin\ClientsController::getPendingSubscriptionSingle
    // Client\ClientsController::getPendingSubscription
    public function getPendingSubscription($request, $client_id = null)
    {
        // If user is client
        if ($client_id)
        {
            $pending_subscription = Client::findOrFail($client_id)->pending_subscription;

            return $this->respondWithSuccess($pending_subscription);
        }

        $current_subscription = ClientSubscription::clientId($request->get('client_id'))
            ->unfinishedTempSubscription()
            ->with(['client.user' => function($query){
                $query->select('id', 'username', 'email_address', 'activated_at', 'items_per_page', 'timezone', 'locked_at');
            }])
            ->subscriptionId($request->get('subscription_id'))
            ->name($request->get('name'))
            ->type($request->get('type'))
            ->companyName($request->get('company_name'))
            ->validFrom($request->get('valid_from'))
            ->validTo($request->get('valid_to'))
            ->dateFrom('valid_from', $request->get('valid_range_from'))
            ->dateTo('valid_to', $request->get('valid_range_to'))
            ->orderBy($request->get('sort_by', 'created_at'), $request->get('sort_dir', 'desc'))
            ->paginate($request->get('per_page'));

        return $this->respondWithData($current_subscription, $request->get('max_pagination_links'));
    }

    // Admin\ClientsController::resendSubscriptionChangeApprovalLink
    public function resendSubscriptionChangeApprovalLink($client_id)
    {
        $client = Client::findOrFail($client_id);
        $pending_subscription = $client->pending_subscription;

        if (!$pending_subscription)
        {
            return $this->respondWithError(Errors::NO_CONTENT);
        }

        $client->sendApprovalLink($pending_subscription);

        return $this->respondWithSuccess();
    }

    // Admin\ClientsController::cancelSubscription
    // Client\ClientsController::cancelSubscription
    public function cancelSubscription($client, $renew = null)
    {
        if (!($client instanceof Client))
        {
            $client = Client::findOrFail($client);
        }

        $latest_subscription = $client->latest_subscription;

        // if client has subscribed before, suspend it
        if ($latest_subscription)
        {
            $paypal = new PaypalServices();
            $agreement = $paypal->showAgreement($latest_subscription->paypal_agreement_id);

            if ($agreement instanceof JsonResponse)
            {
                return $agreement;
            }

            // Make sure the current subscription is still active in paypal
            if ($agreement['state'] == ClientSubscription::PAYPAL_STATE_ACTIVE)
            {
                // Suspend last subscription agreement
                $paypal = new PaypalServices();
                $suspended_sub = $paypal->suspendAgreement($latest_subscription->paypal_agreement_id);
                $suspended_sub_data = $suspended_sub->getData();

                if (!$suspended_sub_data->success)
                {
                    return $suspended_sub;
                }
            }

            if (!$renew)
            {
                DB::transaction(function () use ($latest_subscription)
                {
                    $latest_subscription->cancel();
                });
            }
        }

        return $this->respondWithSuccess($latest_subscription);
    }
}