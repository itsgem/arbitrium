<?php

namespace App\Http\Controllers\v1;

use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\InvoiceServices;

class InvoicesController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return ['getStatusList'];
    }

    protected function getMethods()
    {
        return [];
    }

    /**
     * Get all invoice statuses
     *
     * @SWG\Get(
     *     path="/list/invoice/status",
     *     tags={"Public - Dropdown Lists"},
     *     summary="Invoice Status",
     *     description="Get all invoice statuses.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", type="array", items=@SWG\Property(
     *                     @SWG\Property(property="id", type="string", description="ID", default="Cancelled"),
     *                     @SWG\Property(property="display_name", type="string", description="Name", default="Cancelled"),
     *                 )
     *             ),
     *         )
     *     ),
     * )
     *
     * @param InvoiceServices $service
     *
     * @return mixed
     */
    public function getStatusList(InvoiceServices $service)
    {
        return $service->getStatusList();
    }
}