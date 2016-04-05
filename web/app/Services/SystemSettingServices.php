<?php

namespace App\Services;

use App\Nrb\NrbServices;
use App\Models\SystemSetting;

class SystemSettingServices extends NrbServices
{
    // Admin\SystemSettingsController::get
    public function get($segment)
    {
        return $this->respondWithSuccess(
            SystemSetting::segment($segment)->lists('value', 'name')
        );
    }
}
