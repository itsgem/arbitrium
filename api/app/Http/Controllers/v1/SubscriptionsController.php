<?php

namespace App\Http\Controllers\v1;

use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\SubscriptionServices;

class SubscriptionsController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return ['index'];
    }

    protected function getMethods()
    {
        return [];
    }

    public function index(SubscriptionServices $service)
    {
        return $service->index();
    }

    public function show($id, SubscriptionServices $service)
    {
        return $service->show($id);
    }
}