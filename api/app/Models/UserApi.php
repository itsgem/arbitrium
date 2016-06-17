<?php
namespace App\Models;

use App\Nrb\NrbModel;
use App\User;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserApi extends NrbModel
{
    use SoftDeletes;

    protected $table = 'user_apis';

    protected $dates = ['deleted_at'];

    protected $hidden = ['user','created_at','updated_at','deleted_at'];

    protected $fillable = [
        'user_id', 'api_client_id', 'api_secret', 'api_access_token', 'api_refresh_token',
    ];

    protected $appends = ['is_subscribed'];

    //---------- relationships

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //---------- appends
    function getIsSubscribedAttribute()
    {
        if ($this->user->client)
        {
            return !empty($this->user->client->subscription);
        }

        return false;
    }

    //---------- scopes
    public function scopeUserId($query, $user_id)
    {
        if (!empty($user_id))
        {
            return $query->where('user_id', $user_id);
        }
    }

    public function scopeApiClientId($query, $api_client_id)
    {
        if (!empty($api_client_id))
        {
            return $query->where('api_client_id', $api_client_id);
        }
    }

    public function scopeApiSecret($query, $api_secret)
    {
        if (!empty($api_secret))
        {
            return $query->where('api_secret', $api_secret);
        }
    }

    public function scopeApiAccessToken($query, $api_access_token)
    {
        if (!empty($api_access_token))
        {
            return $query->where('api_access_token', $api_access_token);
        }
    }

    public function scopeApiRefreshToken($query, $api_refresh_token)
    {
        if (!empty($api_refresh_token))
        {
            return $query->where('api_refresh_token', $api_refresh_token);
        }
    }

    //---------- helpers
}