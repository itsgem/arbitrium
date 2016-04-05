<?php
namespace App\Models;

use App\Nrb\NrbModel;
use DB;

class CommonPassword extends NrbModel
{

    protected $table = 'common_passwords';

    protected $hidden = [];

    protected $dates = [];

    protected $fillable = [];

    //---------- relationships

    //---------- mutators

    //---------- scopes
    public function scopePassword($query, $password)
    {
        if (!empty($password))
        {
            return $query->where('password', $password);
        }
    }

    //---------- helpers
}