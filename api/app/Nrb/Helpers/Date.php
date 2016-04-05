<?php
use Carbon\Carbon;

function create_date_from_Ymd($date)
{
    return Carbon::createFromFormat('Y-m-d', $date);
}

function current_datetime()
{
    return Carbon::now();
}

function current_date()
{
    return Carbon::today();
}

function current_date_to_string()
{
    return format_date_to_string(current_date());
}

function format_date_to_string($date)
{
    return convert_to_string($date, 'Y-m-d');
}

function convert_to_string($date, $format)
{
    if ($date instanceof Carbon)
    {
        return $date->format($format);
    }
    return false;
}