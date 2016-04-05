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