<?php

namespace App\Services;

use DB;

use App\Nrb\NrbServices;

class ApiPermissionServices extends NrbServices
{
    private $external_request;
    private $auth;

    public function __construct(ExternalRequestServices $external_request)
    {
        $this->external_request = $external_request;

        $this->auth = get_logged_in_user_api_creds();
    }

    // ApiPermissionsController::index
    public function index($request)
    {
        $result = $this->external_request->send($request->all(), 'get', 'permission', $this->auth);

        return $this->respondWithData($result);
    }
}
