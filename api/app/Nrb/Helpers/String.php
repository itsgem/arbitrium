<?php

function generate_code($size = 4)
{
    $a_exclude = [];
    $min = str_pad(1, $size, 1);
    $max = str_pad($size, $size, $size);
    for($i = 1; $i <= $size; $i++)
    {
        $a_exclude[] = str_pad($i, $size, $i);
    }
    do
    {
        $code = mt_rand($min, $max);
    } while (in_array($code, $a_exclude));

    return $code;
}

function generate_token($size = 32)
{
    return bin2hex(openssl_random_pseudo_bytes($size));
}

function generate_api_key_token($client_id = '')
{
    return Hash::make($client_id.' '.current_datetime());
}

function replace_placeholders($string, $data)
{
    if ($data && is_array($data))
    {
        foreach($data as $key => $value)
        {
            $string = str_replace('{'.$key.'}', $value, $string);
        }
    }
    return $string;
}

function str_to_slug($string)
{
    return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '_', $string)));
}

function money_format($num)
{
    return number_format($num, 2);
}