<?php

namespace App\Nrb\Http\v1\Controllers;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Nrb\Http\v1\Traits\JsonResponseTrait;
use App\Nrb\NrbLogModel;

abstract class ApiController extends Controller
{
    use JsonResponseTrait;

    public $logLevel = NrbLogModel::INFO;
    public $request;
    public $excludeAllFromLogs = false;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    protected abstract function excludeMethodsInLog();

    protected abstract function getMethods();

    public function callAction($method, $parameters)
    {
        if (!$this->excludeAllFromLogs && !in_array($method, $this->excludeMethodsInLog()))
        {
            log_api_access($this, $method);
        }
        return call_user_func_array([$this, $method], $parameters);
    }

    public function getMethodDisplayName($method)
    {
        $display = $this->getMethods();
        return isset($display[$method]) ? $display[$method] : $method;
    }
}
