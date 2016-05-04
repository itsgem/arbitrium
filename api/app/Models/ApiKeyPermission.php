<?php

namespace App\Models;

use App\Nrb\NrbModel;

/**
 * Class ApiKeyPermission
 *
 * @package App\Models
 */
class ApiKeyPermission extends NrbModel
{
    protected $table = 'api_key_permissions';

    protected $fillable = [
        'api_key_id',
        'api_permission_id',
        'value',
    ];

    public $timestamps = false;

    //---------- relationships
    public function api_key()
    {
        return $this->belongsTo(ApiKey::class);
    }

    public function api_permission()
    {
        return $this->belongsTo(ApiPermission::class);
    }

    //---------- scopes
    public function scopeApiKey($query, $api_key_id)
    {
        return $query->where('api_key_id', $api_key_id);
    }

    public function scopeApiPermission($query, $api_permission_id)
    {
        return $query->where('api_permission_id', $api_permission_id);
    }

    public function scopePermission($query, $payload = [])
    {
        return $query->where('api_key_id', $payload['api_key_id'])
                     ->where('api_permission_id', $payload['api_permission_id']);
    }
}
