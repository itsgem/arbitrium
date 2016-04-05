<?php

namespace App\Http\Controllers\v1\Admin;

use App\Http\Requests\v1\Admin\LogRequest;
use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\LogServices;
use App\Models\Logs\AdminLog;
use App\Models\Logs\ClientLog;

class LogsController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return ['showAdminLogs', 'showClientLogs'];
    }

    protected function getMethods()
    {
        return [
            'showAdminLogs'      => 'Show Admin Logs',
            'showClientLogs'     => 'Show Client Logs'
        ];
    }
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function showAdminLogs(LogRequest $request, LogServices $service)
    {
        return $service->showLogs($request, AdminLog::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function showClientLogs(LogRequest $request, LogServices $service)
    {
        return $service->showLogs($request, ClientLog::class);
    }
}
