<?php

namespace App\Http\Controllers\v1;

use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\RoleServices;

class RolesController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return ['getAdminRoles'];
    }

    protected function getMethods()
    {
        return [];
    }

    public function getAdminRoles(RoleServices $service)
    {
        return $service->getAdminRoles();
    }
}