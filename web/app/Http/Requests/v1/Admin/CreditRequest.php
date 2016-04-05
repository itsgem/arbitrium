<?php

namespace App\Http\Requests\v1\Admin;

use App\Nrb\Http\v1\Requests\NrbRequest;

// Admin/ClientsController::adjustCredit
// Admin/ClientsController::purchaseCredit
class CreditRequest extends NrbRequest
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
            case 'POST': // ADJUST/PURCHASE CREDIT
                $rules = [
                    'amount_in_credit'  => 'required|integer|min:1'
                ];
                break;
        }

        return $rules;
    }
}