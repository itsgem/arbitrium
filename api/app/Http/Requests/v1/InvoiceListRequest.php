<?php

namespace App\Http\Requests\v1;

use App\Nrb\Http\v1\Requests\NrbRequest;

// Admin/InvoicesController::index
// Client/ClientsController::transactionHistory
class InvoiceListRequest extends NrbRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $validate_from = "";
        if($this->get('date_from') && $this->get('date_to'))
        {
            $validate_from = "|date_range:date_to";
        }

        $rules = [
           'date_from' => 'date|date_format:Y-m-d'.$validate_from,
           'date_to'   => 'date|date_format:Y-m-d'
        ];

        return $rules;
    }
}
