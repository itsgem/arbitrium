<?php

namespace App\Services;

use DB;

use App\Errors;
use App\Models\ApiPermission;
use App\Nrb\NrbServices;

class ApiPermissionServices extends NrbServices
{
    // ApiPermissionsController::destroy
    public function destroy($id)
    {
        return DB::transaction(function () use ($id)
        {
            $api_ip = ApiPermission::findOrFail($id);
            if (is_admin_user_logged_in())
            {
                $api_ip->delete();
                return $this->respondWithSuccess($api_ip);
            }
            return $this->respondWithError(Errors::UNAUTHORIZED);
        });
    }

    // ApiPermissionsController::index
    public function index($request)
    {
        return $this->respondWithData(
            ApiPermission::paginate($request->get('per_page')),
            $request->get('max_pagination_links')
        );
    }

    // ApiPermissionsController::show
    public function show($request, $id)
    {
        $api_ip = ApiPermission::findOrFail($id);
        return $this->respondWithSuccess($api_ip);
    }

    // ApiPermissionsController::store
    public function store($request)
    {
        // Transform payload to eloquent format, set defaults
        $payload = $request->all();
        $payload['slug'] = str_to_slug(get_val($payload, 'slug', $payload['name']));

        return DB::transaction(function () use ($payload)
        {
            if (is_admin_user_logged_in())
            {
                $api_ip = ApiPermission::create($payload);
                return $this->respondWithSuccess($api_ip);
            }
            return $this->respondWithError(Errors::UNAUTHORIZED);
        });
    }

    // ApiPermissionsController::update
    public function update($request, $id)
    {
        $payload = $request->only('name', 'parent_id');

        return DB::transaction(function () use ($payload, $id)
        {
            if (is_admin_user_logged_in())
            {
                $api_ip = ApiPermission::findOrFail($id);
                $api_ip->update($payload);

                return $this->respondWithSuccess($api_ip);
            }
            return $this->respondWithError(Errors::UNAUTHORIZED);
        });
    }
}
