<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use App\Nrb\NrbModel;
use App\Services\MailServices;
use App\User;

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
        $can_delete = $this->invoices()->count() == 0 && $this->surveys()->count() == 0;
        return $can_delete && $this->user->canDelete();
    }

    public function canPurchaseSubscription($subscription)
    {
        $can_purchase = false;

        if ($subscription instanceof Subscription && $subscription->price_in_credit == 0)
        {
            $can_purchase = true;
        }

        if ($this->credit_balance > 0)
        {
            if (!($subscription instanceof Subscription))
            {
                $subscription = Subscription::findOrFail($subscription);
            }
            if ($this->credit_balance >= $subscription->price_in_credit)
            {
                $can_purchase = true;
            }
        }
        return $can_purchase;
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
        if ($this->canPurchaseSubscription($subscription))
        {
            $client_subscription = new ClientSubscription($subscription->toArray());
            $client_subscription->subscription_id   = $subscription->id;
            $client_subscription->client_id         = $this->id;
            $client_subscription->setValidity($start_date);
            if ($subscription->price_in_credit > 0)
            {
                $client_subscription->generateInvoice();
            }
            $client_subscription->save();
        }
        return $client_subscription;
    }
}
