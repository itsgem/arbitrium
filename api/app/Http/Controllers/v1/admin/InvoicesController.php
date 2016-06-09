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

    /**
     * Mark invoice as Cancelled
     *
     * @SWG\Patch(
     *     path="/admin/invoice/{invoice}/cancel",
     *     tags={"Admin - Invoice"},
     *     summary="Cancel Invoice",
     *     description="Mark invoice as Cancelled.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", type="array")
     *         )
     *     ),
     *     @SWG\Response(response="204", description="No matches or no allowed matches found"),
     *     @SWG\Response(response="403", description="Authentication Failed",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "messages"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="false"),
     *             @SWG\Property(property="message", type="string", description="Error message", default="Authentication Failed"),
     *             @SWG\Property(property="messages", type="array", description="Other messages or instructions for user", items=""),
     *         )
     *     ),
     *     @SWG\Parameter(
     *         name="X-Token",
     *         in="header",
     *         description="X-Token",
     *         required=true,
     *         type="string",
     *         default=""
     *     ),
     *     @SWG\Parameter(
     *         name="invoice",
     *         in="path",
     *         description="Invoice ID",
     *         required=true,
     *         type="string",
     *         default="1"
     *     ),
     * )
     *
     * @param $id
     * @param InvoiceServices $service
     *
     * @return mixed
     */
    public function cancel($id, InvoiceServices $service)
    {
        return $service->cancel($id);
    }

    /**
     * Get all client invoices
     *
     * @SWG\Get(
     *     path="/admin/invoice",
     *     tags={"Admin - Invoice"},
     *     summary="All Invoices",
     *     description="Get all client invoices.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", type="array", items=@SWG\Property(ref="#/definitions/InvoiceResponse"))
     *         )
     *     ),
     *     @SWG\Response(response="403", description="Authentication Failed",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "messages"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="false"),
     *             @SWG\Property(property="message", type="string", description="Error message", default="Authentication Failed"),
     *             @SWG\Property(property="messages", type="array", description="Other messages or instructions for user", items=""),
     *         )
     *     ),
     *     @SWG\Parameter(
     *         name="X-Token",
     *         in="header",
     *         description="X-Token",
     *         required=true,
     *         type="string",
     *         default=""
     *     ),
     *     @SWG\Parameter(name="date_from", in="query", description="FILTER by invoiced date from (YYYY-MM-DD)", required=false, type="string", format="date", default=""),
     *     @SWG\Parameter(name="date_to", in="query", description="FILTER by invoiced date to (YYYY-MM-DD)", required=false, type="string", format="date", default=""),
     *     @SWG\Parameter(name="invoice_no", in="query", description="FILTER by invoice number", required=false, type="string", default=""),
     *     @SWG\Parameter(name="po_no", in="query", description="FILTER by invoice PO number", required=false, type="string", default=""),
     *     @SWG\Parameter(name="type", in="query", description="FILTER by subscription type (plan|trial)", required=false, type="string", default=""),
     *     @SWG\Parameter(name="company_name", in="query", description="FILTER by client company name", required=false, type="string", default=""),
     *     @SWG\Parameter(name="status", in="query", description="FILTER by status (Unpaid|Paid|Cancelleds)", required=false, type="string", default=""),
     *     @SWG\Parameter(name="sort_by", in="query", description="Order by according to: created_at (default)", required=false, type="string", default=""),
     *     @SWG\Parameter(name="sort_dir", in="query", description="Order by direction: asc => ascending, desc (default) => descending", required=false, type="string", default=""),
     *     @SWG\Parameter(name="per_page", in="query", description="for pagination, number of items to return per page", required=false, type="integer", default=""),
     *     @SWG\Parameter(name="page", in="query", description="for pagination, show items belonging to page", required=false, type="integer", default=""),
     *     @SWG\Parameter(name="max_pagination_links", in="query", description="for pagination, maximum number of pages", required=false, type="integer", default=""),
     * )
     *
     * @param InvoiceListRequest $request
     * @param InvoiceServices $service
     *
     * @return mixed
     */
    public function index(InvoiceListRequest $request, InvoiceServices $service)
    {
        return $service->index($request);
    }

    /**
     * Mark invoice as paid
     *
     * @SWG\Patch(
     *     path="/admin/invoice/{invoice}/paid",
     *     tags={"Admin - Invoice"},
     *     summary="Mark Invoice as Paid",
     *     description="Mark invoice as paid.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data",
     *                 @SWG\Property(property="url", type="string", description="Invoice PDF url", default="http://arbitrium-api.dev/invoices/0000000035.pdf")
     *             )
     *         )
     *     ),
     *     @SWG\Response(response="204", description="No matches or no allowed matches found"),
     *     @SWG\Response(response="403", description="Authentication Failed",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "messages"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="false"),
     *             @SWG\Property(property="message", type="string", description="Error message", default="Authentication Failed"),
     *             @SWG\Property(property="messages", type="array", description="Other messages or instructions for user", items=""),
     *         )
     *     ),
     *     @SWG\Parameter(
     *         name="X-Token",
     *         in="header",
     *         description="X-Token",
     *         required=true,
     *         type="string",
     *         default=""
     *     ),
     *     @SWG\Parameter(
     *         name="invoice",
     *         in="path",
     *         description="Invoice ID",
     *         required=true,
     *         type="string",
     *         default="1"
     *     ),
     * )
     *
     * @param $id
     * @param InvoiceServices $service
     *
     * @return mixed
     */
    public function paid($id, InvoiceServices $service)
    {
        return $service->paid($id);
    }

    /**
     * Send invoice to client
     *
     * @SWG\Get(
     *     path="/admin/invoice/{invoice}/send",
     *     tags={"Admin - Invoice"},
     *     summary="Send Invoice",
     *     description="Send invoice to client.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", type="array")
     *         )
     *     ),
     *     @SWG\Response(response="204", description="No matches or no allowed matches found"),
     *     @SWG\Response(response="403", description="Authentication Failed",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "messages"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="false"),
     *             @SWG\Property(property="message", type="string", description="Error message", default="Authentication Failed"),
     *             @SWG\Property(property="messages", type="array", description="Other messages or instructions for user", items=""),
     *         )
     *     ),
     *     @SWG\Parameter(
     *         name="X-Token",
     *         in="header",
     *         description="X-Token",
     *         required=true,
     *         type="string",
     *         default=""
     *     ),
     *     @SWG\Parameter(
     *         name="invoice",
     *         in="path",
     *         description="Invoice ID",
     *         required=true,
     *         type="string",
     *         default="1"
     *     ),
     * )
     *
     * @param $id
     * @param InvoiceServices $service
     *
     * @return mixed
     */
    public function sendInvoice($id, InvoiceServices $service)
    {
        return $service->sendInvoice($id);
    }

    /**
     * Get client single invoice
     *
     * @SWG\Get(
     *     path="/admin/invoice/{invoice}",
     *     tags={"Admin - Invoice"},
     *     summary="Single Invoice",
     *     description="Get client single invoice.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", ref="#/definitions/InvoiceResponse")
     *         )
     *     ),
     *     @SWG\Response(response="204", description="No matches or no allowed matches found"),
     *     @SWG\Response(response="403", description="Authentication Failed",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "messages"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="false"),
     *             @SWG\Property(property="message", type="string", description="Error message", default="Authentication Failed"),
     *             @SWG\Property(property="messages", type="array", description="Other messages or instructions for user", items=""),
     *         )
     *     ),
     *     @SWG\Parameter(
     *         name="X-Token",
     *         in="header",
     *         description="X-Token",
     *         required=true,
     *         type="string",
     *         default=""
     *     ),
     *     @SWG\Parameter(
     *         name="invoice",
     *         in="path",
     *         description="Invoice ID",
     *         required=true,
     *         type="string",
     *         default="1"
     *     ),
     *     @SWG\Parameter(name="with-details", in="query", description="Include Data: Invoice Details (0|1)", required=false, type="string", default=""),
     *     @SWG\Parameter(name="with-settings", in="query", description="Include Data: System Settings (0|1)", required=false, type="string", default=""),
     * )
     *
     * @param $id
     * @param InvoiceServices $service
     *
     * @return mixed
     */
    public function show($id, InvoiceServices $service)
    {
        return $service->show($this->request, $id);
    }

    /**
     * Get client single invoice's details
     *
     * @SWG\Get(
     *     path="/admin/invoice/{invoice}/details",
     *     tags={"Admin - Invoice"},
     *     summary="Single Invoice - Details",
     *     description="Get client single invoice's details.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", type="array", items=@SWG\Property(ref="#/definitions/InvoiceDetailResponse"))
     *         )
     *     ),
     *     @SWG\Response(response="204", description="No matches or no allowed matches found"),
     *     @SWG\Response(response="403", description="Authentication Failed",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "messages"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="false"),
     *             @SWG\Property(property="message", type="string", description="Error message", default="Authentication Failed"),
     *             @SWG\Property(property="messages", type="array", description="Other messages or instructions for user", items=""),
     *         )
     *     ),
     *     @SWG\Parameter(
     *         name="X-Token",
     *         in="header",
     *         description="X-Token",
     *         required=true,
     *         type="string",
     *         default=""
     *     ),
     *     @SWG\Parameter(
     *         name="invoice",
     *         in="path",
     *         description="Invoice ID",
     *         required=true,
     *         type="string",
     *         default="1"
     *     ),
     * )
     *
     * @param $id
     * @param InvoiceServices $service
     *
     * @return mixed
     */
    public function showDetails($id, InvoiceServices $service)
    {
        return $service->showDetails($id);
    }
}