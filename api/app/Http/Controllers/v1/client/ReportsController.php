<?php

namespace App\Http\Controllers\v1\Client;

use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\ReportsServices;

class ReportsController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return [];
    }

    protected function getMethods()
    {
        return [
            'index' => 'Get all API Logs Rerports',
            'showReporClient'  => 'Get client API Logs Reports by date',
            'showReporInfo'  => 'Get client API Logs Information',
        ];
    }

    public function index(ReportsServices $service)
    {
        return $service->index($this->request, get_logged_in_client_id());
    }

    public function showReportClient($date, ReportsServices $service)
    {
        return $service->showReportClient($date, $this->request, get_logged_in_client_id());
    }

    public function showReportInfo($id, ReportsServices $service)
    {
        return $service->showReportInfo($id, get_logged_in_client_id());
    }
}