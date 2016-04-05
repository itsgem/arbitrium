<?php

namespace App\Services;

use App\Models\Invoice;
use App\Models\InvoiceDetail;
use App\Models\SystemSetting;
use App\Nrb\NrbServices;

class InvoiceServices extends NrbServices
{
    // InvoicesController::getCategoryList
    public function getCategoryList()
    {
        return $this->respondWithData(Invoice::getCategoryList());
    }

    // InvoicesController::getStatusList
    public function getStatusList()
    {
        return $this->respondWithData(Invoice::getStatusList());
    }

    // Admin\InvoicesController::cancel
    public function cancel($id)
    {
        // TODO-GEM: specs
        $invoice = Invoice::findOrFail($id);
        $invoice->cancel();
        return $this->respondWithSuccess();
    }

    // Admin\InvoicesController::index
    public function index($request)
    {
        return $this->respondWithData(
            Invoice::invoiceDateFrom($request->get('date_from'))
            ->invoiceDateTo($request->get('date_to'))
            ->invoiceNoLike($request->get('invoice_no'))
            ->clientId($request->get('client_id'))
            ->poNoLike($request->get('po_no'))
            ->companyNameLike($request->get('company_name'))
            ->category($request->get('category'))
            ->status($request->get('status'))
            ->latest()
            ->paginate($request->get('per_page')),
            $request->get('max_pagination_links')
        );
    }

    // Admin\InvoicesController::paid
    public function paid($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->paid();
        // TODO-GEM: need to increment credit? and send email?
        // $invoice->client->increment('credit_balance', $invoice->total_amount_in_credit);
        // with(new MailServices())->sendInvoice($invoice->user, $invoice->url);
        return $this->respondWithSuccess(['url' => $invoice->url]);
    }

    // Admin\InvoicesController::sendInvoice
    public function sendInvoice($id)
    {
        $invoice = Invoice::findOrFail($id);
        if ($invoice->isPaid())
        {
            with(new MailServices())->sendInvoice($invoice->user, $invoice->url);
        }
        return $this->respondWithSuccess();
    }

    // Admin\InvoicesController::show
    public function show($request, $id)
    {
        $invoice = new Invoice();
        if ($request->get('with-details'))
        {
            $invoice = $invoice->with('invoice_details');
        }

        return $this->respondWithSuccess($invoice->findOrFail($id));
    }

    // Admin\InvoicesController::showDetails
    public function showDetails($id)
    {
        return $this->respondWithSuccess(
            InvoiceDetail::invoiceId($id)->get()
        );
    }
}
