<?php

namespace App\Services;

use App\Nrb\NrbServices;
use App\Models\Country;

class CountryServices extends NrbServices
{
    // CountriesController::getList
    public function getList($request)
    {
        return $this->respondWithData(
            Country::select('id', 'name')->nameLike($request->get('name'))->orderBy('name')->get()
        );
    }
}
