<?php

namespace App\Services;

use DB;

use App\Nrb\NrbServices;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;

class ApiKeyServices extends NrbServices
{
    private $arbitrium;

    public function __construct()
    {
        $this->arbitrium = config('arbitrium.core');
    }

    public function login()
    {
        $guzzle = new Client();
        $result = $guzzle->request('post', $this->arbitrium['api_url'].'/oauth/token', ['form_params' => $this->arbitrium]);

        $response = [
            'status' => $result->getStatusCode(),
            'header' => $result->getHeader('content-type'),
            'body'   => json_decode($result->getBody()->getContents()),
        ];

        return $response;
    }

    public function curl($payload, $type, $path)
    {
        $response = $this->login();
        $guzzle = new Client();
        $method['headers'] = ['Authorization' => $response['body']->token_type.' '.$response['body']->access_token];

        if ($payload && $type == 'get') {
            $method['query'] = $payload;
        }

        if ($payload && ($type == 'post' || $type == 'put' || $type == 'patch')) {
            $method['json'] = $payload;
        }

        $path = ($path) ? '/'.$path : '';
        $result = $guzzle->request($type, $this->arbitrium['api_url'].$path, $method);
        $response = json_decode($result->getBody()->getContents(), true);

        return $response;
    }


    // Admin\Api\ApiKeyController::destroy
    // Client\Api\ApiKeyController::destroy
    public function destroy($id, $client_id = null)
    {
        $payload = [
            'clientId' => $client_id,
        ];
        $result = $this->curl($payload, 'delete', 'apiKeys/'.$id);

        return $this->respondWithData($result);
    }

    // Admin\Api\ApiKeyController::index
    // Client\Api\ApiKeyController::index
    public function index($request, $client_id = null)
    {
        $payload = $request->all();
        $payload['clientId'] = $client_id ?: get_val($payload, 'client_id');

        $result = $this->curl($payload, 'get', 'apiKeys');

        return $this->respondWithData($result);
    }

    // Admin\Api\ApiKeyController::show
    // Client\Api\ApiKeyController::show
    public function show($request, $id, $client_id = null)
    {
        $payload = $request->all();
        $payload['clientId'] = $client_id ?: get_val($payload, 'client_id');

        $result = $this->curl($payload, 'get', 'apiKeys/'.$id);

        return $this->respondWithData($result);
    }

    // Admin\Api\ApiKeyController::store
    // Client\Api\ApiKeyController::store
    public function store($request, $client_id = null)
    {
        $payload = $request->all();
        $payload['clientId'] = $client_id ?: get_val($payload, 'client_id');

        $result = $this->curl($payload, 'post', 'apiKeys');

        return $this->respondWithData($result);
    }

    // Admin\Api\ApiKeyController::update
    // Client\Api\ApiKeyController::update
    public function update($request, $id, $client_id = null)
    {
        $payload = $request->all();
        $payload['clientId'] = $client_id ?: get_val($payload, 'client_id');
        $result = $this->curl($payload, 'put', 'apiKeys/'.$id);

        return $this->respondWithData($result);
    }

    // Admin\Api\ApiKeyController::activate
    // Client\Api\ApiKeyController::activate
    public function activate($request, $id)
    {
        $result = $this->curl($request->all(), 'patch', 'apiKeys/'.$id.'/activate');

        return $this->respondWithData($result);
    }
}