<?php

namespace App\Http\Controllers\v1;

use App\Http\Requests\v1\Api\ApiPermissionRequest;
use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\ApiPermissionServices;

class ApiPermissionsController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return [];
    }

    protected function getMethods()
    {
        return [
            'destroy' => 'Delete Permission',
            'index'   => 'Get all Permissions',
            'show'    => 'Get single Permission',
            'store'   => 'Add new Permission',
            'update'  => 'Update Permission',
        ];
    }

    public function destroy($id, ApiPermissionServices $service)
    {
        return $service->destroy($id);
    }

    public function index(ApiPermissionServices $service)
    {
        return $service->index($this->request);
    }

    public function show($id, ApiPermissionServices $service)
    {
        return $service->show($this->request, $id);
    }

    public function store(ApiPermissionRequest $request, ApiPermissionServices $service)
    {
        return $service->store($request);
    }

    public function update(ApiPermissionRequest $request, $id, ApiPermissionServices $service)
    {
        return $service->update($request, $id);
    }
}