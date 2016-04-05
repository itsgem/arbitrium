<?php

namespace App\Http\Controllers\v1;

use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\InvoiceServices;

class InvoicesController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return ['getCategoryList', 'getStatusList'];
    }

    protected function getMethods()
    {
        return [];
    }

    public function getCategoryList(InvoiceServices $service)
    {
        return $service->getCategoryList();
    }

    public function getStatusList(InvoiceServices $service)
    {
        return $service->getStatusList();
    }
}