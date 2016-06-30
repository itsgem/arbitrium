<?php

namespace App\Http\Requests\v1;

use App\Errors;
use App\Http\Requests\v1\Field\UsernameRequest;
use App\Http\Requests\v1\Field\PasswordRequest;
use App\Models\Client;
use App\Nrb\Http\v1\Requests\NrbRequest;
use App\Services\ExternalRequestServices;
use App\User;

// Admin/ClientsController::store
// Admin/ClientsController::update
// Client/ClientsController::update
// UsersController::registerClient
class ClientUserRequest extends NrbRequest
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
            $is_client = is_client_user_logged_in();
            $username_rule = with(new UsernameRequest())->rules()['username'];
            $email_address_rule = 'required|max:128|email|unique_users_by_user_type:email_address,user_type,'.User::CLIENT.',id,NULL';
            if ($method == 'PUT')
            {
                if ($is_client)
                {
                    $id = auth()->user()->id;
                    // client has to use change email address API
                    $email_address_rule = '';
                }
                else
                {
                    $client_id = last($this->segments());
                    $id = Client::findOrFail($client_id)->user_id;
                    $email_address_rule = str_replace('id,NULL', 'id,'.$id, $email_address_rule);
                }
                $username_rule = str_replace('id,NULL', 'id,'.$id, $username_rule);
            }

            // #122 Client - Optional fields during Sign up
            $optional_signup = 'required|';
            if ($method == 'POST' && !get_logged_in_user_id())
            {
                $optional_signup = '';
            }


            $rules = [
                'username'          => $username_rule,
                'email_address'     => $email_address_rule,
                'company_name'      => 'required|max:255',
                'street_address_1'  => $optional_signup.'max:255',
                'street_address_2'  => 'max:255',
                'city'              => $optional_signup.'max:100',
                'state'             => 'max:100',
                'country_id'        => $optional_signup.'exists:countries,id',
                'postal_code'       => $optional_signup.'alpha_dash|max:10',
                'rep_first_name'    => 'required|max:64',
                'rep_last_name'     => 'required|max:64',
                'rep_email_address' => 'required|max:255|email',
                'rep_gender'        => $optional_signup.'gender',
                'rep_mobile_code'   => 'digit|digits_between:1,3',
                'rep_mobile_number' => 'digit|digits_between:1,12',
                'rep_phone_code'    => 'digit|digits_between:1,3',
                'rep_phone_number'  => 'digit|digits_between:1,12',
                'rep_position'      => 'required|max:100',
                'rep_department'    => $optional_signup.'max:100',
                'alt_first_name'    => 'max:64',
                'alt_last_name'     => 'max:64',
                'alt_email_address' => 'max:255|email',
                'alt_gender'        => 'gender',
                'alt_mobile_code'   => 'digit|digits_between:1,3',
                'alt_mobile_number' => 'digit|digits_between:1,12',
                'alt_phone_code'    => 'digit|digits_between:1,3',
                'alt_phone_number'  => 'digit|digits_between:1,12',
                'alt_position'      => 'max:100',
                'alt_department'    => 'max:100',
                'items_per_page'    => 'integer',
                'timezone'          => 'timezone'
            ];

            if ($method == 'POST')
            {
                // we need this link for the account activation email link;
                // newly created clients must set their password using reset password screen
                $rules['callback_url'] = 'required|url';

                if (!get_logged_in_user_id())
                {
                    // password must be set during client registration
                    $rules['password'] = with(new PasswordRequest())->rules()['password'];
                }
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
            // [Core-API] Check if username already taken
            if ($this->get('username'))
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