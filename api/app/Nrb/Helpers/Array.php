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
function array_keys_format_case($format = 'snake', $array)
{
    if (!$array)
    {
        return [];
    }

    $formatted_array = [];

    foreach ($array as $key => $value)
    {
        if ($format == 'snake')
        {
            $key = snake_case($key);
            $key = ltrim($key, '_');
        }
        else
        {
            $key = camel_case($key);
        }

        if (is_array($value))
        {
            $value = array_keys_format_case($format, $value);
        }

        $formatted_array[$key] = $value;
    }

    return $formatted_array;
}

function transform_arbitrium_payload($payload)
{
    // Transform client_id to api_client_id
    $payload_client_id = get_val($payload, 'client_id');
    if ($payload_client_id)
    {
        $payload_client = \App\Models\Client::findOrfail($payload_client_id);
        $payload_client_api = ($payload_client->user->api) ? $payload_client->user->api->getAuth() : [];
        $payload_client_id = get_val($payload_client_api, 'client_id');
    }

    $payload['client_id'] = $payload_client_id;

    return $payload;
}

function transform_arbitrium_response_data($response)
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
                            $data['client'] = [
                                'id'             => $client->id,
                                'company_name'   => $client->company_name,
                                'rep_first_name' => $client->rep_first_name,
                                'rep_last_name'  => $client->rep_last_name,
                            ];
                        }
                    }
                }

                $response->data[$key] = $data;
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
                        $response_data['client'] = [
                            'id'             => $client->id,
                            'company_name'   => $client->company_name,
                            'rep_first_name' => $client->rep_first_name,
                            'rep_last_name'  => $client->rep_last_name,
                        ];
                    }
                }
            }

            $response->data = $response_data;
        }
    }

    return array_keys_format_case('snake', $response);
}