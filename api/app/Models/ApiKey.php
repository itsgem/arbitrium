<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use App\Nrb\NrbModel;

class ApiKey extends NrbModel
{
    use SoftDeletes;

    protected $table = 'api_keys';

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'client_id',
        'token',
        'name',
        'description',
        'api_permissions',
        'is_api_call_restricted',
        'is_whitelist',
        'is_active',
        'is_test_key'
    ];

    //---------- relationships
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function ip_addresses()
    {
        return $this->hasMany(ApiIpAddress::class);
    }

    //---------- scopes
    public function scopeClient($query, $client_id)
    {
        return $query->where('client_id', $client_id);
    }

    public function scopeRestricted($query, $flag = true)
    {
        return $query->where('is_api_call_restricted', (int) $flag);
    }

    public function scopeWhitelist($query, $flag = true)
    {
        return $query->where('is_whitelist', (int) $flag);
    }

    public function scopeActive($query, $flag = true)
    {
        return $query->where('is_active', (int) $flag);
    }

    public function scopeInactive($query)
    {
        return $query->where('is_active', (int) false);
    }

    public function scopeTestKey($query, $flag = true)
    {
        return $query->where('is_test_key', (int) $flag);
    }

    //---------- helpers
    public function canDelete()
    {
        //$is_client = (is_client_user_logged_in() && $this->client_id == get_logged_in_client_id());
        $is_client = false;

        // Can delete if user is admin or client that owns the API Key
        if (is_admin_user_logged_in() || $is_client) {
            return true;
        }

        return false;
    }

    public function isActive($flag = true)
    {
        return $this->is_active == (int) $flag;
    }
}
