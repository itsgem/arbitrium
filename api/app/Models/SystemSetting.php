<?php
namespace App\Models;

use App\Nrb\NrbModel;

class SystemSetting extends NrbModel
{
    const DEFAULT_ITEMS_PER_PAGE    = 10;
    const DEFAULT_TOKEN_EXPIRY      = 14400;
    const DEFAULT_ADMIN_EMAIL       = 'no-reply@arbitrium.com';

    const SEGMENT_GENERAL           = 'general';
    const SEGMENT_BILLING           = 'billing';

    protected $table = 'system_settings';

    public $timestamps = false;

    protected $fillable = [
        'name', 'value', 'segment',
    ];

    //---------- relationships

    //---------- mutators

    //---------- scopes
    public function scopeName($query, $name)
    {
        if (!empty($name))
        {
            return $query->where('name', $name);
        }
    }

    public function scopeSegment($query, $segment)
    {
        if (!empty($segment))
        {
            return $query->where('segment', $segment);
        }
    }

    //---------- helpers
    public static function getItemsPerPage()
    {
        $system_setting = self::name('items_per_page')->first();
        return isset($system_setting->value) ? $system_setting->value : self::DEFAULT_ITEMS_PER_PAGE;
    }

    public static function getResetTokenExpiry()
    {
        // value save should be in minutes
        $system_setting = self::name('reset_token_expiry')->first();
        return isset($system_setting->value) ? $system_setting->value : self::DEFAULT_TOKEN_EXPIRY;
    }

    public static function getAdminEmail()
    {
        $system_setting = self::name('kcg_admin_email')->first();
        return isset($system_setting->value) ? $system_setting->value : self::DEFAULT_ADMIN_EMAIL;
    }
}
