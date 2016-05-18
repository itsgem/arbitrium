<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

use App\Nrb\NrbModel;
use App\Models\SystemSetting;
use App\Models\Traits\ResetTokenTrait;
use App\Models\Traits\RoleUserTrait;
use App\Models\ResetToken;
use App\Services\MailServices;

class User extends NrbModel implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword, SoftDeletes, RoleUserTrait, ResetTokenTrait;

    const ADMIN         = 1;
    const CLIENT        = 2;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email_address', 'name', 'password',
        'items_per_page', 'timezone',
        'created_by', 'updated_by'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    protected $dates = ['activated_at', 'locked_at', 'deleted_at'];

    public static function boot()
    {
        parent::boot();

        static::created(function($user) {
            if(!isset($user->items_per_page) || !$user->items_per_page)
            {
                $user->items_per_page = SystemSetting::getItemsPerPage();
                $user->save();
            }
            return true;
        });

        static::deleting(function($user){
            if ($user->access_token)
            {
                $user->access_token->delete();
            }
            if ($user->reset_token)
            {
                $user->reset_token->delete();
            }
            return true;
        });
    }

    //---------- relationships
    public function access_token()
    {
        return $this->hasOne('App\Models\AccessToken');
    }

    public function admin()
    {
        return $this->hasOne('App\Models\Admin');
    }

    public function client()
    {
        return $this->hasOne('App\Models\Client');
    }

    public function invoices()
    {
        return $this->hasMany('App\Models\Invoice');
    }

    public function reset_token()
    {
        return $this->hasOne('App\Models\ResetToken');
    }

    //---------- mutators
    public function getFirstNameAttribute($value)
    {
        $name = $this->name;
        switch($this->user_type)
        {
            case self::ADMIN:       $name = $this->admin->first_name; break;
            case self::CLIENT:      $name = $this->client->rep_first_name; break;
        }
        return $name;
    }

    public function setPasswordAttribute($value)
    {
        if ($value)
        {
            $this->attributes['password'] = \Hash::make($value);
        }
    }

    //---------- scopes
    public function scopeActive($query, $active = true)
    {
        if ($active)
        {
            return $query->whereNotNull('activated_at');
        }
        return $query->whereNull('activated_at');
    }

    public function scopeEmailAddress($query, $email)
    {
        if (!empty($email))
        {
            return $query->where('email_address', $email);
        }
    }

    public function scopeEmailLike($query, $email)
    {
        return $query->like('email_address', $email);
    }

    public function scopeLocked($query, $locked = true)
    {
        if ($locked)
        {
            return $query->whereNotNull('locked_at');
        }
        return $query->whereNull('locked_at');
    }

    public function scopeNameLike($query, $name)
    {
        return $query->like('name', $name);
    }

    public function scopeNotId($query, $id)
    {
        if (!empty($id))
        {
            return $query->where('id', '<>', $id);
        }
    }

    public function scopeProviderId($query, $id)
    {
        if ($id)
        {
            return $query->where('provider_id', $id);
        }
    }

    public function scopeUsernameOrEmail($query, $login)
    {
        if (!empty($login))
        {
            return $query->where(function($query) use ($login)
            {
                return $query->where('username', $login)
                             ->orWhere('email_address', $login);
            });
        }
    }

    public function scopeUsername($query, $username)
    {
        if (!empty($username))
        {
            return $query->where('username', $username);
        }
    }

    public function scopeUsernameLike($query, $username)
    {
        if (!empty($username))
        {
            return $query->like('username', $username);
        }
    }

    public function scopeUserType($query, $user_type)
    {
        if (!empty($user_type))
        {
            return $query->where('user_type', $user_type);
        }
    }

    public function scopeUserTypeAdmin($query)
    {
        return $query->userType(self::ADMIN);
    }

    public function scopeUserTypeClient($query)
    {
        return $query->userType(self::CLIENT);
    }

    //---------- helpers
    public function activate()
    {
        $this->activated_at = current_datetime();
        $this->save();
    }

    public function cancelChangeEmail()
    {
        $this->new_email_address = NULL;
        $this->save();
        $this->resetTokens(ResetToken::NEW_EMAIL_ADDRESS);
    }

    public function canDelete()
    {
        // do not allow user to delete his own account
        if (belongs_to_logged_in_user($this->id))
        {
            return false;
        }

        $can = true;
        if ($this->isAdmin())
        {
            $users = User::userTypeAdmin()->active()->locked(false)->notId($this->id)->count();
            if ($users < config('arbitrium.min_admin_count'))
            {
                $can = false;
            }
        }

        return $can;
    }

    public function deactivate()
    {
        $this->activated_at = NULL;
        $this->save();
    }

    public function isActive()
    {
        return $this->activated_at;
    }

    public function isAdmin()
    {
        return $this->user_type == self::ADMIN;
    }

    public function isClient()
    {
        return $this->user_type == self::CLIENT;
    }

    public function isMaxLogAttempts()
    {
        $max = false;
        if ($this->login_attempts >= config('arbitrium.max_login_attempts'))
        {
            $max = true;
            $this->locked_at = current_datetime();
            $this->save();
        }
        return $max;
    }

    public function isLocked()
    {
        return $this->locked_at;
    }

    public function logout()
    {
        if ($this->access_token)
        {
            $this->access_token->delete();
        }
    }

    public function getRoleIds()
    {
        return ($this->isAdmin()) ? array_pluck($this->roles, 'id') : null;
    }

    public function sendChangeEmail($callback_url, $new_email_address)
    {
        $this->new_email_address = $new_email_address;
        $this->save();
        $this->generateTokens(ResetToken::NEW_EMAIL_ADDRESS);
        with(new MailServices())->changeEmail($this, $callback_url);
    }

    public function sendForgotPassword($callback_url)
    {
        $this->generateTokens(ResetToken::PASSWORD_RESET);
        with(new MailServices())->forgotPassword($this, $callback_url);
    }

    public function sendNewClientAccount($callback_url)
    {
        $this->generateTokens(ResetToken::PASSWORD_RESET);
        with(new MailServices())->newClientAccount($this->fresh(), $callback_url);
    }

    public function sendVerificationEmail($callback_url)
    {
        $this->generateTokens(ResetToken::VERIFICATION);
        with(new MailServices())->clientRegistration($this, $callback_url);
    }

    public function setNewEmailAddress()
    {
        $this->email_address = $this->new_email_address;
        $this->new_email_address = NULL;
        $this->save();
    }

    public function unlock()
    {
        $this->login_attempts = 0;
        $this->locked_at = NULL;
        $this->save();
    }
}
