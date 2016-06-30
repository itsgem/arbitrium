<?php

namespace App\Services;

use App\Errors;
use App\Nrb\NrbServices;
use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\Psr7;
use Illuminate\Support\Facades\Log;

class ExternalRequestServices extends NrbServices
{
    private $config;
    private $as_object;

    public function __construct()
    {
        $this->config    = config('arbitrium.core');
        $this->as_object = false;
    }

    public function setAuth($auth)
    {
        $this->config['auth'] = ($auth) ?: config('arbitrium.core.auth');

        return $this;
    }

    public function asObject()
    {
        $this->as_object = true;

        return $this;
    }

    public function authenticate($params)
    {
        $http_client = new GuzzleClient();

        $data['form_params'] = $params;
        $endpoint = $this->config['endpoints']['authenticate'];
        $result = $http_client->request($endpoint['method'], $this->config['api_url'].$endpoint['path'], $data);

        $response = [
            'status' => $result->getStatusCode(),
            'header' => $result->getHeader('content-type'),
            'body'   => json_decode($result->getBody()->getContents()),
        ];

        return $response;
    }

    public function addUser($params)
    {
        // Can only add user using the Core-API root
        $response = $this->authenticate($this->config['auth']);
        $data['headers'] = ['Authorization' => $response['body']->token_type.' '.$response['body']->access_token];

        $http_client = new GuzzleClient();

        $data['form_params'] = $params;
        $endpoint = $this->config['endpoints']['create_user'];
        $result = $http_client->request($endpoint['method'], $this->config['api_url'].$endpoint['path'], $data);

        $response = [
            'status' => $result->getStatusCode(),
            'header' => $result->getHeader('content-type'),
            'body'   => json_decode($result->getBody()->getContents()),
        ];

        return $response;
    }

    public function send($endpoint, $payload = [])
    {
        Log::info('START External Request');

        Log::info('AUTH:', $this->config['auth']);

        // Authenticate External API access
        $response = $this->authenticate($this->config['auth']);
        Log::info('Authentication Success');

        $data['headers'] = ['Authorization' => $response['body']->token_type.' '.$response['body']->access_token];

        Log::info('PAYLOAD:', [
            'method'   => $endpoint['method'],
            'endpoint' => $this->config['api_url'].$endpoint['path'],
        ]);

        // Transform payload to camelcase
        $payload = transform_arbitrium_payload($payload);
        $payload = array_keys_format_case('camel', $payload);

        // Group different kinds of payload
        if ($payload && $endpoint['method'] == 'get') {
            $data['query'] = $payload;
        }

        if ($payload && ($endpoint['method'] == 'post' || $endpoint['method'] == 'put' || $endpoint['method'] == 'patch' || $endpoint['method'] == 'delete')) {
            $data['json'] = $payload;
        }

        $http_client = new GuzzleClient();

        $endpoint['path'] = $endpoint['path'] ?: '';

        Log::info('PAYLOAD:', [
            'payload'  => $data,
        ]);

        $result = $http_client->request($endpoint['method'], $this->config['api_url'].$endpoint['path'], $data);

        $response = json_decode($result->getBody()->getContents());

        // 204 No Content
        if (!$response)
        {
            Log::info('RESPONSE ERROR: No content');
            return $this->respondWithError(Errors::NO_CONTENT);
        }
        Log::info('RESPONSE SUCCESS: '.json_encode($response));

        $response = transform_arbitrium_response_data($response);
        Log::info('TRANSFORMED RESPONSE: '.json_encode($response));

        Log::info('END External Request');

        if ($this->as_object)
        {
            return $response['data'];
        }

        return $this->respondWithData($response);
    }
}