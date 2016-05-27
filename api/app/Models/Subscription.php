<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use App\Nrb\NrbModel;

/**
 * Class Subscription
 *
 * @SWG\Definition(
 *     definition="Subscription",
 *     required={"name", "description", "type", "country_id", "fee_monthly", "fee_monthly_maintenance", "fee_yearly", "fee_yearly_license", "fee_yearly_maintenance", "fee_initial_setup", "max_api_calls", "max_decisions", "discounts"},
 *     @SWG\Property(property="name", type="string", description="Subscription package name", default="Basic"),
 *     @SWG\Property(property="description", type="string", description="Subscription description", default="Basic Package Plan"),
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
 *     required={"id", "name", "description", "type", "fee_monthly", "fee_monthly_maintenance", "fee_yearly", "fee_yearly_license", "fee_yearly_maintenance", "fee_initial_setup", "max_api_calls", "max_decisions", "discounts", "total", "currency"},
 *     @SWG\Property(property="id", type="integer", format="int64", description="Subscription ID", default="1"),
 *     @SWG\Property(property="name", type="string", description="Subscription package name", default="Basic"),
 *     @SWG\Property(property="description", type="string", description="Subscription description", default="Basic Plan"),
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
 *     @SWG\Property(property="total", type="object", description="Package total fee", required={"Monthly", "Annually", "Monthly_With_Setup", "Annually_With_Setup"},
 *         @SWG\Property(property="Monthly", type="integer", format="int64", description="Monthly total fee (without setup fee)", default="32.00"),
 *         @SWG\Property(property="Annually", type="integer", format="int64", description="Annual total fee (without setup fee)", default="140.00"),
 *         @SWG\Property(property="Monthly_With_Setup", type="integer", format="int64", description="Monthly total fee (with setup fee)", default="72.00"),
 *         @SWG\Property(property="Annually_With_Setup", type="integer", format="int64", description="Annual total fee (with setup fee)", default="180.00"),
 *     ),
 *     @SWG\Property(property="currency", type="string", description="Currency code", default="USD")
 * )
 *
 * @SWG\Definition(
 *     definition="ClientSubscription",
 *     required={"subscription_id", "term", "is_auto_renew"},
 *     @SWG\Property(property="subscription_id", type="integer", format="int64", description="Subscription ID (Refer to GET /subscription for the list)", default="2"),
 *     @SWG\Property(property="term", type="string", description="Monthly|Annually", default="Monthly"),
 *     @SWG\Property(property="is_auto_renew", type="integer", format="int64", description="0 => No, 1 => Yes", default="1"),
 * )
 *
 * @SWG\Definition(
 *     definition="ClientSubscriptionResponse",
 *     required={"approval_url"},
 *     @SWG\Property(property="approval_url", type="string", description="Paypal URL to visit to confirm subscription payment", default="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-0GW092283X244145E"),
 * )
 *
 * @SWG\Definition(
 *     definition="ClientSubscriptionConfirm",
 *     required={"success", "token"},
 *     @SWG\Property(property="success", type="string", description="true|false", default="true"),
 *     @SWG\Property(property="token", type="string", description="Paypal Token ID returned from subscribing", default="EC-0GW092283X244145E"),
 * )
 *
 * @SWG\Definition(
 *     definition="ClientSubscriptionConfirmResponse",
 *     required={"id", "client_id", "subscription_id", "invoice_id", "paypal_plan_id", "paypal_agreement_id", "paypal_token_id", "term", "valid_from", "valid_to", "is_auto_renew", "status", "status_end", "name", "description", "type", "fee_monthly", "fee_monthly_maintenance", "fee_yearly", "fee_yearly_license", "fee_yearly_maintenance", "fee_initial_setup", "max_api_calls", "max_decisions", "discounts", "total", "currency"},
 *     @SWG\Property(property="id", type="integer", format="int64", description="ClientSubscription ID", default="1"),
 *     @SWG\Property(property="client_id", type="integer", format="int64", description="Client ID", default="1"),
 *     @SWG\Property(property="subscription_id", type="integer", format="int64", description="Subscription ID", default="1"),
 *     @SWG\Property(property="invoice_id", type="integer", format="int64", description="Invoice ID", default=""),
 *     @SWG\Property(property="paypal_plan_id", type="string", description="Paypal Plan ID", default="P-4GR93770FE19021274FPOG7I"),
 *     @SWG\Property(property="paypal_agreement_id", type="string", description="Paypal Agreement / Profile ID", default="I-7KH5DB368T26"),
 *     @SWG\Property(property="paypal_token_id", type="string", description="Paypal Token ID", default="EC-7BT02592EH292371F"),
 *     @SWG\Property(property="term", type="string", description="Monthly|Annually", default="Monthly"),
 *     @SWG\Property(property="valid_from", type="string", format="date", description="Subscription Validity (From)", default="2016-05-15"),
 *     @SWG\Property(property="valid_to", type="string", format="date", description="Subscription Validity (To)", default="2016-06-14"),
 *     @SWG\Property(property="is_auto_renew", type="integer", format="int64", description="0 => No, 1 => Yes", default="1"),
 *     @SWG\Property(property="status", type="string", description="Active|Inactive", default="Active"),
 *     @SWG\Property(property="status_end", type="string", description="Cancelled|Upgraded|Renewed", default=""),
 *     @SWG\Property(property="name", type="string", description="Subscription package name", default="Basic"),
 *     @SWG\Property(property="description", type="string", description="Subscription description", default="Basic Package Plan"),
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
 *     @SWG\Property(property="total", type="object", description="Package total fee", required={"Monthly", "Annually", "Monthly_With_Setup", "Annually_With_Setup"},
 *         @SWG\Property(property="Monthly", type="integer", format="int64", description="Monthly total fee (without setup fee)", default="32.00"),
 *         @SWG\Property(property="Annually", type="integer", format="int64", description="Annual total fee (without setup fee)", default="140.00"),
 *         @SWG\Property(property="Monthly_With_Setup", type="integer", format="int64", description="Monthly total fee (with setup fee)", default="72.00"),
 *         @SWG\Property(property="Annually_With_Setup", type="integer", format="int64", description="Annual total fee (with setup fee)", default="180.00"),
 *     ),
 *     @SWG\Property(property="currency", type="string", description="Currency code", default="USD"),
 *     @SWG\Property(property="client", description="Client Data", ref="#/definitions/ClientProfileResponse")
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
        'name', 'description', 'type', 'country_id',
        'fee_monthly', 'fee_monthly_maintenance', 'fee_yearly', 'fee_yearly_license',
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
    public function isTrial()
    {
        return $this->type == self::TYPE_TRIAL;
    }

    public function getFees($term = null)
    {
        $monthly = [
            'regular' => [
                'amount'      => $this->fee_monthly,
                'name' => 'Monthly Fee',
            ],
            'maintenance' => [
                'amount'      => $this->fee_monthly_maintenance,
                'name' => 'Monthly Maintenance Fee',
            ],
            'initial' => [
                'amount'      => $this->fee_initial_setup,
                'name' => 'Initial Setup Fee',
            ],
        ];
        $annually = [
            'regular' => [
                'amount'      => $this->fee_yearly,
                'name' => 'Annual Fee',
            ],
            'license' => [
                'amount'      => $this->fee_yearly_license,
                'name' => 'Annual License Fee',
            ],
            'maintenance' => [
                'amount'      => $this->fee_yearly_maintenance,
                'name' => 'Annual Maintenance Fee',
            ],
            'initial' => [
                'amount'      => $this->fee_initial_setup,
                'name' => 'Initial Setup Fee',
            ],
        ];

        $fees = [
            ClientSubscription::TERM_MONTHLY  => $monthly,
            ClientSubscription::TERM_ANNUALLY => $annually,
        ];

        if ($term) {
            return $fees[$term];
        }

        return $fees;
    }

    public function calculateTotal($term = null)
    {
        $monthly = array_sum([
            $this->fee_monthly,
            $this->fee_monthly_maintenance
        ]);

        $annually = array_sum([
            $this->fee_yearly,
            $this->fee_yearly_license,
            $this->fee_yearly_maintenance
        ]);

        $total = [
            ClientSubscription::TERM_MONTHLY  => format_money($monthly),
            ClientSubscription::TERM_ANNUALLY => format_money($annually),
            ClientSubscription::TERM_MONTHLY.'_With_Setup'  => format_money(
                array_sum([
                    $monthly,
                    $this->fee_initial_setup
                ])
            ),
            ClientSubscription::TERM_ANNUALLY.'_With_Setup' => format_money(
                array_sum([
                    $annually,
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
