<?php
namespace App\Models;

use App\Nrb\NrbModel;

class Country extends NrbModel
{
    protected $table = 'countries';

    //---------- relationships

    //---------- mutators

    //---------- scopes
    public function scopeNameLike($query, $name)
    {
        return $query->like('name', $name);
    }

    //---------- helpers
}