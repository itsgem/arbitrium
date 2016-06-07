<?php

namespace App\Services;

use DB;
use App\Nrb\NrbServices;
use App\Models\SystemSetting;

class SystemSettingServices extends NrbServices
{
    // Admin\SystemSettingsController::get
    public function getSegment($segment)
    {
        return $this->respondWithSuccess(
            SystemSetting::segment($segment)->lists('value', 'name')
        );
    }

    // Admin\SystemSettingsController::index
    public function index($request)
    {
        $system_setting = SystemSetting::name($request->get('name'))
            ->segment($request->get('segment'))
            ->get();

        return $this->respondWithSuccess($system_setting);
    }

    // Admin\SystemSettingsController::show
    public function show($id)
    {
        $system_setting = SystemSetting::findOrFail($id);

        return $this->respondWithSuccess($system_setting);
    }

    // Admin\SystemSettingsController::store
    public function store($request)
    {
        return DB::transaction(function () use ($request)
        {
            $system_setting = SystemSetting::create($request->all());

            return $this->respondWithSuccess($system_setting);
        });
    }

    // Admin\SystemSettingsController::update
    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id)
        {
            SystemSetting::findOrFail($id)->update($request->only('value'));

            return $this->respondWithSuccess();
        });
    }
}
