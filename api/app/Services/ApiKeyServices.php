<?php

namespace App\Services;

use DB;

use App\Models\Client;
use App\Nrb\NrbServices;

class ApiKeyServices extends NrbServices
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

    // Admin\Api\ApiKeyController::destroy
    // Client\Api\ApiKeyController::destroy
    public function destroy($id, $client_id = null)
    {
        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = ($client->user->api) ? $client->user->api->getAuth() : null;
        }

        $result = $this->external_request->send(null, get_api_url($this->endpoints['delete_api_key'], ['id' => $id]), $this->auth);

        return $result;
    }

    // Admin\Api\ApiKeyController::index
    // Client\Api\ApiKeyController::index
    public function index($request, $client_id = null)
    {
        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = ($client->user->api) ? $client->user->api->getAuth() : null;
        }

        $result = $this->external_request->send($request->all(), get_api_url($this->endpoints['list_api_keys']), $this->auth);

        return $result;
    }

    // Admin\Api\ApiKeyController::show
    // Client\Api\ApiKeyController::show
    public function show($id, $client_id = null)
    {
        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = ($client->user->api) ? $client->user->api->getAuth() : null;
        }

        $result = $this->external_request->send(null, get_api_url($this->endpoints['show_api_key'], ['id' => $id]), $this->auth);

        return $result;
    }

    // Admin\Api\ApiKeyController::store
    // Client\Api\ApiKeyController::store
    public function store($request, $client_id = null)
    {
        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = ($client->user->api) ? $client->user->api->getAuth() : null;
        }

        $result = $this->external_request->send($request->all(), get_api_url($this->endpoints['create_api_key']), $this->auth);

        return $result;
    }

    // Admin\Api\ApiKeyController::update
    // Client\Api\ApiKeyController::update
    public function update($request, $id, $client_id = null)
    {
        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = ($client->user->api) ? $client->user->api->getAuth() : null;
        }

        $result = $this->external_request->send($request->all(), get_api_url($this->endpoints['update_api_key'], ['id' => $id]), $this->auth);

        return $result;
    }

    // Admin\Api\ApiKeyController::activate
    // Client\Api\ApiKeyController::activate
    public function activate($request, $id, $client_id = null)
    {
        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = ($client->user->api) ? $client->user->api->getAuth() : null;
        }

        $result = $this->external_request->send($request->all(), get_api_url($this->endpoints['activate_api_key'], ['id' => $id]), $this->auth);

        return $result;
    }
}