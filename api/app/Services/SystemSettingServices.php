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

        if ($request->get('response-format') == 'key-name')
        {
            $data = [];
            foreach ($system_setting as $name => $properties)
            {
                $name = $properties->name;
                unset($properties->name);
                $data[$name] = $properties;
            }
            $system_setting = $data;
        }

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
    public function update($request, $id = null)
    {
        return DB::transaction(function () use ($request, $id)
        {
            // If no id passed, update in bulk
            if (!$id)
            {
                $settings = $request->get('system_setting');
                foreach ($settings as $setting)
                {
                    SystemSetting::name($setting['name'])->update([
                        'value' => $setting['value']
                    ]);
                }
                $result = SystemSetting::whereIn('name', array_pluck($settings, 'name'))->get();
            }
            else
            {
                SystemSetting::findOrFail($id)->update($request->only('value'));
                $result = SystemSetting::findOrFail($id);
            }

            return $this->respondWithSuccess($result);
        });
    }
}
