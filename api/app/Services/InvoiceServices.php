<?php

namespace App\Services;

use App\Errors;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use App\Models\SystemSetting;
use App\Nrb\NrbServices;

class InvoiceServices extends NrbServices
{
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
    // Admin\InvoicesController::listByClient
    // Client\ClientsController::listInvoice
    public function index($request, $client_id = null)
    {
        $client_id = ($client_id) ? $client_id : $request->get('client_id');

        return $this->respondWithData(
            Invoice::invoiceDateFrom($request->get('date_from'))
            ->invoiceDateTo($request->get('date_to'))
            ->invoiceNoLike($request->get('invoice_no'))
            ->clientId($client_id)
            ->poNoLike($request->get('po_no'))
            ->companyNameLike($request->get('company_name'))
            ->clientNameLike($request->get('client_name'))
            ->status($request->get('status'))
            ->latest()
            ->paginate($request->get('per_page')),
            $request->get('max_pagination_links')
        );
    }

    // Admin\InvoicesController::listDistinctByClient
    public function listClientLatest($request)
    {
        $invoices = Invoice::clientLatest()
            ->invoiceDateFrom($request->get('date_from'))
            ->invoiceDateTo($request->get('date_to'))
            ->invoiceNoLike($request->get('invoice_no'))
            ->clientId($request->get('client_id'))
            ->poNoLike($request->get('po_no'))
            ->companyNameLike($request->get('company_name'))
            ->clientNameLike($request->get('client_name'))
            ->status($request->get('status'))
            ->paginate($request->get('per_page'));

        return $this->respondWithData($invoices, $request->get('max_pagination_links'));
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
    public function sendInvoice($id, $client_id = null)
    {
        $invoice = Invoice::clientId($client_id)->findOrFail($id);
        if ($invoice->sendInvoice())
        {
            return $this->respondWithSuccess();
        }
        return $this->respondWithError(Errors::INVOICE_STILL_UNPAID);
    }

    // Admin\InvoicesController::show
    // Client\ClientsController::showInvoice
    public function show($request, $id, $client_id = null)
    {
        $invoice = new Invoice();
        if ($request->get('with-details'))
        {
            $invoice = $invoice->with('invoice_details');
        }
        $invoice = $invoice->clientId($client_id)->findOrFail($id);

        if ($request->get('with-settings'))
        {
            $invoice['system_settings'] = SystemSetting::getList();
        }

        return $this->respondWithSuccess($invoice);
    }

    // Admin\InvoicesController::showDetails
    public function showDetails($id)
    {
        return $this->respondWithSuccess(
            InvoiceDetail::invoiceId($id)->get()
        );
    }
}
