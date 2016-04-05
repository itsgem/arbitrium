<?php

namespace App\Http\Controllers\v1\Admin;

use App\Http\Requests\v1\Admin\SubscriptionRequest;
use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\SubscriptionServices;

class SubscriptionsController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return [];
    }

    protected function getMethods()
    {
        return [
            'destroy'   => 'Delete Subscription',
            'index'     => 'Subscription List',
            'show'      => 'Retrieve Subscription',
            'store'     => 'Add Subscription',
            'update'    => 'Update Subscription'
        ];
    }

    public function destroy($id, SubscriptionServices $service)
    {
        return $service->destroy($id);
    }

    public function index(SubscriptionServices $service)
    {
        return $service->index();
    }

    public function show($id, SubscriptionServices $service)
    {
        return $service->show($id);
    }

    public function store(SubscriptionRequest $request, SubscriptionServices $service)
    {
        return $service->store($request);
    }

    public function update(SubscriptionRequest $request, $id, SubscriptionServices $service)
    {
        return $service->update($request, $id);
    }
}