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

function transformArbitriumResponseData($response)
{
    if (!isset($response->data))
    {
        return $response;
    }

    if (isset($response->data))
    {
        $response_data = $response->data;

        if (is_array($response_data))
        {
            foreach ($response_data as $key => $data)
            {
                if (isset($data->clientId))
                {
                    $user_api = \App\Models\UserApi::apiClientId($data->clientId)->first();

                    if ($user_api)
                    {
                        $response->data[$key]->clientId = $user_api->user_id;

                        if ($client = $user_api->user->client)
                        {
                            $response->data[$key]->client = (object) [
                                'id'             => $client->id,
                                'company_name'   => $client->company_name,
                                'rep_first_name' => $client->rep_first_name,
                                'rep_last_name'  => $client->rep_last_name,
                            ];
                        }
                    }
                }
            }
        }
        else
        {
            if (isset($response_data->clientId))
            {
                $user_api = \App\Models\UserApi::apiClientId($response_data->clientId)->first();

                if ($user_api)
                {
                    $response->data->clientId = $user_api->user_id;

                    if ($client = $user_api->user->client)
                    {
                        $response->data->client = (object) [
                            'id'             => $client->id,
                            'company_name'   => $client->company_name,
                            'rep_first_name' => $client->rep_first_name,
                            'rep_last_name'  => $client->rep_last_name,
                        ];
                    }
                }
            }
        }
    }

    return $response;
}