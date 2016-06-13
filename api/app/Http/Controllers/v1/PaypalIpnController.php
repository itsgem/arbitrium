<?php

namespace App\Http\Controllers\v1;

use App\Http\Requests\v1\PaypalIpnRequest;
use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\PaypalServices;

class PaypalIpnController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return ['status'];
    }

    protected function getMethods()
    {
        return [];
    }

    public function status(PaypalIpnRequest $request, PaypalServices $service)
    {
        return $service->statusUpdate($request);
    }
}