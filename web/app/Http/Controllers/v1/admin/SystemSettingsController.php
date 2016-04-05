<?php

namespace App\Http\Controllers\v1\Admin;

use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\SystemSettingServices;

class SystemSettingsController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return ['get'];
    }

    protected function getMethods()
    {
        return [];
    }

    public function get($segment, SystemSettingServices $service)
    {
        return $service->get($segment);
    }
}