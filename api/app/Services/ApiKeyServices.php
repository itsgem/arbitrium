<?php

namespace App\Services;

use DB;

use App\Models\Client;
use App\Nrb\NrbServices;

class ApiKeyServices extends NrbServices
{
    private $external_request;
    private $auth;

    public function __construct(ExternalRequestServices $external_request)
    {
        $this->external_request = $external_request;

        $this->auth = get_logged_in_user_api_creds();
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

        $result = $this->external_request->send(null, 'delete', 'apiKeys/'.$id, $this->auth);

        return $this->respondWithData($result);
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

        $result = $this->external_request->send($request->all(), 'get', 'apiKeys', $this->auth);

        return $this->respondWithData($result);
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

        $result = $this->external_request->send(null, 'get', 'apiKeys/'.$id, $this->auth);

        return $this->respondWithData($result);
    }

    // Admin\Api\ApiKeyController::store
    // Client\Api\ApiKeyController::store
    public function store($request, $client_id = null)
    {
        $payload = $request->all();

        $payload_client_id = get_val($payload, 'clientId');
        if ($payload_client_id)
        {
            $payload_client_id = Client::findOrfail($payload_client_id)->user->api->getAuth();
            $payload_client_id = $payload_client_id['client_id'];
        }

        $payload['clientId'] = $payload_client_id;

        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = ($client->user->api) ? $client->user->api->getAuth() : null;
        }

        $result = $this->external_request->send($payload, 'post', 'apiKeys', $this->auth);

        return $this->respondWithData($result);
    }

    // Admin\Api\ApiKeyController::update
    // Client\Api\ApiKeyController::update
    public function update($request, $id, $client_id = null)
    {
        $payload = $request->all();

        $payload_client_id = get_val($payload, 'clientId');
        if ($payload_client_id)
        {
            $payload_client_id = Client::findOrfail($payload_client_id)->user->api->getAuth();
            $payload_client_id = $payload_client_id['client_id'];
        }

        $payload['clientId'] = $payload_client_id;

        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = ($client->user->api) ? $client->user->api->getAuth() : null;
        }

        $result = $this->external_request->send($payload, 'put', 'apiKeys/'.$id, $this->auth);

        return $this->respondWithData($result);
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

        $result = $this->external_request->send($request->all(), 'patch', 'apiKeys/'.$id.'/activate', $this->auth);

        return $this->respondWithData($result);
    }
}