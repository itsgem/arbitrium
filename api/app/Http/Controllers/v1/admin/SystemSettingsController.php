<?php

namespace App\Http\Controllers\v1\Admin;

use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\SystemSettingServices;
use App\Http\Requests\v1\Admin\SystemSettingRequest;

class SystemSettingsController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return [
            'index',
            'get',
            'show',
        ];
    }

    protected function getMethods()
    {
        return [
            'destroy',
            'store',
            'update',
        ];
    }

    public function destroy($id, SystemSettingServices $service)
    {
        return $service->destroy($id);
    }

    public function index(SystemSettingServices $service)
    {
        return $service->index($this->request);
    }

    public function getSegment($segment, SystemSettingServices $service)
    {
        return $service->getSegment($segment);
    }

    public function show($id, SystemSettingServices $service)
    {
        return $service->show($id);
    }

    public function store(SystemSettingRequest $request, SystemSettingServices $service)
    {
        return $service->store($request);
    }

    public function update(SystemSettingRequest $request, $id, SystemSettingServices $service)
    {
        return $service->update($request, $id);
    }
}