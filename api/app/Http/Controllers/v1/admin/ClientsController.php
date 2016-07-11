<?php

namespace App\Http\Controllers\v1\Admin;

use App\Http\Requests\v1\Admin\ClientApprovalRequest;
use App\Http\Requests\v1\ClientUserRequest;
use App\Http\Requests\v1\Client\SubscriptionRequest;
use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\ClientServices;
use App\Services\SubscriptionServices;

class ClientsController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return [];
    }

    protected function getMethods()
    {
        return [
            'approve'                => 'Approve Client',
            'destroy'                => 'Delete Client',
            'disapprove'             => 'Disapprove Client',
            'index'                  => 'Client List',
            'show'                   => 'Retrieve Client',
            'store'                  => 'Add Client',
            'update'                 => 'Update Client',
            'getSubscriptionHistory' => 'Get All Client Subscriptions History List',
            'getSubscription'        => 'Get All Client Current Subscription List',
            'getSubscriptionSingle'  => 'Get Single Client Current Subscription',
            'getPendingSubscriptionSingle'         => 'Get Single Client Pending Subscription',
            'resendSubscriptionChangeApprovalLink' => 'Resend Client Subscription Change Approval Link',
            'cancelSubscription'     => 'Cancel Single Client Subscription',
            'changeSubscription'     => 'Change Single Client Subscription',
        ];
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

    /**
     * Get all clients
     *
     * @SWG\Get(
     *     path="/admin/client",
     *     tags={"Admin - Clients"},
     *     summary="All Clients",
     *     description="Get all clients",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", type="array", items=@SWG\Property(ref="#/definitions/ClientResponse"))
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
     *     @SWG\Parameter(name="company_name", in="query", description="FILTER by client company name", required=false, type="string", default=""),
     *     @SWG\Parameter(name="username", in="query", description="FILTER by client username", required=false, type="string", default=""),
     *     @SWG\Parameter(name="approval_status", in="query", description="FILTER by approval status (Approved|Disapproved|Pending)", required=false, type="string", default=""),
     *     @SWG\Parameter(name="per_page", in="query", description="for pagination, number of items to return per page", required=false, type="integer", default=""),
     *     @SWG\Parameter(name="page", in="query", description="for pagination, show items belonging to page", required=false, type="integer", default=""),
     *     @SWG\Parameter(name="max_pagination_links", in="query", description="for pagination, maximum number of pages", required=false, type="integer", default=""),
     * )
     *
     * @param SubscriptionServices $service
     *
     * @return mixed
     */
    public function index(ClientServices $service)
    {
        return $service->index($this->request);
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

    //----- SUBSCRIPTIONS

    /**
     * Get all client subscription history
     *
     * @SWG\Get(
     *     path="/admin/client/subscription",
     *     tags={"Admin - Client Subscription"},
     *     summary="All Subscription History",
     *     description="Get all client subscription history",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", type="array", items=@SWG\Property(ref="#/definitions/ClientSubscriptionConfirmResponse"))
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
     *     @SWG\Parameter(name="client_id", in="query", description="FILTER by client_id", required=false, type="integer", default=""),
     *     @SWG\Parameter(name="subscription_id", in="query", description="FILTER by subscription_id", required=false, type="integer", default=""),
     *     @SWG\Parameter(name="name", in="query", description="FILTER by subscription package name (Free Trial|Basic|Standard|Business|Premium)", required=false, type="string", default=""),
     *     @SWG\Parameter(name="type", in="query", description="FILTER by subscription type (plan|trial)", required=false, type="string", default=""),
     *     @SWG\Parameter(name="company_name", in="query", description="FILTER by client company name", required=false, type="string", default=""),
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
     * @param SubscriptionServices $service
     *
     * @return mixed
     */
    public function getSubscriptionHistory(SubscriptionServices $service)
    {
        return $service->getSubscriptionHistory($this->request);
    }

    /**
     * Get all client's current subscription
     *
     * @SWG\Get(
     *     path="/admin/client/subscription/current",
     *     tags={"Admin - Client Subscription"},
     *     summary="All Current Subscription",
     *     description="Get all client's current subscription",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", type="array", items=@SWG\Property(ref="#/definitions/ClientSubscriptionConfirmResponse"))
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
     *     @SWG\Parameter(name="client_id", in="query", description="FILTER by client_id", required=false, type="integer", default=""),
     *     @SWG\Parameter(name="subscription_id", in="query", description="FILTER by subscription_id", required=false, type="integer", default=""),
     *     @SWG\Parameter(name="name", in="query", description="FILTER by subscription package name (Free Trial|Basic|Standard|Business|Premium)", required=false, type="string", default=""),
     *     @SWG\Parameter(name="type", in="query", description="FILTER by subscription type (plan|trial)", required=false, type="string", default=""),
     *     @SWG\Parameter(name="company_name", in="query", description="FILTER by client company name", required=false, type="string", default=""),
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
     * @param SubscriptionServices $service
     *
     * @return mixed
     */
    public function getSubscription(SubscriptionServices $service)
    {
        return $service->getSubscription($this->request);
    }

    /**
     * Get single client's current subscription
     *
     * @SWG\Get(
     *     path="/admin/client/{client}/subscription/current",
     *     tags={"Admin - Client Subscription"},
     *     summary="Single Client Current Subscription",
     *     description="Get single client's current subscription",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", ref="#/definitions/ClientSubscriptionResponse")
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
     *         name="client",
     *         in="path",
     *         description="Client ID",
     *         required=true,
     *         type="string",
     *         default="1"
     *     ),
     * )
     *
     * @param $id
     * @param SubscriptionServices $service
     *
     * @return mixed
     */
    public function getSubscriptionSingle($id, SubscriptionServices $service)
    {
        return $service->getSubscription($this->request, $id);
    }

    public function getPendingSubscriptionSingle($id, SubscriptionServices $service)
    {
        return $service->getPendingSubscription($this->request, $id);
    }

    public function resendSubscriptionChangeApprovalLink($id, SubscriptionServices $service)
    {
        return $service->resendSubscriptionChangeApprovalLink($id);
    }

    /**
     * Cancel Client Subscription
     *
     * @SWG\Patch(
     *     path="/admin/client/{client}/subscription/cancel",
     *     tags={"Admin - Client Subscription"},
     *     summary="Cancel Subscription",
     *     description="Cancel Client Subscription",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", description="Data")
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
     *         name="client",
     *         in="path",
     *         description="Client ID",
     *         required=true,
     *         type="string",
     *         default="1"
     *     ),
     * )
     *
     * @param $id
     * @param SubscriptionServices $service
     *
     * @return mixed
     */
    public function cancelSubscription($id, SubscriptionServices $service)
    {
        return $service->cancelSubscription($id);
    }

    /**
     * Change Client Subscription
     *
     * @SWG\Post(
     *     path="/admin/client/{client}/subscription",
     *     tags={"Admin - Client Subscription"},
     *     summary="Change Subscription",
     *     description="Change Client Subscription.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", description="Data", ref="#/definitions/ClientSubscriptionResponse")
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
     *         name="client",
     *         in="path",
     *         description="Client ID",
     *         required=true,
     *         type="string",
     *         default="1"
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
     * @param $id
     * @param SubscriptionServices $service
     *
     * @return mixed
     */
    public function changeSubscription(SubscriptionRequest $request, $id, SubscriptionServices $service)
    {
        return $service->subscribe($request, $id);
    }
}