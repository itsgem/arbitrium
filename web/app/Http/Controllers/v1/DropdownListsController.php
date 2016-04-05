<?php

namespace App\Http\Controllers\v1;

use App\Models\DropdownList;
use App\Nrb\Http\v1\Controllers\ApiController;

class DropdownListsController extends ApiController
{
    public $excludeAllFromLogs = true;

    protected function excludeMethodsInLog()
    {
        return [];
    }

    protected function getMethods()
    {
        return [];
    }

    public function getListByType()
    {
        $s_type = $this->request->get('type');
        if ($s_type)
        {
            $a_lists = [];
            $a_types = explode(',', $s_type);
            foreach($a_types as $type)
            {
                $type = trim($type);
                $a_lists[$type] = DropdownList::type($type)->get();
            }
            return $this->respondWithData($a_lists);
        }
        return $this->respondWithSuccess();
    }
}