<?php

namespace App\Services;

use DB;

use App\Errors;
use App\Models\ApiKey;
use App\Models\ApiKeyPermission;
use App\Nrb\NrbServices;

class ApiKeyServices extends NrbServices
{
    // Api\ApiKeyController::destroy
    public function destroy($id, $client_id = null)
    {
        return DB::transaction(function () use ($id, $client_id)
        {
            $api_key = ApiKey::clientId($client_id)->findOrFail($id);
            $api_key->delete();

            return $this->respondWithSuccess($api_key);
        });
    }

    // Api\ApiKeyController::index
    public function index($request, $client_id = null)
    {
        if ($client_id) {
            $api_keys = ApiKey::clientId($client_id);
        } else {
            $api_keys = ApiKey::with(['client.user' => function($query){
                    $query->select('id', 'username', 'email_address', 'activated_at', 'items_per_page', 'timezone', 'locked_at');
                }]);
        }

        $api_keys = $api_keys->paginate($request->get('per_page'));

        return $this->respondWithData($api_keys, $request->get('max_pagination_links'));
    }

    // Api\ApiKeyController::show
    public function show($request, $id, $client_id = null)
    {
        $api_key = new ApiKey();

        if ($request->get('with-client') && !$client_id)
        {
            $api_key = $api_key->with(['client.user' => function($query){
                $query->select('id', 'username', 'email_address', 'activated_at', 'items_per_page', 'timezone', 'locked_at');
            }]);
        }

        $api_key = $api_key->with(['permissions', 'ip_addresses']);
        $api_key = $api_key->clientId($client_id)->findOrFail($id);

        return $this->respondWithSuccess($api_key);
    }

    // Api\ApiKeyController::store
    public function store($request, $client_id = null)
    {
        // Transform payload to eloquent format, set defaults
        $payload = $request->all();
        $payload['is_active'] = (array_key_exists('is_active', $payload)) ? $payload['is_active'] : true;
        $payload['client_id'] = ($client_id) ? $client_id : $request->get('client_id');

        return DB::transaction(function () use ($payload)
        {
            $api_key = ApiKey::create($payload);
            return $this->respondWithSuccess($api_key);
        });
    }

    // Api\ApiKeyController::update
    public function update($request, $id, $client_id = null)
    {
        return DB::transaction(function () use ($request, $id, $client_id)
        {
            $api_key = ApiKey::clientId($client_id)->findOrFail($id);
            $api_key->update($request->except(['client_id']));

            return $this->respondWithSuccess();
        });
    }

    // Api\ApiKeyController::generate
    public function generate($request, $client_id = null)
    {
        $client_id = ($client_id) ? $client_id : $request->get('client_id');
        $token = generate_api_key_token($client_id);

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
    {
        // Transform payload to eloquent format
        $payload = $request->all();
        $payload['api_key_id'] = $id;

        if (!ApiKeyPermission::permission($payload)->count()) {
            return $this->respondWithError(Errors::NOT_FOUND);
        }

        return DB::transaction(function () use ($payload)
        {
            ApiKeyPermission::permission($payload)->update([
                'value' => $payload['value']
            ]);

            return $this->respondWithSuccess();
        });
    }

    // Api\ApiKeyController::removePermission
    public function removePermission($request, $id)
    {
        // Transform payload to eloquent format
        $payload = $request->all();
        $payload['api_key_id'] = $id;

        if (!ApiKeyPermission::permission($payload)->count()) {
            return $this->respondWithError(Errors::NOT_FOUND);
        }

        return DB::transaction(function () use ($payload)
        {
            $api_key_permission = ApiKeyPermission::permission($payload);
            $api_key_permission->delete();

            return $this->respondWithSuccess();
        });
    }
}
