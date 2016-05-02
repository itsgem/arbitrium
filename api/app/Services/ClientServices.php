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

    // Client\ClientsController::cancelSubscription
    public function cancelSubscription($client)
    {
        return DB::transaction(function () use ($client)
        {
            if ($client->subscription)
            {
                $client->subscription->cancel();
            }

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

    // Client\ClientsController::getSubscription
    public function getSubscription($client_id)
    {
        $client = Client::findOrFail($client_id);
        return $this->respondWithSuccess($client->subscription);
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

    // Client\ClientsController::purchaseSubscription
    public function purchaseSubscription($request, $client)
    {
        return DB::transaction(function () use ($request, $client)
        {
            // client has a current subscription; upgrade subscription instead
            if ($client->subscription)
            {
                return $this->respondWithError(Errors::EXISTING_SUBSCRIPTION);
            }

            $result = $client->purchaseSubscription($request->get('subscription_id'), current_date_to_string());
            if ($result)
            {
                return $this->respondWithSuccess($result);
            }
            return $this->respondWithError(Errors::INSUFFICIENT_CREDIT);
        });
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
}
