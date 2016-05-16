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

    /**
     * Delete subscription package
     *
     * @SWG\Delete(
     *     path="/admin/subscription/{subscription}",
     *     tags={"Admin - Subscription"},
     *     summary="Delete Subscription",
     *     description="Delete subscription package details.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", description="Data", ref="#/definitions/SubscriptionResponse")
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
     *         name="subscription",
     *         in="path",
     *         description="Subscription ID",
     *         required=true,
     *         type="string",
     *         default="1"
     *     )
     * )
     *
     * @param $id
     * @param SubscriptionServices $service
     *
     * @return mixed
     */
    public function destroy($id, SubscriptionServices $service)
    {
        return $service->destroy($id);
    }

    /**
     * Get all subscription packages
     *
     * @SWG\Get(
     *     path="/admin/subscription",
     *     tags={"Admin - Subscription"},
     *     summary="Subscriptions List",
     *     description="Get all subscription packages.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", type="array", items=@SWG\Property(ref="#/definitions/SubscriptionResponse"))
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
     * @param SubscriptionServices $service
     *
     * @return mixed
     */
    public function index(SubscriptionServices $service)
    {
        return $service->index();
    }

    /**
     * Get single subscription package
     *
     * @SWG\Get(
     *     path="/admin/subscription/{subscription}",
     *     tags={"Admin - Subscription"},
     *     summary="Single Subscription",
     *     description="Get single subscription package.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", description="Data", ref="#/definitions/SubscriptionResponse")
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
     *         name="subscription",
     *         in="path",
     *         description="Subscription ID",
     *         required=true,
     *         type="string",
     *         default="1"
     *     )
     * )
     *
     * @param $id
     * @param SubscriptionServices $service
     *
     * @return mixed
     */
    public function show($id, SubscriptionServices $service)
    {
        return $service->show($id);
    }

    /**
     * Add new subscription package
     *
     * @SWG\Post(
     *     path="/admin/subscription",
     *     tags={"Admin - Subscription"},
     *     summary="Add Subscription",
     *     description="Add new subscription package.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", description="Data", ref="#/definitions/SubscriptionResponse")
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
     *         @SWG\Schema(title="data", type="object", ref="#/definitions/Subscription"))
     *     )
     * )
     *
     * @param SubscriptionRequest $request
     * @param SubscriptionServices $service
     *
     * @return mixed
     */
    public function store(SubscriptionRequest $request, SubscriptionServices $service)
    {
        return $service->store($request);
    }

    /**
     * Edit subscription package
     *
     * @SWG\Put(
     *     path="/admin/subscription/{subscription}",
     *     tags={"Admin - Subscription"},
     *     summary="Update Subscription",
     *     description="Edit subscription package details.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", description="Data", ref="#/definitions/SubscriptionResponse")
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
     *         name="subscription",
     *         in="path",
     *         description="Subscription ID",
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
     *         @SWG\Schema(title="data", type="object", ref="#/definitions/Subscription"))
     *     )
     * )
     *
     * @param SubscriptionRequest $request
     * @param $id
     * @param SubscriptionServices $service
     *
     * @return mixed
     */
    public function update(SubscriptionRequest $request, $id, SubscriptionServices $service)
    {
        return $service->update($request, $id);
    }
}