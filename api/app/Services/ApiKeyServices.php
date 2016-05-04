<?php

namespace App\Services;

use DB;

use App\Errors;
use App\Models\ApiKey;
use App\Models\ApiKeyPermission;
use App\Nrb\NrbServices;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ApiKeyServices extends NrbServices
{
    // Api\ApiKeyController::destroy
    public function destroy($id)
    {
        return DB::transaction(function () use ($id)
        {
            $api_key = ApiKey::findOrFail($id);
            if ($api_key->canDelete())
            {
                $api_key->delete();
                return $this->respondWithSuccess($api_key);
            }
            return $this->respondWithError(Errors::CANNOT_DELETE, ['str_replace' => ['model' => 'api key']]);
        });
    }

    // Api\ApiKeyController::index
    public function index($request)
    {
        return $this->respondWithData(
            ApiKey::select(
                'id', 'client_id', 'token', 'name', 'description',
                'is_api_call_restricted', 'is_whitelist', 'is_active', 'is_test_key',
                'created_at', 'updated_at', 'deleted_at'
            )
            ->with(['client.user' => function($query){
                $query->select('id', 'username', 'email_address', 'activated_at', 'items_per_page', 'timezone', 'locked_at');
            }])
            ->paginate($request->get('per_page')),
            $request->get('max_pagination_links')
        );
    }

    // Api\ApiKeyController::show
    public function show($request, $id)
    {
        $api_key = new ApiKey();
        if ($request->get('with-client'))
        {
            $api_key = $api_key->with(['client.user' => function($query){
                $query->select('id', 'username', 'email_address', 'activated_at', 'items_per_page', 'timezone', 'locked_at');
            }]);
        }
        if ($request->get('with-permissions'))
        {
            $api_key = $api_key->with(['permissions']);
        }

        $api_key = $api_key->findOrFail($id);
        return $this->respondWithSuccess($api_key);
    }

    // Api\ApiKeyController::store
    public function store($request)
    {
        return DB::transaction(function () use ($request)
        {
            $api_key = ApiKey::create($request->all());
            return $this->respondWithSuccess($api_key);
        });
    }

    // Api\ApiKeyController::update
    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id)
        {
            $api_key = ApiKey::findOrFail($id);
            $api_key->update($request->all());

            return $this->respondWithSuccess($api_key);
        });
    }

    // Api\ApiKeyController::generate
    public function generate($request)
    {
        $token = generate_api_key_token($request->get('client_id'));

        return $this->respondWithSuccess(['token' => $token]);
    }

    // Api\ApiKeyController::addPermission
    public function addPermission($request, $id)
    {
        // Transform payload to eloquent format
        $payload = $request->all();
        $payload['api_key_id'] = $id;

        if (ApiKeyPermission::permission($payload)->count()) {
            return $this->respondWithError(Errors::EXISTING_API_KEY_PERMISSION);
        }

        return DB::transaction(function () use ($payload)
        {
            $api_key_permission = ApiKeyPermission::create($payload);
            return $this->respondWithSuccess($api_key_permission);
        });
    }

    // Api\ApiKeyController::updatePermission
    public function updatePermission($request, $id)
    {;
        // Transform payload to eloquent format
        $payload = $request->all();
        $payload['api_key_id'] = $id;

        if (!ApiKeyPermission::permission($payload)->count()) {
            return $this->respondWithError(Errors::API_KEY_PERMISSION_NOT_FOUND);
        }

        return DB::transaction(function () use ($payload)
        {
            $api_key_permission = ApiKeyPermission::permission($payload);
            $api_key_permission->update([
                'value' => $payload['value']
            ]);

            $api_key_permission = ApiKeyPermission::permission($payload)->first();

            return $this->respondWithSuccess($api_key_permission);
        });
    }

    // Api\ApiKeyController::removePermission
    public function removePermission($request, $id)
    {;
        // Transform payload to eloquent format
        $payload = $request->all();
        $payload['api_key_id'] = $id;

        if (!ApiKeyPermission::permission($payload)->count()) {
            return $this->respondWithError(Errors::API_KEY_PERMISSION_NOT_FOUND);
        }

        return DB::transaction(function () use ($payload)
        {
            $api_key_permission = ApiKeyPermission::permission($payload);
            $api_key_permission->delete();

            return $this->respondWithSuccess();
        });
    }
}
