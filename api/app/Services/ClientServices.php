<?php

namespace App\Services;

use DB;

use App\Errors;
use App\Models\Client;
use App\Models\ClientSubscription;
use App\Models\Subscription;
use App\Nrb\NrbServices;
use App\User;

class ClientServices extends NrbServices
{
    // Admin\ClientsController::approve
    // Admin\ClientsController::disapprove
    public function approve($request, $id, $approve = true)
    {
        return DB::transaction(function () use ($request, $id, $approve)
        {
            $client = Client::findOrFail($id)->approve($request->get('callback_url'), $approve);
            return $this->respondWithSuccess();
        });
    }

    // Admin\ClientsController::destroy
    public function destroy($id)
    {
        return DB::transaction(function () use ($id)
        {
            $client = Client::findOrFail($id);
            if ($client->canDelete())
            {
                $client->delete();
                return $this->respondWithSuccess($client);
            }
            return $this->respondWithError(Errors::CANNOT_DELETE, ['str_replace' => ['model' => 'client']]);
        });
    }

    // Admin\ClientsController::index
    public function index($request)
    {
        return $this->respondWithData(
            Client::select(
                'id', 'user_id', 'company_name', 'rep_first_name', 'rep_last_name', 'rep_email_address',
                'rep_phone_code', 'rep_phone_number', 'rep_mobile_code', 'rep_mobile_number', 'approval_status'
            )
            ->with(['user' => function($query){
                $query->select('id', 'email_address', 'login_attempts', 'locked_at');
            }])
            ->whereHas('user', function ($query) use ($request){
                $query->emailLike($request->get('email_address'));
            })
            ->approvalStatus($request->get('approval_status'))->companyNameLike($request->get('company_name'))
            ->paginate($request->get('per_page')),
            $request->get('max_pagination_links')
        );
    }

    // UsersController::registerClient
    public function register($controller, $request)
    {
        return DB::transaction(function () use ($controller, $request)
        {
            $user = User::create($request->all());
            $user->client()->save(new Client($request->all()));

            $user = $user->fresh();
            $user->sendVerificationEmail($request->get('callback_url'));
            log_api_access($controller, 'registerClient', $user);

            return $this->respondWithSuccess($user->client);
        });
    }

    // Admin\ClientsController::show
    // Client\ClientsController::show
    public function show($request, $id)
    {
        $client = new Client();
        if ($request->get('with-user'))
        {
            $client = $client->with(['user' => function($query){
                $query->select('id', 'username', 'email_address', 'activated_at', 'items_per_page', 'timezone', 'locked_at');
            }]);
        }

        $client = $client->findOrFail($id);
        $this->addResponseData($client);
        return $this->respondWithSuccess($client);
    }

    // Admin\ClientsController::store
    public function store($request)
    {
        return DB::transaction(function () use ($request)
        {
            $user = User::create($request->all());
            $user->client()->save(new Client($request->all()));
            $user->sendNewClientAccount($request->get('callback_url'));
            return $this->respondWithSuccess($user->client);
        });
    }

    // Admin\ClientsController::update
    // Client\ClientsController::update
    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id)
        {
            $client = Client::findOrFail($id);
            $client->update($request->all());
            if (is_admin_user_logged_in())
            {
                $client->user()->update($request->only('username', 'email_address', 'items_per_page', 'timezone'));
            }
            else
            {
                // client has to use change email address API
                $client->user()->update($request->only('username', 'items_per_page', 'timezone'));
            }
            return $this->respondWithSuccess($client, trans("messages.success_client_edit_profile"));
        });
    }

    //----- SUBSCRIPTIONS

    // Client\ClientsController::subscribe
    public function subscribe($request, $client)
    {
        if (!($client instanceof Client))
        {
            $client = Client::findOrFail($client);
        }

        $paypal = new PaypalServices();
        $result = $paypal->subscribe($request, $client)->getData();

        return $this->respondWithData($result);
    }

    // Admin\ClientsController::changeSubscription
    // Client\ClientsController::subscribeConfirm
    public function subscribeConfirm($request, $client_id = null)
    {
        $paypal = new PaypalServices();
        $result = $paypal->executeAgreement($request)->getData();

        if ($result->success == false)
        {
            return $this->respondWithData($result);
        }

        $client_subscription = ClientSubscription::paypalAgreementId($result->data->agreement_id, $client_id)->first();
        $client = Client::findOrFail($client_subscription->client_id);

        $subscription_id = $client_subscription->subscription_id;

        // if client has subscribed before
        if ($latest_subscription = $client->latest_subscription)
        {
            // Suspend last agreement
            $suspended_sub = $paypal->suspendAgreement($latest_subscription->paypal_agreement_id)->getData();

            if (!$suspended_sub->success)
            {
                return $this->respondWithData($suspended_sub);
            }

            if ($latest_subscription->subscription_id == $subscription_id)
            {
                $latest_subscription->renew();
            }
            else
            {
                $latest_subscription->upgrade();
            }
        }

        return DB::transaction(function () use ($client_subscription, $client)
        {
            $result = $client->finalizeSubscription($client_subscription, current_date_to_string());

            if ($result)
            {
                return $this->respondWithSuccess($result);
            }

            return $this->respondWithData([
                'success' => false,
                'message' => 'Error'
            ]);
        });
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
                $paypal = new PaypalServices();

                $plan = $paypal->showPlan($current_subscription->paypal_plan_id)->getData();
                $transactions = $paypal->getTransactions($current_subscription->paypal_agreement_id)->getData();

                $additional_data = [
                    'plan' => $plan->data,
                    'transactions' => $transactions->data
                ];
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

    // Admin\ClientsController::cancelSubscription
    // Client\ClientsController::cancelSubscription
    public function cancelSubscription($client)
    {
        if (!($client instanceof Client))
        {
            $client = Client::findOrFail($client);
        }

        return DB::transaction(function () use ($client)
        {
            if ($latest_subscription = $client->latest_subscription)
            {
                // Suspend last agreement
                $paypal = new PaypalServices();
                $result = $paypal->suspendAgreement($latest_subscription->paypal_agreement_id)->getData();

                if (!$result->success)
                {
                    return $this->respondWithData($result);
                }

                $latest_subscription->cancel();
            }

            return $this->respondWithSuccess();
        });
    }
}
