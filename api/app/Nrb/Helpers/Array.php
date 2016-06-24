<?php

function get_val($arr, $key, $default = NULL)
{
    return isset($arr[$key]) ? $arr[$key] : $default;
}

function csv_to_array($filename='', $header=false, $delimiter=',')
{
    if(!file_exists($filename) || !is_readable($filename))
    {
        return FALSE;
    }

    $a_header = NULL;
    $a_data = [];
    ini_set("auto_detect_line_endings", true);
    if (($handle = fopen($filename, 'r')) !== FALSE)
    {
        while (($row = fgetcsv($handle, 0, $delimiter)) !== FALSE)
        {
            $row = array_map('trim', $row);
            if($header)
            {
                if ($a_header)
                {
                    if (count($a_header) == count($row))
                    {
                        $a_data[] = array_combine($a_header, $row);
                    }
                }
                else
                {
                    $a_header = $row;
                }
            }
            else
            {
                $a_data[] = $row;
            }
        }
        fclose($handle);
    }
    return $a_data;
}

// Ref: https://gist.github.com/goldsky/3372487
function array_keys_format_case($format = 'snake', $array, $array_holder = [])
{
    if (empty($array))
    {
        return [];
    }

    $formatted_array = !empty($array_holder) ? $array_holder : [];

    foreach ($array as $key => $val)
    {
        if ($format == 'snake')
        {
            // Camel to snake case
            $new_key = preg_replace('/[A-Z]/', '_$0', $key);
            $new_key = strtolower($new_key);
            $new_key = ltrim($new_key, '_');
        }
        else
        {
            // Snake to camel case
            $new_key = explode('_', $key);
            array_walk($new_key, create_function('&$v', '$v = ucwords($v);'));
            $new_key = implode('', $new_key);
            $new_key{0} = strtolower($new_key{0});
        }

        if (is_array($val))
        {
            $val_array = [];
            $value = $val;
            foreach ($value as $k => $v)
            {
                $val_array[] = array_keys_format_case($format, $val[$k], $v);
            }
            $formatted_array[$new_key] = $val_array;
        }
        else
        {
            $formatted_array[$new_key] = $val;
        }
    }

    return $formatted_array;
}

function transformArbitriumResponseData($response)
{
    if (!isset($response->data))
    {
        return $response;
    }

    if (isset($response->data))
    {
        $is_array = is_array($response->data);

        $response_data = $response->data = json_decode(json_encode($response->data), true);

        if ($is_array)
        {
            foreach ($response_data as $key => $data)
            {
                if (isset($data['clientId']))
                {
                    $user_api = \App\Models\UserApi::apiClientId($data['clientId'])->first();

                    if ($user_api)
                    {
                        unset($data['clientId']);
                        $data['user_id'] = $user_api->user_id;

                        if ($client = $user_api->user->client)
                        {
                            $data['client'] = (object) [
                                'id'             => $client->id,
                                'company_name'   => $client->company_name,
                                'rep_first_name' => $client->rep_first_name,
                                'rep_last_name'  => $client->rep_last_name,
                            ];
                        }
                    }
                }

                $response->data[$key] = array_keys_format_case('snake', $data);
            }
        }
        else
        {
            if (isset($response_data['clientId']))
            {
                $user_api = \App\Models\UserApi::apiClientId($response_data['clientId'])->first();

                if ($user_api)
                {
                    unset($response_data['clientId']);
                    $response_data['user_id'] = $user_api->user_id;

                    if ($client = $user_api->user->client)
                    {
                        $response_data['client'] = (object) [
                            'id'             => $client->id,
                            'company_name'   => $client->company_name,
                            'rep_first_name' => $client->rep_first_name,
                            'rep_last_name'  => $client->rep_last_name,
                        ];
                    }
                }
            }

            $response->data = array_keys_format_case('snake', $response_data);
        }
    }

    return $response;
}