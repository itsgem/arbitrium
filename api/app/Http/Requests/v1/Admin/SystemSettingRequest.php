<?php

namespace App\Http\Requests\v1\Admin;

use App\Errors;
use App\Models\SystemSetting;
use App\Nrb\Http\v1\Requests\NrbRequest;
use Illuminate\Support\Facades\Validator;

// Admin/SystemSettingsController::store
// Admin/SystemSettingsController::update
// Admin/SystemSettingsController::updateMany
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
                'name'    => 'required|slug|max:255|unique:system_settings,name',
                'value'   => 'required|max:255',
                'segment' => 'required|slug|max:255|in:'.SystemSetting::SEGMENT_GENERAL.','.SystemSetting::SEGMENT_BILLING,
            ];
        }
        else if ($method == 'PATCH')
        {
            // If bulk edit (api/v1/system_setting/many)
            if (last($this->segments()) == 'many')
            {
                $rules = [
                    'system_setting' => 'required|array'
                ];
            }
            else
            {
                $rules = [
                    'value'   => 'required|max:255',
                ];
            }
        }

        return $rules;
    }

    public function validate()
    {
        $errors = [];
        // validate based on the rules defined above
        $instance = $this->getValidatorInstance();
        if (!$instance->passes())
        {
            $errors = $instance->errors()->toArray();
        }
        else
        {
            $method = $this->method();
            if ($method == 'PATCH')
            {
                // If bulk edit (api/v1/system_setting/many)
                if (last($this->segments()) == 'many')
                {
                    // Validate System Settings
                    $rules_system_setting = [
                        'name'  => ['required', 'exists:system_settings,name'],
                        'value' => ['required', 'max:255'],
                    ];
                    if ($system_setting = $this->get('system_setting'))
                    {
                        foreach ($system_setting as $setting)
                        {
                            $validation = Validator::make(
                                [
                                    'name'  => get_val($setting, 'name', ''),
                                    'value' => get_val($setting, 'value', ''),
                                ],
                                $rules_system_setting
                            );
                            if ($validation->fails())
                            {
                                $errors['system_setting'][] = $validation->messages()->toArray();
                            }
                        }
                    }
                }
            }
        }

        if (!empty($errors))
        {
            $this->errors = $errors;
            $this->failedValidation($instance);
        }
    }

    public function response(array $errors)
    {
        return parent::response($this->errors);
    }
}