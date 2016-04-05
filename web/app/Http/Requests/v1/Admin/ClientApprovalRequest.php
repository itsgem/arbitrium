<?php

namespace App\Http\Requests\v1\Admin;

use App\Nrb\Http\v1\Requests\NrbRequest;

// Admin/ClientsController::approve
class ClientApprovalRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'callback_url' => 'required|url'
        ];
    }
}