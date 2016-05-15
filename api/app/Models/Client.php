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
 *     @SWG\Property(property="can_delete", type="string", description="Can user delete", default="false")
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

    public function last_subscription()
    {
        return $this->hasOne(ClientSubscription::class)->latest();
    }

    public function subscriptions()
    {
        return $this->hasMany(ClientSubscription::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
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

    public function purchaseSubscription($subscription, $start_date)
    {
        $client_subscription = NULL;
        if (!($subscription instanceof Subscription))
        {
            $subscription = Subscription::findOrFail($subscription);
        }

        $client_id = $this->id;

        $client_subscription = new ClientSubscription($subscription->toArray());

        if ($subscription->type == Subscription::TYPE_TRIAL && !$client_subscription->canAvailFreeTrial($client_id))
        {
            return false;
        }

        $client_subscription->subscription_id   = $subscription->id;
        $client_subscription->client_id         = $client_id;
        $client_subscription->setValidity($start_date);
        $client_subscription->save();

        return $client_subscription;
    }
}
