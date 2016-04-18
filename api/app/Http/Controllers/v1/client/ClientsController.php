<?php

namespace App\Http\Controllers\v1\Client;

use App\Http\Requests\v1\Client\SubscriptionRequest;
use App\Http\Requests\v1\ClientUserRequest;
use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\ClientServices;

class ClientsController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return ['getSubscription'];
    }

    protected function getMethods()
    {
        return [
            'cancelSubscription'    => 'Cancel Subscription',
            'purchaseSubscription'  => 'Purchase Subscription',
            'show'      => 'Show Client Profile',
            'update'    => 'Update Client Profile'
        ];
    }

    public function cancelSubscription(ClientServices $service)
    {
        return $service->cancelSubscription(auth()->user()->client);
    }

    public function getSubscription(ClientServices $service)
    {
        return $service->getSubscription(auth()->user()->client->id);
    }

    public function purchaseSubscription(SubscriptionRequest $request, ClientServices $service)
    {
        return $service->purchaseSubscription($request, auth()->user()->client);
    }


    /**
     * Client - My Profile
     *
     * @SWG\Get(
     *     path="/client/profile",
     *     tags={"Clients"},
     *     summary="Client - My Profile",
     *     description="Get authenticated client profile",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", description="Data", ref="#/definitions/ClientProfileResponse")
     *         )
     *     ),
     *     @SWG\Parameter(
     *         name="X-Token",
     *         in="header",
     *         description="X-Token",
     *         required=true,
     *         type="string",
     *         default=""
     *     )
     * )
     *
     * @param ClientServices $service
     *
     * @return mixed
     */
    public function show(ClientServices $service)
    {
        return $service->show($this->request, auth()->user()->client->id);
    }

    public function update(ClientUserRequest $request, ClientServices $service)
    {
        return $service->update($request, auth()->user()->client->id);
    }
}