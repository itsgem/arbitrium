<?php

namespace App\Services;

use DB;
use App\Nrb\NrbServices;
use App\Models\Invoice;

class ClientCreditServices extends NrbServices
{
    // Admin\ClientsController::adjustCredit
    // Admin\ClientsController::purchaseCredit
    public function adjustCredit($request, $purchase = false)
    {
        return DB::transaction(function () use ($request, $purchase)
        {
            $invoice = Invoice::addCredit([
                'category'      => ($purchase ? Invoice::PURCHASE_CREDIT : Invoice::CREDIT_ADJUSTMENT),
                'client_id'     => $request->get('client_id'),
                'description'   => $request->get('description'),
                'total_amount_in_credit' => $request->get('amount_in_credit'),
            ]);

            return $this->respondWithSuccess(['balance' => $invoice->client->credit_balance]);
        });
    }
}
