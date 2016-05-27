<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use App\Nrb\NrbModel;
use App\Services\MailServices;
use App\User;

/**
 * Class Client
 *
 * @SWG\Definition(
 *     definition="ClientProfile",
 *     required={"company_name", "street_address_1", "city", "country_id", "postal_code", "rep_first_name", "rep_last_name", "rep_email_address", "rep_gender", "rep_position", "rep_department"},
 *     @SWG\Property(property="company_name", type="string", description="Company Name", default="ABC"),
 *     @SWG\Property(property="street_address_1", type="string", description="Street Address Line 1", default="Mabolo"),
 *     @SWG\Property(property="street_address_2", type="string", description="Street Address Line 2", default="null"),
 *     @SWG\Property(property="city", type="string", description="City Address", default="Cebu"),
 *     @SWG\Property(property="state", type="string", description="State Address", default="null"),
 *     @SWG\Property(property="country_id", type="integer", format="int64", description="Country Address", default="175"),
 *     @SWG\Property(property="postal_code", type="string", description="Postal Code Address", default="6000"),
 *     @SWG\Property(property="rep_first_name", type="string", description="Representative First Name", default="John"),
 *     @SWG\Property(property="rep_last_name", type="string", description="Representative Last Name", default="Doe"),
 *     @SWG\Property(property="rep_email_address", type="string", description="Representative Email Address", default="contact"),
 *     @SWG\Property(property="rep_gender", type="string", description="Representative Gender", default="Male"),
 *     @SWG\Property(property="rep_mobile_code", type="string", description="Representative Mobile Code", default="null"),
 *     @SWG\Property(property="rep_mobile_number", type="string", description="Representative Mobile Number", default="null"),
 *     @SWG\Property(property="rep_phone_code", type="string", description="Representative Phone Code", default="null"),
 *     @SWG\Property(property="rep_phone_number", type="string", description="Representative Phone Number", default="null"),
 *     @SWG\Property(property="rep_position", type="string", description="Representative Position", default="CEO"),
 *     @SWG\Property(property="rep_department", type="string", description="Representative Department", default="IT"),
 *     @SWG\Property(property="alt_first_name", type="string", description="Alternative First Name", default="null"),
 *     @SWG\Property(property="alt_last_name", type="string", description="Alternative Last Name", default="null"),
 *     @SWG\Property(property="alt_email_address", type="string", description="Alternative Email Address", default="null"),
 *     @SWG\Property(property="alt_gender", type="string", description="Alternative Gender", default="null"),
 *     @SWG\Property(property="alt_mobile_code", type="string", description="Alternative Mobile Code", default="null"),
 *     @SWG\Property(property="alt_mobile_number", type="string", description="Alternative Mobile Number", default="null"),
 *     @SWG\Property(property="alt_phone_code", type="string", description="Alternative Phone Code", default="null"),
 *     @SWG\Property(property="alt_phone_number", type="string", description="Alternative Phone Number", default="null"),
 *     @SWG\Property(property="alt_position", type="string", description="Alternative Position", default="null"),
 *     @SWG\Property(property="alt_department", type="string", description="Alternative Department", default="null")
 * )
 *
 * @SWG\Definition(
 *     definition="ClientProfileResponse",
 *     required={"id", "credit_balance", "approval_status", "company_name", "street_address_1", "city", "country_id", "postal_code", "rep_first_name", "rep_last_name", "rep_email_address", "rep_gender", "rep_position", "rep_department", "can_delete"},
 *     @SWG\Property(property="id", type="integer", format="int64", description="Client ID", default="2"),
 *     @SWG\Property(property="credit_balance", type="integer", format="int64", description="Credit Balance", default="0"),
 *     @SWG\Property(property="approval_status", type="string", description="Approval Status", default="Approved"),
 *     @SWG\Property(property="approved_at", type="string", description="Date Approved", default="null"),
 *     @SWG\Property(property="disapproved_at", type="string", description="Date Disapproved", default="null"),
 *     @SWG\Property(property="company_name", type="string", description="Company Name", default="ABC"),
 *     @SWG\Property(property="street_address_1", type="string", description="Street Address Line 1", default="Mabolo"),
 *     @SWG\Property(property="street_address_2", type="string", description="Street Address Line 2", default="null"),
 *     @SWG\Property(property="city", type="string", description="City Address", default="Cebu"),
 *     @SWG\Property(property="state", type="string", description="State Address", default="null"),
 *     @SWG\Property(property="country_id", type="integer", format="int64", description="Country Address", default="175"),
 *     @SWG\Property(property="postal_code", type="string", description="Postal Code Address", default="6000"),
 *     @SWG\Property(property="rep_first_name", type="string", description="Representative First Name", default="John"),
 *     @SWG\Property(property="rep_last_name", type="string", description="Representative Last Name", default="Doe"),
 *     @SWG\Property(property="rep_email_address", type="string", description="Representative Email Address", default="contact"),
 *     @SWG\Property(property="rep_gender", type="string", description="Representative Gender", default="Male"),
 *     @SWG\Property(property="rep_mobile_code", type="string", description="Representative Mobile Code", default="null"),
 *     @SWG\Property(property="rep_mobile_number", type="string", description="Representative Mobile Number", default="null"),
 *     @SWG\Property(property="rep_phone_code", type="string", description="Representative Phone Code", default="null"),
 *     @SWG\Property(property="rep_phone_number", type="string", description="Representative Phone Number", default="null"),
 *     @SWG\Property(property="rep_position", type="string", description="Representative Position", default="CEO"),
 *     @SWG\Property(property="rep_department", type="string", description="Representative Department", default="IT"),
 *     @SWG\Property(property="alt_first_name", type="string", description="Alternative First Name", default="null"),
 *     @SWG\Property(property="alt_last_name", type="string", description="Alternative Last Name", default="null"),
 *     @SWG\Property(property="alt_email_address", type="string", description="Alternative Email Address", default="null"),
 *     @SWG\Property(property="alt_gender", type="string", description="Alternative Gender", default="null"),
 *     @SWG\Property(property="alt_mobile_code", type="string", description="Alternative Mobile Code", default="null"),
 *     @SWG\Property(property="alt_mobile_number", type="string", description="Alternative Mobile Number", default="null"),
 *     @SWG\Property(property="alt_phone_code", type="string", description="Alternative Phone Code", default="null"),
 *     @SWG\Property(property="alt_phone_number", type="string", description="Alternative Phone Number", default="null"),
 *     @SWG\Property(property="alt_position", type="string", description="Alternative Position", default="null"),
 *     @SWG\Property(property="alt_department", type="string", description="Alternative Department", default="null"),
 *     @SWG\Property(property="user", description="Client User Data", ref="#/definitions/ClientUserResponse"),
 * )
 *
 * @SWG\Definition(
 *     definition="ClientUserResponse",
 *     required={"id", "username", "email_address", "activated_at", "items_per_page", "timezone", "locked_at"},
 *     @SWG\Property(property="id", type="integer", format="int64", description="Client User ID", default="1"),
 *     @SWG\Property(property="username", type="string", description="Username", default="client0001"),
 *     @SWG\Property(property="email_address", type="string", description="Email", default="client0001-arbitrium@gmail.com"),
 *     @SWG\Property(property="activated_at", type="string", format="date", description="Date account was activated", default="2016-05-12 03:45:47"),
 *     @SWG\Property(property="items_per_page", type="integer", format="int64", description="Number of rows per page in viewing list", default="10"),
 *     @SWG\Property(property="timezone", type="string", description="Timezone", default="Asia/Singapore"),
 *     @SWG\Property(property="locked_at", type="string", format="date", description="Date account was locked", default=""),
 * )
 *
 * @package App\Models
 */
class Client extends NrbModel
{
    use SoftDeletes;

    const PENDING       = 'Pending';
    const APPROVED      = 'Approved';
    const DISAPPROVED   = 'Disapproved';

    protected $table = 'clients';

    protected $dates = ['deleted_at'];

    protected $hidden = ['user_id','created_by','updated_by','created_at','updated_at','deleted_at'];

    protected $fillable = [
        'company_name', 'street_address_1', 'street_address_2', 'city', 'state', 'country_id', 'postal_code',
        'rep_first_name', 'rep_last_name', 'rep_email_address', 'rep_gender',
        'rep_mobile_code', 'rep_mobile_number', 'rep_phone_code', 'rep_phone_number', 'rep_position', 'rep_department',
        'alt_first_name', 'alt_last_name', 'alt_email_address', 'alt_gender',
        'alt_mobile_code', 'alt_mobile_number', 'alt_phone_code', 'alt_phone_number', 'alt_position', 'alt_department',
        'created_by', 'updated_by'
    ];

    protected $appends = ['can_avail_trial'];


    public static function boot()
    {
        parent::boot();

        static::created(function($client){
            $user = $client->user;
            $user->user_type = User::CLIENT;
            $user->name = $client->company_name;
            if (is_admin_user_logged_in())
            {
                $client->approval_status = self::APPROVED;
                $client->approved_at = current_datetime();
                $user->activated_at = current_datetime();
                $client->save();
            }
            $user->save();
            return true;
        });

        static::deleting(function($client){
            $client->user->delete();
            return true;
        });

        static::updating(function($client){
            User::find($client->user_id)->update([
                'name' => $client->company_name
            ]);
        });
    }

    //---------- relationships
    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function subscription()
    {
        return $this->hasOne(ClientSubscription::class)->current()->latest();
    }

    public function latest_subscription()
    {
        return $this->hasOne(ClientSubscription::class)->active()->latest();
    }

    public function pending_subscription()
    {
        return $this->hasOne(ClientSubscription::class)->unfinishedTempSubscription($this->id)->latest();
    }

    public function subscriptions()
    {
        return $this->hasMany(ClientSubscription::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //---------- appends
    public function getCanAvailTrialAttribute()
    {
        return $this->canAvailFreeTrial();
    }

    //---------- scopes
    public function scopeCompanyNameLike($query, $name)
    {
        return $query->like('company_name', $name);
    }

    public function scopeApprovalStatus($query, $status)
    {
        if (!empty($status))
        {
            return $query->where('approval_status', $status);
        }
    }

    public function scopeApprovalStatusNotDisapproved($query)
    {
        return $query->where('approval_status', '<>', self::DISAPPROVED);
    }

    //---------- helpers
    public function approve($callback_url, $approve = true)
    {
        if ($this->isApprovalPending())
        {
            if ($approve)
            {
                $this->approval_status = self::APPROVED;
                $this->approved_at = current_datetime();
                $this->disapproved_at = NULL;
                $this->user->activated_at = current_datetime();
            }
            else
            {
                $this->approval_status = self::DISAPPROVED;
                $this->approved_at = NULL;
                $this->disapproved_at = current_datetime();
                $this->user->activated_at = NULL;
                $this->user->resetTokens(ResetToken::PASSWORD_RESET);
            }
            $this->save();
            $this->user->save();

            with(new MailServices())->approveClient($this->user, $callback_url, $approve);
        }
    }

    public function canDelete()
    {
        // TODO-GEM: make sure client does not have any transactions
        // $can_delete = $this->invoices()->count() == 0 && $this->surveys()->count() == 0;
        $can_delete = $this->invoices()->count() == 0;
        return $can_delete && $this->user->canDelete();
    }

    public function isApproved()
    {
        return $this->approval_status == self::APPROVED;
    }

    public function isApprovalPending()
    {
        return $this->approval_status == self::PENDING;
    }

    public function tempSubscription($subscription, $start_date, $data)
    {
        // Clear existing unfinished temp subscriptions
        $this->clearUnfinishedTempSubscriptions();

        if (!($subscription instanceof Subscription))
        {
            $subscription = Subscription::findOrFail($subscription);
        }

        $client_subscription = new ClientSubscription($subscription->toArray());

        $client_subscription->subscription_id   = $subscription->id;
        $client_subscription->client_id         = $this->id;
        $client_subscription->paypal_token_id   = $data['token'];
        $client_subscription->paypal_approval_url = $data['approval_url'];
        $client_subscription->country_id        = $subscription->country_id;
        $client_subscription->description       = $subscription->description;
        $client_subscription->status            = ClientSubscription::STATUS_INACTIVE;
        $client_subscription->status_end        = null;

        if ($subscription->isTrial())
        {
            if (!$this->canAvailFreeTrial())
            {
                return false;
            }

            // if has existing subscription, change status to upgraded
            if ($this->latest_subscription)
            {
                $this->latest_subscription->upgrade();
            }

            $data['term']           = null;
            $data['is_auto_renew']  = false;

            $client_subscription->status        = ClientSubscription::STATUS_ACTIVE;
            $client_subscription->setValidity($start_date);
        }

        $client_subscription->paypal_plan_id    = $data['paypal_plan_id'];
        $client_subscription->term              = $data['term'];
        $client_subscription->is_auto_renew     = $data['is_auto_renew'];

        $client_subscription->save();

        return $client_subscription;
    }

    public function finalizeSubscription($client_subscription, $start_date)
    {
        if (!($client_subscription instanceof ClientSubscription))
        {
            $client_subscription = ClientSubscription::findOrFail($client_subscription);
        }

        $client_subscription->status = ClientSubscription::STATUS_ACTIVE;
        $client_subscription->setValidity($start_date, $client_subscription->term);
        $client_subscription->save();

        return $client_subscription;
    }

    public function canAvailFreeTrial($client_id = null)
    {
        $client_id = ($client_id) ? $client_id : $this->id;

        $trial_count = ClientSubscription::clientId($client_id)->type(ClientSubscription::TYPE_TRIAL)->count();

        // Once a free trial is used, even if its valid_to is not yet due,
        // the user can no longer avail another trial subscription
        if ($trial_count)
        {
            return false;
        }

        return true;
    }

    public function hasUnfinishedTempSubscriptions($client_id = null)
    {
        $client_id = ($client_id) ? $client_id : $this->id;

        $unfinished_temp_subscriptions = ClientSubscription::unfinishedTempSubscription($client_id)->count();

        if ($unfinished_temp_subscriptions)
        {
            return true;
        }

        return false;
    }

    public function clearUnfinishedTempSubscriptions($client_id = null)
    {
        $client_id = ($client_id) ? $client_id : $this->id;

        $unfinished_temp_subscriptions= $this->hasUnfinishedTempSubscriptions();

        if ($unfinished_temp_subscriptions)
        {
            ClientSubscription::unfinishedTempSubscription($client_id)->delete();
        }
    }

    public function sendApprovalLink($pending_subscription)
    {
        with(new MailServices())->subscriptionChangeConfirmation($this->user, $pending_subscription);
    }
}
