<?php

namespace App\Http\Controllers\v1\Client;

use App\Http\Requests\v1\Api\ApiKeyRequest;
use App\Http\Requests\v1\Api\ApiKeyPermissionRequest;
use App\Http\Requests\v1\Api\ApiKeyActivateRequest;
use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\ApiKeyServices;

class ApiKeyController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return [];
    }

    protected function getMethods()
    {
        return [
            'activate'         => 'Activate API Key',
            'destroy'          => 'Delete API Key',
            'index'            => 'Get all API Keys',
            'show'             => 'Get single API Key',
            'store'            => 'Add new API Key',
            'update'           => 'Update API Key',
        ];
    }

    public function destroy($id, ApiKeyServices $service)
    {
        return $service->destroy($id, get_logged_in_client_id());
    }

    public function index(ApiKeyServices $service)
    {
        return $service->index($this->request, get_logged_in_client_id());
    }

    public function show($id, ApiKeyServices $service)
    {
        return $service->show($id, get_logged_in_client_id());
    }

    public function store(ApiKeyRequest $request, ApiKeyServices $service)
    {
        return $service->store($request, get_logged_in_client_id());
    }

    public function update(ApiKeyRequest $request, $id, ApiKeyServices $service)
    {
        return $service->update($request, $id, get_logged_in_client_id());
    }

    public function activate(ApiKeyActivateRequest $request, $id, ApiKeyServices $service)
    {
        return $service->activate($request, $id, get_logged_in_client_id());
    }
}