<?php

namespace App\Services;

use App\Nrb\NrbServices;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;

class ExternalRequestServices extends NrbServices
{
    private $config;

    public function __construct()
    {
        $this->config = config('arbitrium.core');
    }

    public function login()
    {
        $http_client = new Client();

        $data['form_params'] = $this->config['auth'];
        $result = $http_client->request('post', $this->config['api_url'].'/oauth/token', $data);

        $response = [
            'status' => $result->getStatusCode(),
            'header' => $result->getHeader('content-type'),
            'body'   => json_decode($result->getBody()->getContents()),
        ];

        return $response;
    }

    public function send($payload, $method, $path)
    {
        $response = $this->login();
        $data['headers'] = ['Authorization' => $response['body']->token_type.' '.$response['body']->access_token];

        if ($payload && $method == 'get') {
            $data['query'] = $payload;
        }

        if ($payload && ($method == 'post' || $method == 'put' || $method == 'patch' || $method == 'delete')) {
            $data['json'] = $payload;
        }

        $http_client = new Client();

        $path = ($path) ? '/'.$path : '';
        $result = $http_client->request($method, $this->config['api_url'].$path, $data);
        $response = json_decode($result->getBody()->getContents(), true);

        return $response;
    }
}