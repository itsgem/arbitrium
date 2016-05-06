<?php

namespace App\Http\Controllers\v1\Client\Api;

use App\Http\Requests\v1\Api\ApiIpAddressRequest;
use App\Http\Requests\v1\Api\ApiIpAddressAssignRequest;
use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\ApiIpAddressServices;

class ApiIpAddressController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return [];
    }

    protected function getMethods()
    {
        return [
            'destroy' => 'Delete IP Address',
            'index'   => 'Get all IP Addresses',
            'show'    => 'Get single IP Address',
            'store'   => 'Add new IP Address',
            'update'  => 'Update IP Address',
            'assign'  => 'Assign IP Address to API Key',
        ];
    }

    public function destroy($id, ApiIpAddressServices $service)
    {
        return $service->destroy($id, get_logged_in_client_id());
    }

    public function index(ApiIpAddressServices $service)
    {
        return $service->index($this->request, get_logged_in_client_id());
    }

    public function show($id, ApiIpAddressServices $service)
    {
        return $service->show($this->request, $id, get_logged_in_client_id());
    }

    public function store(ApiIpAddressRequest $request, ApiIpAddressServices $service)
    {
        return $service->store($request, get_logged_in_client_id());
    }

    public function update(ApiIpAddressRequest $request, $id, ApiIpAddressServices $service)
    {
        return $service->update($request, $id, get_logged_in_client_id());
    }
}