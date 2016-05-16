<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use App\Nrb\NrbModel;

/**
 * Class Subscription
 *
 * @SWG\Definition(
 *     definition="Subscription",
 *     required={"name", "type", "country_id", "fee_monthly", "fee_monthly_maintenance", "fee_yearly", "fee_yearly_license", "fee_yearly_maintenance", "fee_initial_setup", "max_api_calls", "max_decisions", "discounts"},
 *     @SWG\Property(property="name", type="string", description="Subscription package name", default="Basic"),
 *     @SWG\Property(property="type", type="string", description="Trial|Plan", default="Plan"),
 *     @SWG\Property(property="country_id", type="integer", format="int64", description="Currency code by Country ID", default="202"),
 *     @SWG\Property(property="fee_monthly", type="integer", format="int64", description="Monthly fee", default="20.00"),
 *     @SWG\Property(property="fee_monthly_maintenance", type="integer", format="int64", description="Monthly maintenance fee", default="12.00"),
 *     @SWG\Property(property="fee_yearly", type="integer", format="int64", description="Annual fee", default="80.00"),
 *     @SWG\Property(property="fee_yearly_license", type="integer", format="int64", description="Annual license fee", default="30.00"),
 *     @SWG\Property(property="fee_yearly_maintenance", type="integer", format="int64", description="Annual maintenance fee", default="30.00"),
 *     @SWG\Property(property="fee_initial_setup", type="integer", format="int64", description="Initial setup fee", default="40.00"),
 *     @SWG\Property(property="max_api_calls", type="integer", format="int64", description="Maximum number of times a client can call the core API", default="50"),
 *     @SWG\Property(property="max_decisions", type="integer", format="int64", description="Maximum number of decisions the core API can give", default="50"),
 *     @SWG\Property(property="discounts", type="integer", format="int64", description="Package Discount", default="5.00"),
 * )
 *
 * @SWG\Definition(
 *     definition="SubscriptionResponse",
 *     required={"id", "name", "type", "fee_monthly", "fee_monthly_maintenance", "fee_yearly", "fee_yearly_license", "fee_yearly_maintenance", "fee_initial_setup", "max_api_calls", "max_decisions", "discounts", "total", "currency"},
 *     @SWG\Property(property="id", type="integer", format="int64", description="Subscription ID", default="1"),
 *     @SWG\Property(property="name", type="string", description="Subscription package name", default="Basic"),
 *     @SWG\Property(property="type", type="string", description="Trial|Plan", default="Plan"),
 *     @SWG\Property(property="fee_monthly", type="integer", format="int64", description="Monthly fee", default="20.00"),
 *     @SWG\Property(property="fee_monthly_maintenance", type="integer", format="int64", description="Monthly maintenance fee", default="12.00"),
 *     @SWG\Property(property="fee_yearly", type="integer", format="int64", description="Annual fee", default="80.00"),
 *     @SWG\Property(property="fee_yearly_license", type="integer", format="int64", description="Annual license fee", default="30.00"),
 *     @SWG\Property(property="fee_yearly_maintenance", type="integer", format="int64", description="Annual maintenance fee", default="30.00"),
 *     @SWG\Property(property="fee_initial_setup", type="integer", format="int64", description="Initial setup fee", default="40.00"),
 *     @SWG\Property(property="max_api_calls", type="integer", format="int64", description="Maximum number of times a client can call the core API", default="50"),
 *     @SWG\Property(property="max_decisions", type="integer", format="int64", description="Maximum number of decisions the core API can give", default="50"),
 *     @SWG\Property(property="discounts", type="integer", format="int64", description="Package Discount", default="5.00"),
 *     @SWG\Property(property="total", type="object", description="Package total fee", required={"monthly", "annually"},
 *         @SWG\Property(property="monthly", type="integer", format="int64", description="Package total fee (monthly)", default="72.00"),
 *         @SWG\Property(property="annually", type="integer", format="int64", description="Package total fee (annually)", default="180.00"),
 *     ),
 *     @SWG\Property(property="currency", type="string", description="Currency code", default="SGD")
 * )
 *
 * @SWG\Definition(
 *     definition="ClientSubscription",
 *     required={"subscription_id", "term"},
 *     @SWG\Property(property="subscription_id", type="integer", format="int64", description="Subscription ID (Refer to GET /subscription for the list)", default="1"),
 *     @SWG\Property(property="term", type="string", description="Monthly|Annually", default="Monthly"),
 * )
 *
 * @SWG\Definition(
 *     definition="ClientSubscriptionResponse",
 *     required={"id", "name", "type", "fee_monthly", "fee_monthly_maintenance", "fee_yearly", "fee_yearly_license", "fee_yearly_maintenance", "fee_initial_setup", "max_api_calls", "max_decisions", "discounts", "total", "currency"},
 *     @SWG\Property(property="id", type="integer", format="int64", description="ClientSubscription ID", default="1"),
 *     @SWG\Property(property="client_id", type="integer", format="int64", description="Client ID", default="1"),
 *     @SWG\Property(property="subscription_id", type="integer", format="int64", description="Subscription ID", default="1"),
 *     @SWG\Property(property="invoice_id", type="integer", format="int64", description="Invoice ID", default=""),
 *     @SWG\Property(property="term", type="string", description="Monthly|Annually", default="Monthly"),
 *     @SWG\Property(property="valid_from", type="string", format="date", description="Subscription Validity (From)", default="2016-05-15"),
 *     @SWG\Property(property="valid_to", type="string", format="date", description="Subscription Validity (To)", default="2016-06-14"),
 *     @SWG\Property(property="is_auto_renew", type="integer", format="int64", description="0 => No, 1 => Yes", default="1"),
 *     @SWG\Property(property="status", type="string", description="Active|Inactive", default="Active"),
 *     @SWG\Property(property="status_end", type="string", description="Cancelled|Upgraded|Renewed", default=""),
 *     @SWG\Property(property="name", type="string", description="Subscription package name", default="Basic"),
 *     @SWG\Property(property="type", type="string", description="Trial|Plan", default="Plan"),
 *     @SWG\Property(property="fee_monthly", type="integer", format="int64", description="Monthly fee", default="20.00"),
 *     @SWG\Property(property="fee_monthly_maintenance", type="integer", format="int64", description="Monthly maintenance fee", default="12.00"),
 *     @SWG\Property(property="fee_yearly", type="integer", format="int64", description="Annual fee", default="80.00"),
 *     @SWG\Property(property="fee_yearly_license", type="integer", format="int64", description="Annual license fee", default="30.00"),
 *     @SWG\Property(property="fee_yearly_maintenance", type="integer", format="int64", description="Annual maintenance fee", default="30.00"),
 *     @SWG\Property(property="fee_initial_setup", type="integer", format="int64", description="Initial setup fee", default="40.00"),
 *     @SWG\Property(property="max_api_calls", type="integer", format="int64", description="Maximum number of times a client can call the core API", default="50"),
 *     @SWG\Property(property="max_decisions", type="integer", format="int64", description="Maximum number of decisions the core API can give", default="50"),
 *     @SWG\Property(property="discounts", type="integer", format="int64", description="Package Discount", default="5.00"),
 *     @SWG\Property(property="total", type="object", description="Package total fee", required={"monthly", "annually"},
 *         @SWG\Property(property="monthly", type="integer", format="int64", description="Package total fee (monthly)", default="72.00"),
 *         @SWG\Property(property="annually", type="integer", format="int64", description="Package total fee (annually)", default="180.00"),
 *     ),
 *     @SWG\Property(property="currency", type="string", description="Currency code", default="SGD")
 * )
 *
 * @package App\Models
 */
class Subscription extends NrbModel
{
    const TRIAL_PERIOD = 30; // Days

    const TYPE_TRIAL = 'Trial';
    const TYPE_PLAN  = 'Plan';

    use SoftDeletes;

    protected $table = 'subscriptions';

    protected $hidden = ['country', 'country_id'];

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
        if ($this->country)
        {
            return $this->country->currency_code;
        }
    }

    //---------- helpers
    public function isTrial()
    {
        return $this->type == self::TYPE_TRIAL;
    }

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
