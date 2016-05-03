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
    public function scopeApiKey($query, $api_key_id)
    {
        return $query->where('api_key_id', $api_key_id);
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

    public function assign($api_key_id)
    {
        if ($api_key_id) {
            $this->api_key_id = $api_key_id;
            $this->save();
        }
    }
}
