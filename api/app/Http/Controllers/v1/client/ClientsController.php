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
        return [];
    }

    protected function getMethods()
    {
        return [
            'cancelSubscription'     => 'Cancel Client Subscription',
            'getSubscription'        => 'Get Client Current Subscription',
            'getSubscriptionHistory' => 'Get Client Subscription History',
            'purchaseSubscription'   => 'Purchase / Renew Client Subscription',
            'show'                   => 'Show Client Profile',
            'update'                 => 'Update Client Profile'
        ];
    }

    /**
     * Cancel Client Subscription
     *
     * @SWG\Patch(
     *     path="/client/subscription/cancel",
     *     tags={"Client - Client Subscription"},
     *     summary="Cancel Subscription",
     *     description="Cancel Client Subscription.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", description="Data")
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
     *     )
     * )
     *
     * @param ClientServices $service
     *
     * @return mixed
     */
    public function cancelSubscription(ClientServices $service)
    {
        return $service->cancelSubscription(auth()->user()->client);
    }

    /**
     * Get current client subscription details
     *
     * @SWG\Get(
     *     path="/client/subscription/current",
     *     tags={"Client - Client Subscription"},
     *     summary="Current Subscription",
     *     description="Get current client subscription details.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", description="Data", ref="#/definitions/ClientSubscriptionResponse")
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
     *     )
     * )
     *
     * @param ClientServices $service
     *
     * @return mixed
     */
    public function getSubscription(ClientServices $service)
    {
        return $service->getSubscription($this->request, get_logged_in_client_id());
    }

    /**
     * Get Client Subscription History
     *
     * @SWG\Get(
     *     path="/client/subscription",
     *     tags={"Client - Client Subscription"},
     *     summary="Subscription History",
     *     description="Get Client Subscription History.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", type="array", items=@SWG\Property(ref="#/definitions/ClientSubscriptionResponse"))
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
     *     @SWG\Parameter(name="subscription_id", in="query", description="FILTER by subscription_id", required=false, type="integer", default=""),
     *     @SWG\Parameter(name="valid_from", in="query", description="FILTER by valid_from (YYYY-MM-DD)", required=false, type="string", format="date", default=""),
     *     @SWG\Parameter(name="valid_to", in="query", description="FILTER by valid_to (YYYY-MM-DD)", required=false, type="string", format="date", default=""),
     *     @SWG\Parameter(name="valid_range_from", in="query", description="FILTER by valid_range_from (YYYY-MM-DD) (not exact specific)", required=false, type="string", format="date", default=""),
     *     @SWG\Parameter(name="valid_range_to", in="query", description="FILTER by valid_range_to (YYYY-MM-DD) (not exact specific)", required=false, type="string", format="date", default=""),
     *     @SWG\Parameter(name="sort_by", in="query", description="Order by according to: created_at (default)", required=false, type="string", default=""),
     *     @SWG\Parameter(name="sort_dir", in="query", description="Order by direction: asc => ascending, desc (default) => descending", required=false, type="string", default=""),
     *     @SWG\Parameter(name="per_page", in="query", description="for pagination, number of items to return per page", required=false, type="integer", default=""),
     *     @SWG\Parameter(name="page", in="query", description="for pagination, show items belonging to page", required=false, type="integer", default=""),
     *     @SWG\Parameter(name="max_pagination_links", in="query", description="for pagination, maximum number of pages", required=false, type="integer", default=""),
     * )
     *
     * @param ClientServices $service
     *
     * @return mixed
     */
    public function getSubscriptionHistory(ClientServices $service)
    {
        return $service->getSubscriptionHistory($this->request, get_logged_in_client_id());
    }

    /**
     * Purchase / Renew Client Subscription
     *
     * @SWG\Post(
     *     path="/client/subscription",
     *     tags={"Client - Client Subscription"},
     *     summary="Purchase / Renew Subscription",
     *     description="Purchase / Renew Client Subscription.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", description="Data", ref="#/definitions/ClientSubscriptionResponse")
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
     *     @SWG\Parameter(
     *         name="body",
     *         in="body",
     *         description="Subscription",
     *         required=true,
     *         type="object",
     *         @SWG\Schema(title="data", type="object", ref="#/definitions/ClientSubscription"))
     *     )
     * )
     *
     * @param SubscriptionRequest $request
     * @param ClientServices $service
     *
     * @return mixed
     */
    public function purchaseSubscription(SubscriptionRequest $request, ClientServices $service)
    {
        return $service->purchaseSubscription($request, auth()->user()->client);
    }

    /**
     * Get authenticated client profile
     *
     * @SWG\Get(
     *     path="/client/profile",
     *     tags={"Clients"},
     *     summary="My Profile",
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
        return $service->show($this->request, get_logged_in_client_id());
    }

    public function update(ClientUserRequest $request, ClientServices $service)
    {
        return $service->update($request, get_logged_in_client_id());
    }
}