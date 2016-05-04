<?php

namespace App\Services;

use DB;

use App\Errors;
use App\Models\ApiIpAddress;
use App\Nrb\NrbServices;

class ApiIpAddressServices extends NrbServices
{
    // Api\ApiIpAddressController::destroy
    public function destroy($id)
    {
        return DB::transaction(function () use ($id)
        {
            $api_ip = ApiIpAddress::findOrFail($id);
            if ($api_ip->canDelete())
            {
                $api_ip->delete();
                return $this->respondWithSuccess($api_ip);
            }
            return $this->respondWithError(Errors::CANNOT_DELETE, ['str_replace' => ['model' => 'api ip address']]);
        });
    }

    // Api\ApiIpAddressController::index
    public function index($request)
    {
        return $this->respondWithData(
            ApiIpAddress::select(
                'id', 'api_key_id', 'ip_address', 'name', 'created_at', 'updated_at', 'deleted_at'
            )
            ->with(['api_key' => function($query){
                $query->select(
                    'id', 'client_id', 'token', 'name', 'description',
                    'is_api_call_restricted', 'is_whitelist', 'is_active', 'is_test_key',
                    'created_at', 'updated_at', 'deleted_at'
                );
            }])
            ->paginate($request->get('per_page')),
            $request->get('max_pagination_links')
        );
    }

    // Api\ApiIpAddressController::show
    public function show($request, $id)
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

        $api_ip = $api_ip->findOrFail($id);
        return $this->respondWithSuccess($api_ip);
    }

    // Api\ApiIpAddressController::store
    public function store($request)
    {
        // Transform payload to eloquent format, set defaults
        $payload = $request->all();
        $payload['value'] = (array_key_exists('value', $payload)) ? $payload['value'] : true;

        return DB::transaction(function () use ($payload)
        {
            $api_ip = ApiIpAddress::create($payload);
            return $this->respondWithSuccess($api_ip);
        });
    }

    // Api\ApiIpAddressController::update
    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id)
        {
            $api_ip = ApiIpAddress::findOrFail($id);
            $api_ip->update($request->all());

            return $this->respondWithSuccess($api_ip);
        });
    }

    // Api\ApiIpAddressController::assign
    public function assign($request, $id)
    {
        $api_ip = ApiIpAddress::findOrFail($id);
        $api_ip->assign($request->get('api_key_id'));

        return $this->respondWithSuccess($api_ip);
    }
}
