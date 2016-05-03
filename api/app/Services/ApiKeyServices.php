<?php

namespace App\Services;

use DB;

use App\Errors;
use App\Models\ApiKey;
use App\Nrb\NrbServices;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ApiKeyServices extends NrbServices
{
    // Api\ApiKeyController::destroy
    public function destroy($id)
    {
        return DB::transaction(function () use ($id)
        {
            $api_key = ApiKey::findOrFail($id);
            if ($api_key->canDelete())
            {
                $api_key->delete();
                return $this->respondWithSuccess($api_key);
            }
            return $this->respondWithError(Errors::CANNOT_DELETE, ['str_replace' => ['model' => 'api key']]);
        });
    }

    // Api\ApiKeyController::index
    public function index($request)
    {
        return $this->respondWithData(
            ApiKey::select(
                'id', 'client_id', 'token', 'name', 'description', 'api_permissions',
                'is_api_call_restricted', 'is_whitelist', 'is_active', 'is_test_key',
                'created_at', 'updated_at', 'deleted_at'
            )
            ->with(['client' => function($query){
                $query->select(
                'id', 'user_id', 'company_name', 'rep_first_name', 'rep_last_name', 'rep_email_address',
                'rep_phone_code', 'rep_phone_number', 'rep_mobile_code', 'rep_mobile_number', 'approval_status'
                );
            }])
            ->paginate($request->get('per_page')),
            $request->get('max_pagination_links')
        );
    }

    // Api\ApiKeyController::show
    public function show($request, $id)
    {
        $api_key = new ApiKey();
        if ($request->get('with-client'))
        {
            $api_key = $api_key->with(['client' => function($query){
                $query->select(
                    'id', 'user_id', 'company_name', 'rep_first_name', 'rep_last_name', 'rep_email_address',
                    'rep_phone_code', 'rep_phone_number', 'rep_mobile_code', 'rep_mobile_number', 'approval_status'
                );
            }]);
        }

        $api_key = $api_key->findOrFail($id);
        $this->addResponseData($api_key);
        return $this->respondWithSuccess($api_key);
    }

    // Api\ApiKeyController::store
    public function store($request)
    {
        // Transform to expected format
        $payload = $request->all();
        if (array_key_exists('api_permissions', $payload)) {
            $payload['api_permissions'] = json_encode($payload['api_permissions']);
        }

        return DB::transaction(function () use ($payload)
        {
            $api_key = ApiKey::create($payload);
            return $this->respondWithSuccess($api_key);
        });
    }

    // Api\ApiKeyController::update
    public function update($request, $id)
    {
        // Transform to expected format
        $payload = $request->all();
        if (array_key_exists('api_permissions', $payload)) {
            $payload['api_permissions'] = json_encode($payload['api_permissions']);
        }

        return DB::transaction(function () use ($payload, $id)
        {
            $api_key = ApiKey::findOrFail($id);
            $api_key->update($payload);

            return $this->respondWithSuccess($api_key);
        });
    }

    // Api\ApiKeyController::generate
    public function generate($request)
    {
        $token = generate_api_key_token($request->get('client_id'));

        return $this->respondWithSuccess(['token' => $token]);
    }
}
