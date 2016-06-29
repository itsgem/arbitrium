<?php

namespace App\Services;

use DB;

use App\Nrb\NrbServices;

class ApiPermissionServices extends NrbServices
{
    private $external_request;
    private $auth;
    private $endpoints;

    public function __construct(ExternalRequestServices $external_request)
    {
        $this->external_request = $external_request;

        $this->auth = get_logged_in_user_api_creds();
        $this->endpoints = config('arbitrium.core.endpoints');
    }

    // ApiPermissionsController::index
    public function index($request)
    {
        $result = $this->external_request->send(get_api_url($this->endpoints['list_api_key_permissions']), $request->all(), $this->auth);

        return $result;
    }
}
