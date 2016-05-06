<?php

namespace App\Services;

use DB;

use App\Models\ApiIpAddress;
use App\Nrb\NrbServices;

class ApiIpAddressServices extends NrbServices
{
    // Admin\Api\ApiIpAddressController::destroy
    // Client\Api\ApiIpAddressController::destroy
    public function destroy($id, $client_id = null)
    {
        return DB::transaction(function () use ($id, $client_id)
        {
            $api_key = ApiIpAddress::clientId($client_id)->findOrFail($id);
            $api_key->delete();

            return $this->respondWithSuccess($api_key);
        });
    }

    // Admin\Api\ApiIpAddressController::index
    // Client\Api\ApiIpAddressController::index
    public function index($request, $client_id = null)
    {
        $ip_addresses = ApiIpAddress::with(['api_key' => function($query){
                $query->select(
                    'id', 'client_id', 'token', 'name', 'description',
                    'is_api_call_restricted', 'is_whitelist', 'is_active', 'is_test_key',
                    'created_at', 'updated_at', 'deleted_at'
                );
            }])
            ->clientId($client_id)
            ->paginate($request->get('per_page'));

        return $this->respondWithData($ip_addresses, $request->get('max_pagination_links'));
    }

    // Admin\Api\ApiIpAddressController::show
    // Client\Api\ApiIpAddressController::show
    public function show($request, $id, $client_id = null)
    {
        $api_ip = new ApiIpAddress();

        if ($request->get('with-api-key'))
        {
            $api_ip = $api_ip->with(['api_key' => function($query){
                $query->select(
                    'id', 'client_id', 'token', 'name', 'description',
                    'is_api_call_restricted', 'is_whitelist', 'is_active', 'is_test_key',
                    'created_at', 'updated_at', 'deleted_at'
                );
            }]);
        }

        $api_ip = $api_ip->clientId($client_id)->findOrFail($id);

        return $this->respondWithSuccess($api_ip);
    }

    // Admin\Api\ApiIpAddressController::store
    // Client\Api\ApiIpAddressController::store
    public function store($request)
    {
        return DB::transaction(function () use ($request)
        {
            $api_ip = ApiIpAddress::create($request->all());
            return $this->respondWithSuccess($api_ip);
        });
    }

    // Admin\Api\ApiIpAddressController::update
    // Client\Api\ApiIpAddressController::update
    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id)
        {
            $api_ip = ApiIpAddress::findOrFail($id);
            $api_ip->update($request->all());

            return $this->respondWithSuccess($api_ip);
        });
    }

    // Admin\Api\ApiIpAddressController::assign
    public function assign($request, $id)
    {
        $api_ip = ApiIpAddress::findOrFail($id);
        $api_ip->assign($request->get('api_key_id'));

        return $this->respondWithSuccess($api_ip);
    }
}
