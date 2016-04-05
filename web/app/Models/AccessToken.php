<?php
namespace App\Models;

use App\Exceptions\ExpiredSessionException;
use App\Nrb\NrbModel;

class AccessToken extends NrbModel
{
    protected $table = 'access_tokens';

    protected $fillable = ['user_id', 'token', 'expiry_at'];

    protected $dates = ['expiry_at'];

    public static function boot()
    {
        parent::boot();

        static::created(function($access_token) {
            $access_token->update(['token' => generate_token()]);
            return true;
        });
    }

    //---------- relationships
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    //---------- scopes
    public function scopeToken($query, $token)
    {
        if (!empty($token))
        {
            return $query->where('token', $token);
        }
    }

    public function scopeUserId($query, $id)
    {
        if (!empty($id))
        {
            return $query->where('user_id', $id);
        }
    }

    //---------- helpers
    public function checkAndRefresh()
    {
        $valid = false;
        $user = $this->user;
        if ($user && $user->isActive() && !$user->isLocked())
        {
            if ($this->expiry_at > current_datetime())
            {
                $valid = true;
                $this->updateExpiry();
                auth()->setUser($user);
            }
            else
            {
                $this->delete();
                throw (new ExpiredSessionException);
            }
        }
        return $valid;
    }

    public function updateExpiry()
    {
        $this->update(['expiry_at' => current_datetime()->addMinutes(get_sesssion_lifetime())]);
    }
}