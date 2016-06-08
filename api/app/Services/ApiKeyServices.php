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
        //
    }

    // Admin\Api\ApiKeyController::destroy
    // Client\Api\ApiKeyController::destroy
    public function destroy($id, $client_id = null)
    {
        try {
            $client = new Client();
            $req = [];
            $res = $client->request('post', 'http://localhost:1337/api/oauth/token', ['form_params' => $this->arbitrium]);
            $arr['data'] = json_decode($res->getBody()->getContents());
            $arr['status'] = $res->getStatusCode();
            $arr['header'] = $res->getHeader('content-type');
            $api = $client->request('delete', 'http://localhost:1337/api/apiKeys/' . $id,
                ['headers' => ['Authorization' => $arr['data']->token_type . " " . $arr['data']->access_token ]]);
            $data = json_decode($api->getBody()->getContents(), true);
            return $this->respondWithSuccess($data);

        } catch (RequestException $e) {
            $message = json_decode($e->getResponse()->getBody()->getContents(), true);
            $status = $e->getResponse()->getStatusCode();
            return $this->respondWithError($status, $message);
        }
        // return DB::transaction(function () use ($id, $client_id)
        // {
        //     $api_key = ApiKey::clientId($client_id)->findOrFail($id);
        //     $api_key->delete();

        //     return $this->respondWithSuccess($api_key);
        // });
    }

    // Admin\Api\ApiKeyController::index
    // Client\Api\ApiKeyController::index
    public function index($request, $client_id = null)
    {
       // dd($request->all());
        $data = [];
        $arr = [];
        try {
            $client = new Client();
            $res = $client->request('post', 'http://localhost:1337/api/oauth/token', ['form_params' => $this->arbitrium]);
            $arr['data'] = json_decode($res->getBody()->getContents());
            $arr['status'] = $res->getStatusCode();
            $arr['header'] = $res->getHeader('content-type');
            if ($client_id) {
                $request['clientId'] = $client_id;
            }
            $api = $client->request('get', 'http://localhost:1337/api/apiKeys',
                ['headers' => ['Authorization' => $arr['data']->token_type . " " . $arr['data']->access_token ],
                'query' => $request->all()]);
            $data =  json_decode($api->getBody()->getContents());
        } catch (RequestException $e) {
            $data['data'] = json_decode($e->getResponse()->getBody()->getContents());
        }
        return $this->respondWithData($data);
        // $api_keys = new ApiKey;

        // // If non-client
        // if (!$client_id)
        // {
        //     $api_keys = $api_keys->with(['client.user' => function($query){
        //             $query->select('id', 'username', 'email_address', 'activated_at', 'items_per_page', 'timezone', 'locked_at');
        //         }]);

        //     $client_id = $request->get('client_id', '');
        // }


        // $api_keys = $api_keys->clientId($client_id)
        //     ->id($request->get('id', ''))
        //     ->like('name', $request->get('name', ''))
        //     ->like('description', $request->get('description', ''))
        //     ->like('token', $request->get('key', ''))
        //     ->active($request->get('is_active', ''))
        //     ->testKey($request->get('is_test_key', ''))
        //     ->dateFrom('created_at', $request->get('date_created', ''), true)
        //     ->dateTo('created_at', $request->get('date_created', ''), true)
        //     ->paginate($request->get('per_page'));

        // return $this->respondWithData($api_keys, $request->get('max_pagination_links'));
    }

    // Admin\Api\ApiKeyController::show
    // Client\Api\ApiKeyController::show
    public function show($request, $id, $clientId = null)
    {
        // $api_key = ApiKey::with(['client.user', 'permissions', 'ip_addresses']);
        // $api_key = $api_key->clientId($client_id)->findOrFail($id);
        // return $this->respondWithSuccess($api_key);
        $data = [];
        $arr = [];
        try {
            $client = new Client();
            $res = $client->request('POST', 'http://localhost:1337/api/oauth/token', ['form_params' => $this->arbitrium]);
            $arr['data'] = json_decode($res->getBody()->getContents());
            $arr['status'] = $res->getStatusCode();
            $arr['header'] = $res->getHeader('content-type');
            $api = $client->request('GET', 'http://localhost:1337/api/apiKeys/' . $id,
                ['headers' => ['Authorization' => $arr['data']->token_type . " " . $arr['data']->access_token ]]);
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
        $token = generate_api_key_token($clientId);
        $data = [];
        $arr = [];
        try {
            $client = new Client();
            $req = [];
            $res = $client->request('post', 'http://localhost:1337/api/oauth/token', ['form_params' => $this->arbitrium]);
            $arr['data'] = json_decode($res->getBody()->getContents());
            $arr['status'] = $res->getStatusCode();
            $arr['header'] = $res->getHeader('content-type');
            $request = json_decode($request->getContent());
            $request->token = $token;
            $request->clientId = $clientId;
            $api = $client->request('post', 'http://localhost:1337/api/apiKeys/',
                ['headers' => ['Authorization' => $arr['data']->token_type . " " . $arr['data']->access_token ],
                'form_params' => ['data' => json_encode($request) ] ]);
            return $this->respondWithSuccess();

        } catch (RequestException $e) {
            $message = json_decode($e->getResponse()->getBody()->getContents(), true);
            $status = $e->getResponse()->getStatusCode();
            return $this->respondWithError($status, $message);
        }


        // Transform payload to eloquent format, set defaults
        // $payload = $request->except('token');
        // $payload['client_id'] = $client_id;
        // $payload['ip_addresses'] = get_val($payload, 'ip_addresses', []);
        // $payload['is_active'] = get_val($payload, 'is_active', true);
        // $payload['permissions'] = get_val($payload, 'permissions', []);
        // $payload['token'] = $token;

        // return DB::transaction(function () use ($payload)
        // {
        //     $api_key = ApiKey::create($payload);

        //     foreach($payload['permissions'] as $permission)
        //     {
        //         $api_key->permissions()->save(new ApiKeyPermission($permission));
        //     }

        //     foreach($payload['ip_addresses'] as $ip_address)
        //     {
        //         $api_key->ip_addresses()->save(new ApiIpAddress($ip_address));
        //     }

        //     return $this->respondWithSuccess($api_key);
        // });
    }

    // Admin\Api\ApiKeyController::update
    // Client\Api\ApiKeyController::update
    public function update($request, $id, $clientId = null)
    {
        try {
            $client = new Client();
            $req = [];
            $res = $client->request('post', 'http://localhost:1337/api/oauth/token', ['form_params' => $this->arbitrium]);
            $arr['data'] = json_decode($res->getBody()->getContents());
            $arr['status'] = $res->getStatusCode();
            $arr['header'] = $res->getHeader('content-type');
            // $request->clientId = $clientId;
            $request = json_decode($request->getContent());
            $request->clientId = $clientId ? $clientId : $request->clientId;
            $api = $client->request('put', 'http://localhost:1337/api/apiKeys/' . $id,
                ['headers' => ['Authorization' => $arr['data']->token_type . " " . $arr['data']->access_token ],
                'form_params' => ['data' => json_encode($request) ] ]);
            return $this->respondWithSuccess();

        } catch (RequestException $e) {
            $message = json_decode($e->getResponse()->getBody()->getContents(), true);
            $status = $e->getResponse()->getStatusCode();
            return $this->respondWithError($status, $message);
        }






        // Transform payload to eloquent format, set defaults
        // $payload = $request->except('token');
        // $payload['client_id'] = ($client_id) ? $client_id : $request->get('client_id');
        // $payload['ip_addresses'] = get_val($payload, 'ip_addresses', []);
        // $payload['permissions'] = get_val($payload, 'permissions', []);

        // return DB::transaction(function () use ($payload, $id, $client_id)
        // {
        //     $api_key = ApiKey::clientId($client_id)->findOrFail($id);
        //     $api_key->update($payload);

        //     ApiKeyPermission::apiKeyId($id)->delete();
        //     foreach($payload['permissions'] as $permission)
        //     {
        //         $api_key->permissions()->save(new ApiKeyPermission($permission));
        //     }

        //     ApiIpAddress::apiKeyId($id)->delete();
        //     foreach($payload['ip_addresses'] as $ip_address)
        //     {
        //         $api_key->ip_addresses()->save(new ApiIpAddress($ip_address));
        //     }

        //     return $this->respondWithSuccess();
        // });
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
            $client = new Client();
            $req = [];
            $res = $client->request('post', 'http://localhost:1337/api/oauth/token', ['form_params' => $this->arbitrium]);
            $arr['data'] = json_decode($res->getBody()->getContents());
            $arr['status'] = $res->getStatusCode();
            $arr['header'] = $res->getHeader('content-type');
            $request = json_decode($request->getContent());
            $api = $client->request('patch', 'http://localhost:1337/api/apiKeys/' . $id . "/activate",
                ['headers' => ['Authorization' => $arr['data']->token_type . " " . $arr['data']->access_token ],
                'form_params' => $request ]);
            $data = json_decode($api->getBody()->getContents(), true);
            return $this->respondWithSuccess();

        } catch (RequestException $e) {
            $message = json_decode($e->getResponse()->getBody()->getContents(), true);
            $status = $e->getResponse()->getStatusCode();
            return $this->respondWithError($status, $message);
        }
        // return DB::transaction(function () use ($request, $id)
        // {
        //     ApiKey::findOrFail($id)->update($request->only('is_active'));

        //     return $this->respondWithSuccess();
        // });
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