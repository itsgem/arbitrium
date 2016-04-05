<?php
namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Nrb\NrbModel;
use App\User;

class ResetToken extends NrbModel
{
    const NEW_EMAIL_ADDRESS = 'new_email_address';
    const PASSWORD_RESET    = 'password_reset';
    const VERIFICATION      = 'verification';

    use SoftDeletes;

    protected $table = 'reset_tokens';

    protected $hidden = ['created_by','updated_by','created_at','updated_at','deleted_at'];

    protected $dates = ['password_reset_expiry', 'new_email_address_expiry'];

    protected $fillable = [
        'user_id',
        'password_reset_code', 'password_reset_token', 'password_reset_expiry',
        'new_email_address_code', 'new_email_address_token', 'new_email_address_expiry',
        'verification_code', 'verification_token', 'verification_expiry',
        'created_by', 'updated_by'
    ];

    //---------- relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //---------- mutators

    //---------- scopes
    public function scopeCode($query, $field, $code)
    {
        if ($code && in_array($field, self::getTokenFields()))
        {
            return $query->where($field.'_code', $code);
        }
    }

    public function scopeCodeOrToken($query, $field, $code)
    {
        if ($code && in_array($field, self::getTokenFields()))
        {
            return $query->where(function($query) use ($field, $code)
            {
                return $query->where($field.'_code', $code)
                            ->orWhere($field.'_token', $code);
            });
        }
    }

    public function scopeToken($query, $field, $code)
    {
        if ($code && in_array($field, self::getTokenFields()))
        {
            return $query->where($field.'_token', $code);
        }
    }

    public function scopeNotExpired($query, $field)
    {
        if ($field && in_array($field, self::getTokenFields()))
        {
            return $query->where($field.'_expiry', '>=', current_datetime());
        }
    }

    //---------- helpers
    public function getCodeField($field)
    {
        $value = '';
        if (self::validTokenField($field))
        {
            $value = $this->{$field.'_code'};
        }
        return $value;
    }

    public function getTokenField($field)
    {
        $value = '';
        if (self::validTokenField($field))
        {
            $value = $this->{$field.'_token'};
        }
        return $value;
    }

    public static function getTokenFields()
    {
        return [self::PASSWORD_RESET, self::NEW_EMAIL_ADDRESS, self::VERIFICATION];
    }

    public function generateTokens($field)
    {
        $token = '';
        if (self::validTokenField($field))
        {
            do
            {
                $code = generate_code();
            } while (self::code($field, $code)->first());

            $token = generate_token();
            $this->update([
                $field.'_token'     => $token,
                $field.'_code'      => $code,
                $field.'_expiry'    => current_datetime()->addMinutes(SystemSetting::getResetTokenExpiry())
            ]);
        }

        return $token;
    }

    public function resetTokens($field)
    {
        if (self::validTokenField($field))
        {
            $this->update([
                $field.'_code'      => NULL,
                $field.'_token'     => NULL,
                $field.'_expiry'    => NULL
            ]);
        }
    }

    public static function validTokenField($field)
    {
        return in_array($field, self::getTokenFields());
    }

}
