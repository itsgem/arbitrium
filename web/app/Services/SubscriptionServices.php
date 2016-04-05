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
        if ($subscription->canDelete())
        {
            $subscription->delete();
            return $this->respondWithSuccess($subscription);
        }
        return $this->respondWithError(Errors::CANNOT_DELETE, ['str_replace' => ['model' => 'subscription']]);
    }

    // Admin\SubscriptionsController::index
    // Client\SubscriptionsController::index
    public function index()
    {
        return $this->respondWithSuccess(
            Subscription::orderBy('price_in_credit')->get()
        );
    }

    // Admin\SubscriptionsController::show
    public function show($id)
    {
        $subscription = Subscription::findOrFail($id);
        $this->addResponseData($subscription);
        return $this->respondWithSuccess(['can_delete' => $subscription->canDelete()]);
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