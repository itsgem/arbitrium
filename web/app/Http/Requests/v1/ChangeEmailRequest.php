<?php

namespace App\Http\Requests\v1;

use App\Nrb\Http\v1\Requests\NrbRequest;

// UsersController::changeEmail
// UsersController::doChangeEmail
class ChangeEmailRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [];
        switch($this->method())
        {
            case 'GET': // CHANGE EMAIL
                $user = auth()->user();
                $rules = [
                    'new_email_address' => 'required|max:128|email|unique_users_by_user_type:email_address,user_type,'.$user->user_type.',id,NULL',
                    'callback_url'      => 'required|url'
                ];
                break;
            case 'PATCH': // VERIFY EMAIL
                $rules = [
                    'token'     => 'required|exists:reset_tokens,new_email_address_token,deleted_at,NULL'
                ];
                break;
        }

        return $rules;
    }
}