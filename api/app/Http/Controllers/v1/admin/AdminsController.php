<?php

namespace App\Http\Controllers\v1\Admin;

use App\Http\Requests\v1\Admin\AdminUserRequest;
use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\AdminUserServices;

class AdminsController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return [];
    }

    protected function getMethods()
    {
        return [
            'destroy'   => 'Delete Admin User',
            'index'     => 'Admin User List',
            'show'      => 'Retrieve Admin User',
            'store'     => 'Add Admin User',
            'update'    => 'Update Admin User'
        ];
    }

    public function destroy($id, AdminUserServices $service)
    {
        return $service->destroy($id);
    }

    public function index(AdminUserServices $service)
    {
        return $service->index($this->request);
    }

    public function show($id, AdminUserServices $service)
    {
        return $service->show($this->request, $id);
    }

    public function store(AdminUserRequest $request, AdminUserServices $service)
    {
        return $service->store($request);
    }

    public function update(AdminUserRequest $request, $id, AdminUserServices $service)
    {
        return $service->update($request, $id);
    }
}