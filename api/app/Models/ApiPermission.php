<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use App\Nrb\NrbModel;

class ApiPermission extends NrbModel
{
    protected $table = 'api_permissions';

    protected $fillable = [
        'slug',
        'name',
        'parent_id',
    ];

    protected $timestamps = false;

    //---------- helpers
    public function template()
    {
        return [];
    }
}
