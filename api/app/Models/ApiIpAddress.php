<?php

namespace App\Models;

use App\Nrb\NrbModel;

class ApiIpAddress extends NrbModel
{
    protected $table = 'api_ip_addresses';

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
    public function scopeApiKeyId($query, $api_key_id)
    {
        return $query->where('api_key_id', $api_key_id);
    }

    public function scopeClientId($query, $client_id)
    {
        if ($client_id) {
            return $query->whereHas('api_key', function($query) use($client_id) {
                $query->clientId($client_id);
            });
        }
    }

    //---------- helpers
    public function canDelete()
    {
        $is_client = (is_client_user_logged_in() && $this->client_id == get_logged_in_client_id());

        // Can delete if user is admin or client that owns the API Key
        if (is_admin_user_logged_in() || $is_client) {
            return true;
        }

        return false;
    }

    public function isOwnedByClientId($client_id)
    {
        if ($client_id) {
            return $this->api_key && $this->api_key->client_id == $client_id;
        }
    }

    public function assign($api_key_id)
    {
        if ($api_key_id) {
            $this->api_key_id = $api_key_id;
            $this->save();
        }
    }
}
