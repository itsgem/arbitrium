<?php

namespace App\Services;

use App\Errors;
use App\Nrb\NrbServices;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use Illuminate\Support\Facades\Log;

class ExternalRequestServices extends NrbServices
{
    private $config;

    public function __construct()
    {
        $this->config = config('arbitrium.core');
    }

    public function login($params)
    {
        $http_client = new Client();

        $data['form_params'] = $params;
        $result = $http_client->request('post', $this->config['api_url'].'/oauth/token', $data);

        $response = [
            'status' => $result->getStatusCode(),
            'header' => $result->getHeader('content-type'),
            'body'   => json_decode($result->getBody()->getContents()),
        ];

        return $response;
    }

    public function addUser($params)
    {
        // Can only add user using the Core-API
        $response = $this->login($this->config['auth']);
        $data['headers'] = ['Authorization' => $response['body']->token_type.' '.$response['body']->access_token];

        $http_client = new Client();

        $data['form_params'] = $params;
        $result = $http_client->request('post', $this->config['api_url'].'/users', $data);

        $response = [
            'status' => $result->getStatusCode(),
            'header' => $result->getHeader('content-type'),
            'body'   => json_decode($result->getBody()->getContents()),
        ];

        return $response;
    }

    public function send($payload, $endpoint, $auth = null)
    {
        $auth = $auth ?: $this->config['auth'];

        // Authenticate External API access
        $response = $this->login($auth);
        $data['headers'] = ['Authorization' => $response['body']->token_type.' '.$response['body']->access_token];

        // Transform payload to camelcase
        $payload = array_keys_format_case('camel', $payload);

        // Group different kinds of payload
        if ($payload && $endpoint['method'] == 'get') {
            $data['query'] = $payload;
        }

        if ($payload && ($endpoint['method'] == 'post' || $endpoint['method'] == 'put' || $endpoint['method'] == 'patch' || $endpoint['method'] == 'delete')) {
            $data['json'] = $payload;
        }

        $http_client = new Client();

        $endpoint['path'] = ($endpoint['path']) ? '/'.$endpoint['path'] : '';

        Log::info('START External Request');
        Log::info('PAYLOAD:', [
            'method'   => $endpoint['method'],
            'endpoint' => $this->config['api_url'].$endpoint['path'],
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

        $response = transformArbitriumResponseData($response);
        Log::info('TRANSFORMED RESPONSE: '.json_encode($response));

        Log::info('END External Request');

        return $this->respondWithData($response);
    }
}