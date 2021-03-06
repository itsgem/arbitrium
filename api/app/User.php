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
use App\Models\UserApi;
use App\Services\MailServices;
use App\Services\ExternalRequestServices;

class User extends NrbModel implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword, SoftDeletes, RoleUserTrait, ResetTokenTrait;

    const ADMIN         = 1;
    const CLIENT        = 2;

    const ROLE_SUPER_ADMIN = 'super_admin';
    const ROLE_ADMIN       = 'admin';

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

    public function api()
    {
        return $this->hasOne('App\Models\UserApi');
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

    public function deactivate()
    {
        $this->activated_at = NULL;
        $this->save();
    }

    public function cancelChangeEmail()
    {
        $this->new_email_address = NULL;
        $this->save();
        $this->resetTokens(ResetToken::NEW_EMAIL_ADDRESS);
    }

    public function registerApiCredentials($params = [])
    {
        $data = array_merge([
            'username' => $this->username,
            'password' => $this->password,
            'userType' => $this->user_type,
        ], $params);

        $response = (new ExternalRequestServices())->addUser($data);

        $user_api = new UserApi([
            'user_id'       => $this->id,
            'api_client_id' => $response['body']->data->clientId,
            'api_secret'    => $response['body']->data->clientSecret,
        ]);
        $user_api->save();
    }

    public function updateApiCredentials($params = [], $old_auth = [])
    {
        $data = array_merge([
            'username' => $this->username,
            'password' => $this->password,
            'userType' => (string)$this->user_type,
        ], $params);

        $auth = $old_auth ?: $this->getApiAuth();
        $url = get_api_url(config('arbitrium.core.endpoints.update_user'), ['id' => get_val($auth, 'client_id')]);

        (new ExternalRequestServices())->setAuth($auth)->send($url, $data);
    }

    public function removeApiCredentials()
    {
        $auth = $this->getApiAuth();
        $url = get_api_url(config('arbitrium.core.endpoints.delete_user'), ['id' => get_val($auth, 'client_id')]);
        (new ExternalRequestServices())->send($url);

        $this->api->delete();
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

    public function isActive()
    {
        return $this->activated_at;
    }

    public function isAdmin($role = null)
    {
        if ($this->user_type == self::ADMIN)
        {
            if ($role)
            {
                return in_array($role, array_pluck($this->getRoles(), 'name'));
            }

            return true;
        }

        return false;
    }

    public function isClient()
    {
        return $this->user_type == self::CLIENT;
    }

    public function hasApi()
    {
        return !empty($this->api);
    }

    public function getApiAuth()
    {
        if ($this->hasApi())
        {
            return $this->api->getAuth();
        }

        return [];
    }

    public function isMaxLogAttempts()
    {
        $max = false;
        if (!$this->isAdmin(self::ROLE_SUPER_ADMIN) && $this->login_attempts >= config('arbitrium.max_login_attempts'))
        {
            $max = true;
            $this->locked_at = current_datetime();
            $this->save();
        }
        return $max;
    }

    public function isLocked()
    {
        if (!$this->isAdmin(self::ROLE_SUPER_ADMIN) && $this->locked_at)
        {
            $locked_duration = $this->locked_at->addMinutes(config('arbitrium.user_lock_duration'));
            return (current_datetime() < $locked_duration);
        }

        return false;
    }

    public function logout()
    {
        if ($this->access_token)
        {
            $this->access_token->delete();
        }
    }

    public function getRoles($key = null)
    {
        if ($this->roles)
        {
            if ($key)
            {
                return array_pluck($this->roles, $key);
            }
            return $this->roles;
        }

        return [];
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
