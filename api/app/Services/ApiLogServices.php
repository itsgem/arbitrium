<?php

namespace App\Services;

use DB;

use App\Models\Client;
use App\Nrb\NrbServices;

class ApiLogServices extends NrbServices
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

    // Admin\Api\ApiLogController::index
    // Client\Api\ApiLogController::index
    public function index($request, $client_id = null)
    {
        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = ($client->user->api) ? $client->user->api->getAuth() : null;
        }

        $result = $this->external_request->send(get_api_url($this->endpoints['list_api_logs']), $request->all(), $this->auth);

        return $result;
    }

    // Admin\Api\ApiLogController::show
    // Client\Api\ApiLogController::show
    public function show($id, $client_id = null)
    {
        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = ($client->user->api) ? $client->user->api->getAuth() : null;
        }

        $result = $this->external_request->send(get_api_url($this->endpoints['show_api_log'], ['id' => $id]), null, $this->auth);

        return $result;
    }
}