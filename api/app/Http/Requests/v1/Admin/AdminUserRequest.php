<?php

namespace App\Http\Requests\v1\Admin;

use App\Errors;
use App\Http\Requests\v1\Field\UsernameRequest;
use App\Http\Requests\v1\Field\PasswordRequest;
use App\Models\Admin;
use App\Nrb\Http\v1\Requests\NrbRequest;
use App\Services\ExternalRequestServices;
use App\User;

// Admin/AdminsController::store
// Admin/AdminsController::update
class AdminUserRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [];
        $method = $this->method();
        if ($method == 'POST' || $method == 'PUT')
        {
            $id = 'NULL';
            $username_rule = with(new UsernameRequest())->rules()['username'];
            $password_rule = with(new PasswordRequest())->rules()['password'];
            if ($method == 'PUT')
            {
                $admin_id = ((int) last($this->segments()) != 0) ? last($this->segments()) : get_logged_in_admin_id();
                $id = Admin::findOrFail($admin_id)->user_id;
                $username_rule = str_replace('id,NULL', 'id,'.$id, $username_rule);
                $password_rule = str_replace('required', 'sometimes', $password_rule);
            }

            $rules = [
                'username'       => $username_rule,
                'email_address'  => 'required|max:128|email|unique_users_by_user_type:email_address,user_type,'.User::ADMIN.',id,'.$id,
                'first_name'     => 'required|max:64',
                'last_name'      => 'required|max:64',
                'role_id'        => 'required|exists:roles,id',
                'remarks'        => 'max:200',
                'password'       => $password_rule,
                'items_per_page' => 'integer',
                'timezone'       => 'timezone'
            ];
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
            // [Core-API] Check if username already taken
            $admin_id = last($this->segments());
            $admin_id = ((int) $admin_id != 0) ? $admin_id : get_logged_in_admin_id();
            $username = Admin::findOrFail($admin_id)->user->username;

            if ($this->get('username') && $this->get('username') != $username)
            {
                $url = get_api_url(config('arbitrium.core.endpoints.check_username'), [
                    'username' => $this->get('username')
                ]);

                $result = (new ExternalRequestServices())->asObject()->send($url);

                if (!get_val($result, 'is_available'))
                {
                    $errors['username'][] = trans('errors.'.Errors::CORE_API_USERNAME_TAKEN);
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