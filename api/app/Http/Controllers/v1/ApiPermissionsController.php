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
            'index'   => 'Get all Permissions',
        ];
    }

    public function index(ApiPermissionServices $service)
    {
        return $service->index($this->request);
    }
}