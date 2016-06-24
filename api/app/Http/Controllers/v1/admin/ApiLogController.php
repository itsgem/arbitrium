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

    public function index(ApiLogServices $service)
    {
        return $service->index($this->request);
    }

    public function show($id, ApiLogServices $service)
    {
        return $service->show($id);
    }
}