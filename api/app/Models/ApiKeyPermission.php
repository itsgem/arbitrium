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
    public function scopeApiKeyId($query, $api_key_id)
    {
        return $query->where('api_key_id', $api_key_id);
    }

    public function scopeApiPermissionId($query, $api_permission_id)
    {
        return $query->where('api_permission_id', $api_permission_id);
    }

    public function scopeClientId($query, $client_id)
    {
        if ($client_id) {
            return $query->whereHas('api_key', function($query) use($client_id) {
                $query->clientId($client_id);
            });
        }
    }

    public function scopePermission($query, $payload = [])
    {
        if (array_key_exists('api_key_id', $payload) && $payload['api_key_id']
            && array_key_exists('api_permission_id', $payload) && $payload['api_permission_id']) {
            return $query->where('api_key_id', $payload['api_key_id'])
                ->where('api_permission_id', $payload['api_permission_id']);
        }
    }

    //---------- helpers
    public function isOwnedByClientId($client_id)
    {
        if ($client_id) {
            return $this->api_key && $this->api_key->client_id == $client_id;
        }
    }
}
