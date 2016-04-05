<?php

namespace App\Nrb;

class NrbLogModel extends NrbModel
{
    const INFO  = 'info';
    const ERROR = 'error';
    const ALL   = 'all';
    const LOGIN = 'Login';
    const LOGOUT = 'Logout';

    protected $connection = 'mysql_logs';

    protected $fillable = [
        'user_id', 'username', 'email_address', 'name', 'ip_address', 'user_agent',
        'page_accessed', 'api_accessed', 'log_level', 'referrer', 'parameters',
        'created_by', 'updated_by'
    ];

    //---------- scopes
    public function scopeAction($query, $action)
    {
        if(!empty($action) && strtolower($action) != self::ALL)
        {
            return $query->where('page_accessed', self::LOGIN)->orWhere('page_accessed', self::LOGOUT);
        }
    }

    public function scopeCreatedDateFrom($query, $from)
    {
        return $query->dateFrom('created_at', $from);
    }

    public function scopeCreatedDateTo($query, $to)
    {
        return $query->dateTo('created_at', $to);
    }

    public function scopeEmailAddressLike($query, $email_address)
    {
        return $query->like('email_address', $email_address);
    }

    public function scopeUsernameLike($query, $username)
    {
        return $query->like('username', $username);
    }

    public function scopeUsername($query, $username)
    {
	if ($username) {
        	return $query->where('username', $username);
	}
    }
}
