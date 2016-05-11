<?php

namespace App\Services;

use DB;

use App\Models\ApiIpAddress;
use App\Models\ApiKey;
use App\Models\ApiKeyPermission;
use App\Nrb\NrbServices;

class ApiKeyServices extends NrbServices
{
    // Admin\Api\ApiKeyController::destroy
    // Client\Api\ApiKeyController::destroy
    public function destroy($id, $client_id = null)
    {
        return DB::transaction(function () use ($id, $client_id)
        {
            $api_key = ApiKey::clientId($client_id)->findOrFail($id);
            $api_key->delete();

            return $this->respondWithSuccess($api_key);
        });
    }

    // Admin\Api\ApiKeyController::index
    // Client\Api\ApiKeyController::index
    public function index($request, $client_id = null)
    {
        $api_keys = new ApiKey;

        // If non-client
        if (!$client_id)
        {
            $api_keys = $api_keys->with(['client.user' => function($query){
                    $query->select('id', 'username', 'email_address', 'activated_at', 'items_per_page', 'timezone', 'locked_at');
                }]);

            $client_id = $request->get('client_id', '');
        }

        $api_keys = $api_keys->clientId($client_id)
            ->like('id', $request->get('id', ''))
            ->like('name', $request->get('name', ''))
            ->like('description', $request->get('description', ''))
            ->token($request->get('key', ''))
            ->active($request->get('is_active', ''))
            ->testKey($request->get('is_test_key', ''))
            ->dateFrom('created_at', $request->get('date_created', ''), true)
            ->dateTo('created_at', $request->get('date_created', ''), true)
            ->paginate($request->get('per_page'));

        return $this->respondWithData($api_keys, $request->get('max_pagination_links'));
    }

    // Admin\Api\ApiKeyController::show
    // Client\Api\ApiKeyController::show
    public function show($request, $id, $client_id = null)
    {
        $api_key = ApiKey::with(['client.user', 'permissions', 'ip_addresses']);
        $api_key = $api_key->clientId($client_id)->findOrFail($id);

        return $this->respondWithSuccess($api_key);
    }

    // Admin\Api\ApiKeyController::store
    // Client\Api\ApiKeyController::store
    public function store($request, $client_id = null)
    {
        $client_id = ($client_id) ? $client_id : $request->get('client_id');
        $token = generate_api_key_token($client_id);

        // Transform payload to eloquent format, set defaults
        $payload = $request->except('token');
        $payload['client_id'] = $client_id;
        $payload['ip_addresses'] = get_val($payload, 'ip_addresses', []);
        $payload['is_active'] = get_val($payload, 'is_active', true);
        $payload['permissions'] = get_val($payload, 'permissions', []);
        $payload['token'] = $token;

        return DB::transaction(function () use ($payload)
        {
            $api_key = ApiKey::create($payload);

            foreach($payload['permissions'] as $permission)
            {
                $api_key->permissions()->save(new ApiKeyPermission($permission));
            }

            foreach($payload['ip_addresses'] as $ip_address)
            {
                $api_key->ip_addresses()->save(new ApiIpAddress($ip_address));
            }

            return $this->respondWithSuccess($api_key);
        });
    }

    // Admin\Api\ApiKeyController::update
    // Client\Api\ApiKeyController::update
    public function update($request, $id, $client_id = null)
    {
        // Transform payload to eloquent format, set defaults
        $payload = $request->except('token');
        $payload['client_id'] = ($client_id) ? $client_id : $request->get('client_id');
        $payload['ip_addresses'] = get_val($payload, 'ip_addresses', []);
        $payload['permissions'] = get_val($payload, 'permissions', []);

        return DB::transaction(function () use ($payload, $id, $client_id)
        {
            $api_key = ApiKey::clientId($client_id)->findOrFail($id);
            $api_key->update($payload);

            ApiKeyPermission::apiKeyId($id)->delete();
            foreach($payload['permissions'] as $permission)
            {
                $api_key->permissions()->save(new ApiKeyPermission($permission));
            }

            ApiIpAddress::apiKeyId($id)->delete();
            foreach($payload['ip_addresses'] as $ip_address)
            {
                $api_key->ip_addresses()->save(new ApiIpAddress($ip_address));
            }

            return $this->respondWithSuccess();
        });
    }

    // Admin\Api\ApiKeyController::generate
    // Client\Api\ApiKeyController::generate
    public function generate($request, $client_id = null)
    {
        $client_id = ($client_id) ? $client_id : $request->get('client_id');
        $token = generate_api_key_token($client_id);

        return $this->respondWithSuccess(['token' => $token]);
    }

    // Admin\Api\ApiKeyController::activate
    // Client\Api\ApiKeyController::activate
    public function activate($request, $id)
    {
        return DB::transaction(function () use ($request, $id)
        {
            ApiKey::findOrFail($id)->update($request->only('is_active'));

            return $this->respondWithSuccess();
        });
    }

    // Admin\Api\ApiKeyController::addPermission
    // Client\Api\ApiKeyController::addPermission
    public function addPermission($request, $id)
    {
        // Transform payload to eloquent format
        $payload = $request->all();
        $payload['api_key_id'] = $id;

        return DB::transaction(function () use ($payload)
        {
            $api_key_permission = ApiKeyPermission::create($payload);
            return $this->respondWithSuccess($api_key_permission);
        });
    }

    // Admin\Api\ApiKeyController::updatePermission
    // Client\Api\ApiKeyController::updatePermission
    public function updatePermission($request, $id)
    {
        // Transform payload to eloquent format
        $payload = $request->all();
        $payload['api_key_id'] = $id;

        return DB::transaction(function () use ($payload)
        {
            ApiKeyPermission::permission($payload)->update([
                'value' => $payload['value']
            ]);

            return $this->respondWithSuccess();
        });
    }

    // Admin\Api\ApiKeyController::removePermission
    // Client\Api\ApiKeyController::removePermission
    public function removePermission($request, $id)
    {
        // Transform payload to eloquent format
        $payload = $request->all();
        $payload['api_key_id'] = $id;

        return DB::transaction(function () use ($payload)
        {
            $api_key_permission = ApiKeyPermission::permission($payload);
            $api_key_permission->delete();

            return $this->respondWithSuccess();
        });
    }
}