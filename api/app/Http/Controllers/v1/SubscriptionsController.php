<?php

namespace App\Http\Controllers\v1;

use App\Http\Requests\v1\SubscriptionValidityRequest;
use App\Models\ClientSubscription;
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

    /**
     * Get all subscription packages
     *
     * @SWG\Get(
     *     path="/subscription",
     *     tags={"Public - Subscription Packages"},
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
     *     path="/subscription/{subscription}",
     *     tags={"Public - Subscription Packages"},
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
     *         name="subscription",
     *         in="path",
     *         description="Subscription ID",
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
    public function show($id, SubscriptionServices $service)
    {
        return $service->show($id);
    }

    /**
     * Get all subscription terms
     *
     * @SWG\Get(
     *     path="/list/subscription/terms",
     *     tags={"Public - Client Subscriptions"},
     *     summary="Subscription Terms List",
     *     description="Get all subscription terms.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object")
     *     ),
     * )
     *
     * @return mixed
     */
    public function getTerms()
    {
        return $this->respondWithData(ClientSubscription::getTerms());
    }

    /**
     * Get subscription validity
     *
     * @SWG\Get(
     *     path="/client/subscription/validity",
     *     tags={"Public - Client Subscriptions"},
     *     summary="Get subscription validity",
     *     description="Get subscription validity.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", description="Data", required={"valid_from", "valid_to"},
     *                 @SWG\Property(property="valid_from", type="string", description="Date Valid From", default="2016-07-12"),
     *                 @SWG\Property(property="valid_to", type="string", description="Date Valid To", default="2016-08-11"),
     *             )
     *         )
     *     ),
     *     @SWG\Parameter(
     *         name="term",
     *         in="query",
     *         description="Term (Monthly|Annually)",
     *         required=true,
     *         type="string",
     *         default="Monthly"
     *     ),
     *     @SWG\Parameter(name="date", in="query", description="Date in YYYY-MM-DD format (Default: Current Date)", required=false, type="string", default="2016-07-12"),
     *     @SWG\Parameter(name="with-time", in="query", description="Include Data: Time (0|1)", required=false, type="string", default=""),
     * )
     *
     * @param SubscriptionValidityRequest $request
     *
     * @return mixed
     */
    public function getValidity(SubscriptionValidityRequest $request)
    {
        $date = $request->get('date') ? create_date_from_Ymd($request->get('date')) : current_datetime();

        $data['valid_from'] = clone $date;

        if ($request->get('term') == ClientSubscription::TERM_ANNUALLY)
        {
            $data['valid_to'] = $date->addDays(config('paypal.period_days.annually'));
        }
        else
        {
            // Monthly and Trial
            $data['valid_to'] = $date->addDays(config('paypal.period_days.monthly'));
        }

        $data = array_map(function($date) use($request){
            if ($request->get('with-time'))
            {
                return $date->toDateTimeString();
            }
            else
            {
                return $date->toDateString();
            }
        }, $data);

        return $this->respondWithSuccess($data);
    }
}