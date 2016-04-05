<?php

namespace App\Http\Controllers\v1\Admin;

use App\Http\Requests\v1\Admin\InvoiceListRequest;
use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\InvoiceServices;

class InvoicesController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return ['showDetails'];
    }

    protected function getMethods()
    {
        return [
            'cancel'        => 'Mark invoice as cancelled',
            'index'         => 'Invoice List',
            'sendInvoice'   => 'Send Invoice',
            'show'          => 'Show Invoice Details',
            'paid'          => 'Mark invoice as paid',
        ];
    }

    public function cancel($id, InvoiceServices $service)
    {
        return $service->cancel($id);
    }

    public function index(InvoiceListRequest $request, InvoiceServices $service)
    {
        return $service->index($request);
    }

    public function paid($id, InvoiceServices $service)
    {
        return $service->paid($id);
    }

    public function sendInvoice($id, InvoiceServices $service)
    {
        return $service->sendInvoice($id);
    }

    public function show($id, InvoiceServices $service)
    {
        return $service->show($this->request, $id);
    }

    public function showDetails($id, InvoiceServices $service)
    {
        return $service->showDetails($id);
    }
}