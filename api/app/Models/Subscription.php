<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use App\Nrb\NrbModel;

class Subscription extends NrbModel
{
    // multi_language
    const ENGLISH_ONLY  = 0;
    const MULTI_LINGUAL = 1;

    // statistical_analysis and tbl_graph_charts
    const DESCRIPTIVE   = 1;
    const DETAILED      = 2;

    use SoftDeletes;

    protected $table = 'subscriptions';

    protected $hidden = ['created_by', 'updated_by', 'created_at', 'updated_at', 'deleted_at'];

    protected $dates = [];

    protected $fillable = [
        'name', 'price_in_credit', 'max_questions', 'max_surveys', 'max_responses',
        'has_email_support', 'has_templates', 'multi_language', 'has_export_data', 'has_real_time_reporting',
        'statistical_analysis', 'tbl_graph_charts', 'has_skip_question_logic', 'can_edit_survey_questions', 'can_embed_media',
        'can_customize_invite', 'can_randomize_questions', 'can_add_open_ended_questions', 'can_theme',
        'has_data_validation', 'has_incentive_payments', 'has_respondent_management', 'has_call_support', 'has_piping',
        'created_by', 'updated_by'
    ];

    //---------- relationships

    //---------- mutators

    //---------- scopes
    public function scopeName($query, $name)
    {
        if ($name)
        {
            return $query->where('name', $name);
        }
    }

    public function scopePriceInCredit($query, $price = 0)
    {
        return $query->where('price_in_credit', $price);
    }

    //---------- helpers
    public function canDelete()
    {
        return ClientSubscription::subscriptionId($this->id)->count() == 0;
    }

    public function isEnglishOnly()
    {
        return $this->multi_language == self::ENGLISH_ONLY;
    }

    public function isMultiLanguage()
    {
        return $this->multi_language ==  self::MULTI_LINGUAL;
    }
}
