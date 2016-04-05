<?php

namespace App\Http\Controllers\v1;

use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\CountryServices;

class CountriesController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return ['getList'];
    }

    protected function getMethods()
    {
        return [];
    }

    public function getList(CountryServices $service)
    {
        return $service->getList($this->request);
    }
}