<?php

namespace App\Services;

use DB;

use App\Nrb\NrbServices;

class ApiKeyServices extends NrbServices
{
    private $external_request;

    public function __construct(ExternalRequestServices $external_request)
    {
        $this->external_request = $external_request;
    }

    // Admin\Api\ApiKeyController::destroy
    // Client\Api\ApiKeyController::destroy
    public function destroy($id, $client_id = null)
    {
        // Client ID usage:
        // - if client, use it as trapping to make sure he owns it (get from parameter specified from controller)
        $payload['clientId'] = $client_id;

        $result = $this->external_request->send($payload, 'delete', 'apiKeys/'.$id);

        return $this->respondWithData($result);
    }

    // Admin\Api\ApiKeyController::index
    // Client\Api\ApiKeyController::index
    public function index($request, $client_id = null)
    {
        $payload = $request->all();

        // Client ID usage:
        // - if admin, use it as filtering (get from request)
        // - if client, use it as trapping to make sure he owns it (get from parameter specified from controller)
        $payload['clientId'] = $client_id ?: get_val($payload, 'clientId');

        $result = $this->external_request->send($payload, 'get', 'apiKeys');

        return $this->respondWithData($result);
    }

    // Admin\Api\ApiKeyController::show
    // Client\Api\ApiKeyController::show
    public function show($id, $client_id = null)
    {
        // Client ID usage:
        // - if client, use it as trapping to make sure he owns it (get from parameter specified from controller)
        $payload['clientId'] = $client_id;

        $result = $this->external_request->send($payload, 'get', 'apiKeys/'.$id);

        return $this->respondWithData($result);
    }

    // Admin\Api\ApiKeyController::store
    // Client\Api\ApiKeyController::store
    public function store($request, $client_id = null)
    {
        $payload = $request->all();

        // Client ID usage:
        // - if admin, can dynamically set which client (get from request)
        // - if client, statically set its own Client ID as client (get from parameter specified from controller)
        $payload['clientId'] = $client_id ?: get_val($payload, 'clientId');

        $result = $this->external_request->send($payload, 'post', 'apiKeys');

        return $this->respondWithData($result);
    }

    // Admin\Api\ApiKeyController::update
    // Client\Api\ApiKeyController::update
    public function update($request, $id, $client_id = null)
    {
        $payload = $request->all();

        // Client ID usage:
        // - if admin, can dynamically set which client (get from request)
        // - if client, statically set its own Client ID as client (get from parameter specified from controller)
        $payload['clientId'] = $client_id ?: get_val($payload, 'clientId');

        $result = $this->external_request->send($payload, 'put', 'apiKeys/'.$id);

        return $this->respondWithData($result);
    }

    // Admin\Api\ApiKeyController::activate
    // Client\Api\ApiKeyController::activate
    public function activate($request, $id, $client_id = null)
    {
        $payload = $request->all();

        // Client ID usage:
        // - if client, use it as trapping to make sure he owns it (get from parameter specified from controller)
        $payload['clientId'] = $client_id;

        $result = $this->external_request->send($payload, 'patch', 'apiKeys/'.$id.'/activate');

        return $this->respondWithData($result);
    }
}