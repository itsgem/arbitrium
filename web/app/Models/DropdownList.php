<?php
namespace App\Models;

use App\Nrb\NrbModel;

class DropdownList extends NrbModel
{
    const BLOOD_TYPE        = 'blood_type';
    const EDUCATION         = 'education';
    const ELECTRONIC_DEVICE = 'electronic_device';
    const EMPLOYMENT_STATUS = 'employment_status';
    const ETHNICITY         = 'ethnicity';
    const HOUSING_TYPE      = 'housing_type';
    const INCOME            = 'income';
    const INDUSTRY          = 'industry';
    const JOB_TITLE         = 'job_title';
    const KYC               = 'kyc';
    const LANGUAGE          = 'language';
    const MARITAL_STATUS    = 'marital_status';
    const PET               = 'pet';
    const RELIGION          = 'religion';
    const SPORT             = 'sport';
    const TEXT_WIDTH        = 'text_width_setting';

    const ENGLISH           = 'English';
    const OTHERS_DISPLAY    = 'Others';

    protected $table = 'dropdown_lists';

    protected $hidden = ['pivot', 'type', 'sort_no'];

    //---------- relationships

    //---------- mutators

    //---------- scopes
    public function scopeIdIn($query, $a_id)
    {
        if ($a_id)
        {
            return $query->whereIn('id', $a_id);
        }
    }

    public function scopeName($query, $name)
    {
        if ($name)
        {
            return $query->where('name', $name);
        }
    }

    public function scopeType($query, $type)
    {
        if ($type)
        {
            return $query->where('type', $type);
        }
    }

    //---------- helpers
    public static function getLangIdEnglish()
    {
        $language = self::name(self::ENGLISH)->type(self::LANGUAGE)->first();
        return $language ? $language->id : NULL;
    }

    public static function getOthersId($type)
    {
        $other = self::name(self::OTHERS_DISPLAY)->type($type)->first();
        return $other ? $other->id : NULL;
    }
}
