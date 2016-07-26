<?php
use Carbon\Carbon;

function create_date_from_Ymd($date)
{
    return Carbon::createFromFormat('Y-m-d', $date);
}

function create_date_from_datetime($date)
{
    $date = Carbon::createFromTimestamp(strtotime($date));
    return format_date_to_string($date);
}

function current_datetime()
{
    return Carbon::now();
}

function current_datetime_iso8601($offset_days = '0', $timezone = 'Asia/Singapore')
{
    $date = new DateTime("now + ".$offset_days." days", new DateTimeZone($timezone));
    return $date->format('c');
}

function current_date()
{
    return Carbon::today();
}

function current_date_add_days($days = 0)
{
    return current_date()->addDays($days)->toDateString();
}

function current_date_add_months($months = 0, $days_offset = 0)
{
    return current_date()->addMonths($months)->subDays($days_offset)->toDateString();
}

function current_date_add_years($years = 0, $days_offset = 0)
{
    return current_date()->addYears($years)->subDays($days_offset)->toDateString();
}

function current_date_sub_days($days = 0)
{
    return current_date()->subDays($days)->toDateString();
}

function current_date_sub_months($months = 0, $days_offset = 0)
{
    return current_date()->subMonths($months)->subDays($days_offset)->toDateString();
}

function current_date_sub_years($years = 0, $days_offset = 0)
{
    return current_date()->subYears($years)->subDays($days_offset)->toDateString();
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