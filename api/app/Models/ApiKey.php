<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use App\Nrb\NrbModel;

/**
 * Class ApiKey
 *
 * @SWG\Definition(
 *     definition="ApiLogResponse",
 *     required={"id", "method", "status_code", "parameter", "url", "ipaddress", "user_id", "client"},
 *     @SWG\Property(property="id", type="integer", format="int64", description="API Log ID", default="576bb920a22d958a1e936854"),
 *     @SWG\Property(property="method", type="string", description="Requested endpoint method", default="GET"),
 *     @SWG\Property(property="status_code", type="string", description="Response status code", default="200"),
 *     @SWG\Property(property="parameter", type="string", description="Payload sent in json format with escaped double quotes", default="{name:John Doe}"),
 *     @SWG\Property(property="url", type="string", description="Requested endpoint", default="http://core.api.arbitrium.com/api/v1/user"),
 *     @SWG\Property(property="ipaddress", type="string", description="IP Address of the requester", default="122.122.122.122"),
 *     @SWG\Property(property="user_id", type="integer", format="int64", description="User ID", default="1"),
 *     @SWG\Property(property="client", description="Client Data",
 *         @SWG\Property(property="id", type="integer", format="int64", description="Client ID", default="1"),
 *         @SWG\Property(property="company_name", type="string", description="Company Name", default="ABC Company"),
 *         @SWG\Property(property="rep_first_name", type="string", description="Representative First Name", default="John"),
 *         @SWG\Property(property="rep_last_name", type="string", description="Representative Last Name", default="Doe"),
 *     ),
 * )
 *
 * @package App\Models
 */
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

    public function permissions()
    {
        return $this->hasMany(ApiKeyPermission::class);
    }

    //---------- scopes
    public function scopeToken($query, $token)
    {
        if ($token)
        {
            return $query->where('token', $token);
        }
    }

    public function scopeClientId($query, $client_id)
    {
        if ($client_id)
        {
            return $query->where('client_id', $client_id);
        }
    }

    public function scopeRestricted($query, $flag = true)
    {
        if ($flag != null)
        {
            return $query->where('is_api_call_restricted', (int) $flag);
        }
    }

    public function scopeWhitelist($query, $flag = true)
    {
        if ($flag != null)
        {
            return $query->where('is_whitelist', (int) $flag);
        }
    }

    public function scopeActive($query, $flag = true)
    {
        if ($flag != null)
        {
            return $query->where('is_active', (int) $flag);
        }
    }

    public function scopeInactive($query)
    {
        return $query->where('is_active', (int) false);
    }

    public function scopeTestKey($query, $flag = true)
    {
        if ($flag != null)
        {
            return $query->where('is_test_key', (int) $flag);
        }
    }

    //---------- helpers
    public function canDelete()
    {
        $is_client = (is_client_user_logged_in() && $this->client_id == get_logged_in_client_id());

        // Can delete if user is admin or client that owns the API Key
        if (is_admin_user_logged_in() || $is_client)
        {
            return true;
        }

        return false;
    }

    public function isActive($flag = true)
    {
        return $this->is_active == (int) $flag;
    }

    public function isOwnedByClientId($client_id)
    {
        return $this->client_id == $client_id;
    }
}
