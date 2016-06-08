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

    /**
     * Get all countries
     *
     * @SWG\Get(
     *     path="/list/countries",
     *     tags={"Public - Dropdown Lists"},
     *     summary="Countries",
     *     description="Get all countries.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", type="array", items=@SWG\Property(
     *                     @SWG\Property(property="id", type="string", description="ID", default="Cancelled"),
     *                     @SWG\Property(property="name", type="string", description="Name", default="Cancelled"),
     *                 )
     *             ),
     *         )
     *     ),
     * )
     *
     * @param CountryServices $service
     *
     * @return mixed
     */
    public function getList(CountryServices $service)
    {
        return $service->getList($this->request);
    }
}