<?php

namespace App\Models;

use App\Nrb\NrbModel;

class ApiPermission extends NrbModel
{
    protected $table = 'api_permissions';

    protected $fillable = [
        'slug',
        'name',
        'parent_id',
    ];

    public $timestamps = false;

    //---------- scopes
    public function scopeSlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }
}
