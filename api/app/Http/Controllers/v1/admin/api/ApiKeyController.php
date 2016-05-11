<?php

namespace App\Http\Controllers\v1\Admin\Api;

use App\Http\Requests\v1\Api\ApiKeyRequest;
use App\Http\Requests\v1\Api\ApiKeyGenerateRequest;
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
            'destroy'          => 'Delete API Key',
            'generate'         => 'Generate API Key token',
            'index'            => 'Get all API Keys',
            'show'             => 'Get single API Key',
            'store'            => 'Add new API Key',
            'update'           => 'Update API Key',
            'addPermission'    => 'Add API Key Permission',
            'updatePermission' => 'Update API Key Permission',
            'removePermission' => 'Remove API Key Permission',
        ];
    }

    public function destroy($id, ApiKeyServices $service)
    {
        return $service->destroy($id);
    }

    public function index(ApiKeyServices $service)
    {
        return $service->index($this->request);
    }

    public function show($id, ApiKeyServices $service)
    {
        return $service->show($this->request, $id);
    }

    public function store(ApiKeyRequest $request, ApiKeyServices $service)
    {
        return $service->store($request);
    }

    public function update(ApiKeyRequest $request, $id, ApiKeyServices $service)
    {
        return $service->update($request, $id);
    }

    public function generate(ApiKeyGenerateRequest $request, ApiKeyServices $service)
    {
        return $service->generate($request);
    }

    public function activate(ApiKeyActivateRequest $request, $id, ApiKeyServices $service)
    {
        return $service->activate($request, $id);
    }

    public function addPermission(ApiKeyPermissionRequest $request, $id, ApiKeyServices $service)
    {
        return $service->addPermission($request, $id);
    }

    public function updatePermission(ApiKeyPermissionRequest $request, $id, ApiKeyServices $service)
    {
        return $service->updatePermission($request, $id);
    }

    public function removePermission(ApiKeyPermissionRequest $request, $id, ApiKeyServices $service)
    {
        return $service->removePermission($request, $id);
    }
}