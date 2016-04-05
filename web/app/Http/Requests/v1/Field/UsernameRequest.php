<?php

namespace App\Http\Requests\v1\Field;

use App\Nrb\Http\v1\Requests\NrbRequest;

// Admin/AdminsController::store
// Admin/AdminsController::update
// Admin/ClientsController::store
// Admin/ClientsController::update
// Client/ClientsController::update
// UsersController::checkUsernameAvailability
// UsersController::registerClient
class UsernameRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return ['username' => 'required|min:8|max:32|alpha_dash_dot|unique_username:id,NULL'];
    }
}