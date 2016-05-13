<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use App\Nrb\NrbModel;

class Subscription extends NrbModel
{
    const TRIAL_PERIOD = 30; // Days

    const TYPE_TRIAL = 'Trial';
    const TYPE_PLAN  = 'Plan';

    use SoftDeletes;

    protected $table = 'subscriptions';

    protected $hidden = ['country', 'country_id', 'created_by', 'updated_by', 'created_at', 'updated_at', 'deleted_at'];

    protected $dates = [];

    protected $fillable = [
        'name', 'type', 'country_id', 'fee_monthly', 'fee_monthly_maintenance', 'fee_yearly', 'fee_yearly_license',
        'fee_yearly_maintenance', 'fee_initial_setup', 'max_api_calls', 'max_decisions', 'discounts',
        'created_by', 'updated_by'
    ];

    protected $appends = ['total', 'currency'];

    //---------- relationships
    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    //---------- scopes
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

    //---------- appends
    public function getTotalAttribute()
    {
        return $this->calculateTotal();
    }

    public function getCurrencyAttribute()
    {
        return $this->country->currency_code;
    }

    //---------- helpers
    public function calculateTotal($term = null)
    {
        $total = [
            'monthly'  => format_money(
                array_sum([
                    $this->fee_monthly,
                    $this->fee_monthly_maintenance,
                    $this->fee_initial_setup
                ])
            ),
            'annually' => format_money(
                array_sum([
                    $this->fee_yearly,
                    $this->fee_yearly_license,
                    $this->fee_yearly_maintenance,
                    $this->fee_initial_setup
                ])
            ),
        ];

        if ($term) {
            return $total[$term];
        }

        return $total;
    }
}
