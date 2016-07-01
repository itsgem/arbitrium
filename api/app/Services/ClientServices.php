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
            $client = Client::findOrFail($id);
            $client->approve($request->get('callback_url'), $approve);

            // [Core-API] Signup
            $client->user->registerApiCredentials();

            return $this->respondWithSuccess($client);
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
                // [Core-API] Delete account
                $client->user->removeApiCredentials();

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
                $query->select('id', 'email_address', 'username', 'login_attempts', 'locked_at');
            }])
            ->whereHas('user', function ($query) use ($request){
                $query->emailLike($request->get('email_address'));
            })
            ->approvalStatus($request->get('approval_status'))
            ->companyNameLike($request->get('company_name'))
            ->usernameLike($request->get('username'))
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
        if ($request->get('with-api'))
        {
            $client['api'] = $client->user->getApiAuth();
        }

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
                $client->user->update($request->only('username', 'email_address', 'items_per_page', 'timezone'));
            }
            else
            {
                // client has to use change email address API
                $client->user->update($request->only('username', 'items_per_page', 'timezone'));
            }

            // [Core-API] Update username, password, user_type
            $client->user->updateApiCredentials([
                'username' => $client->user->username,
            ]);

            return $this->respondWithSuccess($client, trans("messages.success_client_edit_profile"));
        });
    }
}
