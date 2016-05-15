<?php

namespace App\Http\Controllers\v1\Admin;

use App\Http\Requests\v1\Admin\ClientApprovalRequest;
use App\Http\Requests\v1\Admin\CreditRequest;
use App\Http\Requests\v1\ClientUserRequest;
use App\Http\Requests\v1\Client\SubscriptionRequest;
use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\ClientServices;
use App\Services\ClientCreditServices;

class ClientsController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return [];
    }

    protected function getMethods()
    {
        return [
            'adjustCredit'  => 'Client Adjust Credit',
            'approve'       => 'Approve Client',
            'destroy'       => 'Delete Client',
            'disapprove'    => 'Disapprove Client',
            'index'         => 'Client List',
            'purchaseCredit'    => 'Client Purchase Credit',
            'show'          => 'Retrieve Client',
            'store'         => 'Add Client',
            'update'        => 'Update Client'
        ];
    }

    public function adjustCredit(CreditRequest $request, ClientCreditServices $service)
    {
        return $service->adjustCredit($request);
    }

    public function approve(ClientApprovalRequest $request, $id, ClientServices $service)
    {
        return $service->approve($request, $id);
    }

    public function destroy($id, ClientServices $service)
    {
        return $service->destroy($id);
    }

    public function disapprove($id, ClientServices $service)
    {
        return $service->approve($this->request, $id, false);
    }

    public function index(ClientServices $service)
    {
        return $service->index($this->request);
    }

    public function purchaseCredit(CreditRequest $request, ClientCreditServices $service)
    {
        return $service->adjustCredit($request, true);
    }

    public function show($id, ClientServices $service)
    {
        return $service->show($this->request, $id);
    }

    public function store(ClientUserRequest $request, ClientServices $service)
    {
        return $service->store($request);
    }

    public function update(ClientUserRequest $request, $id, ClientServices $service)
    {
        return $service->update($request, $id);
    }

    public function getSubscriptionHistory(ClientServices $service)
    {
        return $service->getSubscriptionHistory($this->request);
    }

    public function getSubscription(ClientServices $service)
    {
        return $service->getSubscription($this->request);
    }

    public function cancelSubscription($id, ClientServices $service)
    {
        return $service->cancelSubscription($id);
    }

    public function purchaseSubscription(SubscriptionRequest $request, $id, ClientServices $service)
    {
        return $service->purchaseSubscription($request, $id);
    }
}