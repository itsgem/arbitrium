<?php

namespace App\Services;

use DB;

use App\Models\Client;
use App\Nrb\NrbServices;

class ReportsServices extends NrbServices
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

    // Admin\Api\ReportsController::index
    // Client\Api\ReportsController::index
    public function index($request, $client_id = null)
    {
        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = $client->user->getApiAuth();
        }

        $result = $this->external_request->setAuth($this->auth)
            ->send(get_api_url($this->endpoints['api_reports']), $request->all());

        return $result;
    }

    // Admin\Api\ReportsController::showReportLogs
    // Client\Api\ReportsController::showReportLogs
    public function showReporClient($date, $request, $client_id = null)
    {
        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = $client->user->getApiAuth();
        }

        $result = $this->external_request->setAuth($this->auth)
            ->send(get_api_url($this->endpoints['api_reports_client'], ['date' => $date]), $request->all());

        return $result;
    }

    // Admin\Api\ReportsController::showReporInfo
    // Client\Api\ReportsController::showReporInfo
    public function showReporInfo($id, $client_id = null)
    {
        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = $client->user->getApiAuth();
        }

        $result = $this->external_request->setAuth($this->auth)
            ->send(get_api_url($this->endpoints['api_reports_detail'], ['id' => $id]));

        return $result;
    }
}