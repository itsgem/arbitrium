<?php

namespace App\Services;

use DB;

use App\Models\ApiIpAddress;
use App\Models\ApiKey;
use App\Models\ApiKeyPermission;
use App\Nrb\NrbServices;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\RequestException;

class ApiKeyServices extends NrbServices
{
    private $arbitrium;

    public function __construct()
    {
        // setup PayPal api context
        $this->arbitrium = config('arbitrium.core');
        $this->coreClient = new Client();
        //
    }
    private $coreClient;
    public function apiCoreLogin()
    {
        $client = $this->coreClient;
        $res = $client->request('post', 'http://localhost:1337/api/oauth/token', ['form_params' => $this->arbitrium]);
        $arr['data'] = json_decode($res->getBody()->getContents());
        $arr['status'] = $res->getStatusCode();
        $arr['header'] = $res->getHeader('content-type');
        return $arr;
    }

    public function apiCore($payload, $type, $id = null)
    {
        $arr = $this->apiCoreLogin();
        $client = new Client();
        $method['headers'] = ['Authorization' => $arr['data']->token_type . " " . $arr['data']->access_token ];
        if ($payload && $type == 'get') {
            $method['query'] = $payload;
        }

        if ($payload && ($type == 'post' || $type == 'put' || $type == 'patch')) {
            $method['json'] = $payload;
        }

        $ret = $client->request( $type, 'http://localhost:1337/api/apiKeys/' . $id, $method );
        return $ret;
    }


    // Admin\Api\ApiKeyController::destroy
    // Client\Api\ApiKeyController::destroy
    public function destroy($id, $client_id = null)
    {
        try {
            $api = $this->apiCore(null, 'delete', $id);
            $data = json_decode($api->getBody()->getContents(), true);
            return $this->respondWithSuccess($data);

        } catch (RequestException $e) {
            $message = json_decode($e->getResponse()->getBody()->getContents(), true);
            $status = $e->getResponse()->getStatusCode();
            return $this->respondWithError($status, $message);
        }
    }

    // Admin\Api\ApiKeyController::index
    // Client\Api\ApiKeyController::index
    public function index($request, $client_id = null)
    {
       // dd($request->all());
        $data = [];
        $arr = [];
        try {
            if ($client_id) {
                $request['clientId'] = $client_id;
            }
            $payload = $request->all();
            $api = $this->apiCore($payload, 'get');
            $data =  json_decode($api->getBody()->getContents());
        } catch (RequestException $e) {
            $data['data'] = json_decode($e->getResponse()->getBody()->getContents());
        }
        return $this->respondWithData($data);
    }

    // Admin\Api\ApiKeyController::show
    // Client\Api\ApiKeyController::show
    public function show($request, $id, $clientId = null)
    {
        $data = [];
        $arr = [];
        try {
            $payload = $request->all();
            $api = $this->apiCore(null, 'get', $id);
            $data = json_decode($api->getBody()->getContents(), true);
            return $this->respondWithSuccess($data['apiKey']);
        } catch (RequestException $e) {
            $data['data'] = json_decode($e->getResponse()->getBody()->getContents(), true);
        }
        return $this->respondWithSuccess($data);
    }

    // Admin\Api\ApiKeyController::store
    // Client\Api\ApiKeyController::store
    public function store($request, $client_id = null)
    {
        $clientId = ($client_id) ? $client_id : $request->get('clientId');
        $data = [];
        try {
            $request = json_decode($request->getContent());
            $request->clientId = $clientId;
            $api = $this->apiCore($request, 'post');
            return $this->respondWithSuccess();

        } catch (RequestException $e) {
            $message = json_decode($e->getResponse()->getBody()->getContents(), true);
            $status = $e->getResponse()->getStatusCode();
            return $this->respondWithError($status, $message);
        }
    }

    // Admin\Api\ApiKeyController::update
    // Client\Api\ApiKeyController::update
    public function update($request, $id, $clientId = null)
    {
        try {
            $client = new Client();
            $req = [];
            $request = json_decode($request->getContent());
            $request->clientId = $clientId ? $clientId : $request->clientId;
            $api = $this->apiCore($request, 'put', $id);
            return $this->respondWithSuccess();

        } catch (RequestException $e) {
            $message = json_decode($e->getResponse()->getBody()->getContents(), true);
            $status = $e->getResponse()->getStatusCode();
            return $this->respondWithError($status, $message);
        }
    }

    // Admin\Api\ApiKeyController::generate
    // Client\Api\ApiKeyController::generate
    public function generate($request, $client_id = null)
    {
        $client_id = ($client_id) ? $client_id : $request->get('client_id');
        $token = generate_api_key_token($client_id);

        return $this->respondWithSuccess(['token' => $token]);
    }

    // Admin\Api\ApiKeyController::activate
    // Client\Api\ApiKeyController::activate
    public function activate($request, $id)
    {
        try {

            $request = json_decode($request->getContent());
            $api = $this->apiCore($request, 'patch', $id. "/activate");
            $data = json_decode($api->getBody()->getContents(), true);
            return $this->respondWithSuccess();
        } catch (RequestException $e) {
            $message = json_decode($e->getResponse()->getBody()->getContents(), true);
            $status = $e->getResponse()->getStatusCode();
            return $this->respondWithError($status, $message);
        }
    }

    // Admin\Api\ApiKeyController::addPermission
    // Client\Api\ApiKeyController::addPermission
    public function addPermission($request, $id)
    {
        // Transform payload to eloquent format
        $payload = $request->all();
        $payload['api_key_id'] = $id;

        return DB::transaction(function () use ($payload)
        {
            $api_key_permission = ApiKeyPermission::create($payload);
            return $this->respondWithSuccess($api_key_permission);
        });
    }

    // Admin\Api\ApiKeyController::updatePermission
    // Client\Api\ApiKeyController::updatePermission
    public function updatePermission($request, $id)
    {
        // Transform payload to eloquent format
        $payload = $request->all();
        $payload['api_key_id'] = $id;

        return DB::transaction(function () use ($payload)
        {
            ApiKeyPermission::permission($payload)->update([
                'value' => $payload['value']
            ]);

            return $this->respondWithSuccess();
        });
    }

    // Admin\Api\ApiKeyController::removePermission
    // Client\Api\ApiKeyController::removePermission
    public function removePermission($request, $id)
    {
        // Transform payload to eloquent format
        $payload = $request->all();
        $payload['api_key_id'] = $id;

        return DB::transaction(function () use ($payload)
        {
            $api_key_permission = ApiKeyPermission::permission($payload);
            $api_key_permission->delete();

            return $this->respondWithSuccess();
        });
    }
}