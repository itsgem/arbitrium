<?php

namespace App\Http\Requests\v1;

use App\Nrb\Http\v1\Requests\NrbRequest;

// Client/SurveysController::index
class DateRangeRequest extends NrbRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
           'date_from' => 'date|date_format:Y-m-d|date_before_or_equal:date_to',
           'date_to'   => 'date|date_format:Y-m-d|date_after_or_equal:date_from'
        ];

        return $rules;
    }
}
