<?php

namespace App\Services;

use App\Nrb\NrbServices;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;

class ArbitriumCoreServices extends NrbServices
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
}