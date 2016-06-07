<?php

namespace App\Http\Requests\v1\Admin;

use App\Errors;
use App\Models\SystemSetting;
use App\Nrb\Http\v1\Requests\NrbRequest;

// Admin/SystemSettingsController::store
// Admin/SystemSettingsController::update
class SystemSettingRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [];
        $method = $this->method();

        if ($method == 'POST')
        {
            $rules = [
                'name'    => 'required|slug|max:255',
                'value'   => 'required|max:255',
                'segment' => 'required|slug|max:255|in:'.SystemSetting::SEGMENT_GENERAL.','.SystemSetting::SEGMENT_BILLING,
            ];
        }
        else if ($method == 'PATCH')
        {
            $rules = [
                'value'   => 'required|max:255',
            ];
        }

        return $rules;
    }
}