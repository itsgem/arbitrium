<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use App\Nrb\NrbModel;

class ApiIpAddress extends NrbModel
{
    use SoftDeletes;

    protected $table = 'api_ip_addresses';

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'api_key_id',
        'ip_address',
        'name',
    ];

    //---------- relationships
    public function api_key()
    {
        return $this->belongsTo(ApiKey::class);
    }

    //---------- scopes
    public function scopeApiKey($query, $client_id)
    {
        return $query->where('api_key_id', $client_id);
    }
}
