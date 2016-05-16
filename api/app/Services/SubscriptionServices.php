<?php

namespace App\Services;

use DB;
use App\Errors;
use App\Nrb\NrbServices;
use App\Models\Subscription;

class SubscriptionServices extends NrbServices
{
    // Admin\SubscriptionsController::destroy
    public function destroy($id)
    {
        $subscription = Subscription::findOrFail($id);
        if (is_admin_user_logged_in())
        {
            $subscription->delete();
            return $this->respondWithSuccess($subscription);
        }
        return $this->respondWithError(Errors::CANNOT_DELETE, ['str_replace' => ['model' => 'subscription']]);
    }

    // Admin\SubscriptionsController::index
    // SubscriptionsController::index
    public function index()
    {
        $subscription = Subscription::get();
        $this->addResponseData($subscription);
        return $this->respondWithSuccess();
    }

    // Admin\SubscriptionsController::show
    // SubscriptionsController::show
    public function show($id)
    {
        $subscription = Subscription::findOrFail($id);
        $this->addResponseData($subscription);
        return $this->respondWithSuccess();
    }

    // Admin\SubscriptionsController::store
    public function store($request)
    {
        return DB::transaction(function () use ($request)
        {
            $subscription = Subscription::create($request->all());
            return $this->respondWithSuccess($subscription);
        });
    }

    // Admin\SubscriptionsController::update
    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id)
        {
            $subscription = Subscription::findOrFail($id);
            $subscription->update($request->all());
            return $this->respondWithSuccess($subscription);
        });
    }
}