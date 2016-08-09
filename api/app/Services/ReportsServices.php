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
            ->send(get_api_url($this->endpoints['show_api_reports']), $request->all());

        return $result;
    }

    // Admin\Api\ReportsController::showReportClient
    // Client\Api\ReportsController::showReportClient
    public function showReportClient($request, $client_id = null)
    {
        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = $client->user->getApiAuth();
        }
        else
        {
            $client_ids = Client::select('id', 'company_name')->companyNameLike($request->get('company_name'))->orderBy('company_name')->get();
        }

        $result = $this->external_request->setAuth($this->auth)
            ->send(get_api_url($this->endpoints['show_api_reports_by_client']), $request->all());

        return $result;
    }

    // Admin\Api\ReportsController::showReporGraph
    // Client\Api\ReportsController::showReporGraph
    public function showReportGraph($request, $client_id = null)
    {
        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = $client->user->getApiAuth();
        }

        $result = $this->external_request->setAuth($this->auth)
            ->send(get_api_url($this->endpoints['show_api_reports_graph']), $request->all());

        return $result;
    }

    // Admin\Api\ReportsController::showReportInfo
    // Client\Api\ReportsController::showReportInfo
    public function showReportInfo($id, $client_id = null)
    {
        if ($client_id)
        {
            $client = Client::findOrfail($client_id);
            $this->auth = $client->user->getApiAuth();
        }

        $result = $this->external_request->setAuth($this->auth)
            ->send(get_api_url($this->endpoints['show_api_reports_detail'], ['id' => $id]));

        return $result;
    }
}