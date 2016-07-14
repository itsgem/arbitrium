<?php

namespace App\Nrb\Http\v1\Traits;

use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;

use App\Errors;

trait JsonResponseTrait
{
    private $status_code = Response::HTTP_OK;
    private $data_bag = [];
    private $response_details = [];
    private $custom_headers = [];
    private $message_bag = [];

    public function addResponseData($data)
    {
        if (!empty($data))
        {
            if (!is_array($data))
            {
                $data = $data->toArray();
            }
            if (empty($this->data_bag))
            {
                $this->data_bag = $data;
            }
            else
            {
                $this->data_bag = array_merge(
                    $this->data_bag,
                    $data
                );
            }
        }
    }

    public function addResponseMessage($message)
    {
        if (!empty($message))
        {
            $this->message_bag[] = trans("errors.".$message);
        }
    }

    public function addHTTPHeaders($headers)
    {
        foreach ($headers as $key => $value)
        {
            $this->custom_headers[$key] = $value;
        }
    }

    public function respondWithData($data = [], $max_pagination_links = 5)
    {
        if ($data instanceof LengthAwarePaginator)
        {
            $a_urls = [];
            $a_data = $data->toArray();

            // return only max_pagination_links pages at a time
            if ($a_data['data'])
            {
                $max_pagination_links = ($max_pagination_links ?: 5);
                $cur_page = $data->currentPage();
                $total_pages = $data->lastPage();

                $a_pages = range(1, $total_pages);
                if (($max_pagination_links = floor($max_pagination_links / 2) * 2 + 1) >= 1)
                {
                    $a_pages = array_slice(
                        $a_pages,
                        max(0, min(count($a_pages) - $max_pagination_links, intval($cur_page) - ceil($max_pagination_links / 2))),
                        $max_pagination_links
                    );
                }
                foreach ($a_pages as $i)
                {
                    $a_urls[] = ['page' => $i, 'url' => $data->url($i)];
                }
                $a_data['page_urls'] = $a_urls;
                $a_data['max_pagination_links'] = $max_pagination_links;
            }
            // end max pages at a time

            $data = $a_data;
        }

        $this->response_details = $data;
        if ($this->data_bag)
        {
            $this->response_details[] = $this->data_bag;
        }
        return $this->jsonResponse();
    }

    public function respondWithError($error_code, $a_errors = [])
    {
        $this->response_details['success'] = false;
        $this->status_code = Errors::httpCode($error_code);

        if( $this->status_code === Response::HTTP_UNAUTHORIZED ||
            $this->status_code === Response::HTTP_INTERNAL_SERVER_ERROR ||
            $this->status_code === Response::HTTP_BAD_REQUEST ||
            $this->status_code === Response::HTTP_NOT_FOUND ||
            $this->status_code === Response::HTTP_NO_CONTENT )
        {
            $this->addHTTPHeaders(['Access-Control-Allow-Origin' => '*']);
        }

        if (array_key_exists($error_code, Errors::$extended_codes))
        {
            $this->response_details['extended_code'] =  Errors::$extended_codes[$error_code];
        }

        // If no array of errors passed to data_bag, contain it with its respective status code message as default
        if (!$a_errors) {
            $a_errors = [trans('errors.'.$error_code)];
        }

        $str_replacers = [];
        if (isset($a_errors['str_replace']))
        {
            $str_replacers = $a_errors['str_replace'];
            unset($a_errors['str_replace']);
        }
        $this->response_details['message'] = trans("errors.{$error_code}", $str_replacers);

        $this->addResponseData($a_errors);
        if ($this->data_bag)
        {
            $this->response_details['errors'] = $this->data_bag;
        }

        if ($this->message_bag)
        {
            $this->response_details['messages'] = $this->message_bag;
        }
        return $this->jsonResponse();
    }

    public function respondWithSuccess($data = [], $message = "")
    {
        $this->response_details['success'] = true;
        $this->response_details['message'] = ($message ? $message : trans("messages.success"));
        $this->addResponseData($data);
        $this->response_details['data'] = $this->data_bag;
        return $this->jsonResponse();
    }

    private function jsonResponse()
    {
        return response()->json(
            $this->response_details,
            $this->status_code, $this->custom_headers
        );
    }
}
