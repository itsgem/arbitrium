<?php

namespace App\Http\Controllers\v1\Admin;

use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\ApiLogServices;

class ApiLogController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return [];
    }

    protected function getMethods()
    {
        return [
            'index' => 'Get all API Logs',
            'show'  => 'Get single API Log',
        ];
    }

    /**
     * Get all API Logs
     *
     * @SWG\Get(
     *     path="/admin/api-log",
     *     tags={"Admin - API Logs"},
     *     summary="All API Logs",
     *     description="Get all API logs",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", type="array", items=@SWG\Property(ref="#/definitions/ApiLogResponse"))
     *         )
     *     ),
     *     @SWG\Response(response="403", description="Authentication Failed",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "messages"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="false"),
     *             @SWG\Property(property="message", type="string", description="Error message", default="Authentication Failed"),
     *             @SWG\Property(property="messages", type="array", description="Other messages or instructions for user", items=""),
     *         )
     *     ),
     *     @SWG\Parameter(
     *         name="X-Token",
     *         in="header",
     *         description="X-Token",
     *         required=true,
     *         type="string",
     *         default=""
     *     ),
     *     @SWG\Parameter(name="client_id", in="query", description="FILTER by client ID", required=false, type="string", default=""),
     *     @SWG\Parameter(name="url", in="query", description="FILTER by requested endpoint", required=false, type="string", default=""),
     *     @SWG\Parameter(name="status_code", in="query", description="FILTER by response status code", required=false, type="string", default=""),
     *     @SWG\Parameter(name="ipaddress", in="query", description="FILTER by ip address of the requester", required=false, type="string", default=""),
     *     @SWG\Parameter(name="created", in="query", description="FILTER by date created", required=false, type="string", default=""),
     *     @SWG\Parameter(name="per_page", in="query", description="for pagination, number of items to return per page", required=false, type="integer", default=""),
     *     @SWG\Parameter(name="page", in="query", description="for pagination, show items belonging to page", required=false, type="integer", default=""),
     * )
     *
     * @param ApiLogServices $service
     *
     * @return mixed
     */
    public function index(ApiLogServices $service)
    {
        return $service->index($this->request);
    }

    /**
     * Get single API log
     *
     * @SWG\Get(
     *     path="/admin/api-log/{api_log}",
     *     tags={"Admin - API Logs"},
     *     summary="Single API Log",
     *     description="Get single API log",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", ref="#/definitions/ApiLogResponse")
     *         )
     *     ),
     *     @SWG\Response(response="204", description="No matches or no allowed matches found"),
     *     @SWG\Response(response="403", description="Authentication Failed",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "messages"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="false"),
     *             @SWG\Property(property="message", type="string", description="Error message", default="Authentication Failed"),
     *             @SWG\Property(property="messages", type="array", description="Other messages or instructions for user", items=""),
     *         )
     *     ),
     *     @SWG\Parameter(
     *         name="X-Token",
     *         in="header",
     *         description="X-Token",
     *         required=true,
     *         type="string",
     *         default=""
     *     ),
     * )
     *
     * @param $id
     * @param ApiLogServices $service
     *
     * @return mixed
     */
    public function show($id, ApiLogServices $service)
    {
        return $service->show($id);
    }

    public function showReports(ApiLogServices $service)
    {
        return $service->showReports($this->request);
    }

    public function showReportClient(ApiLogServices $service)
    {
        return $service->showReportLogs($this->request);
    }
}