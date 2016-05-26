<?php

namespace App\Models;

class ClientSubscription extends Subscription
{
    const TERM_MONTHLY         = 'Monthly';
    const TERM_ANNUALLY        = 'Annually';

    const TYPE_TRIAL           = 'Trial';
    const TYPE_PLAN            = 'Plan';

    const STATUS_ACTIVE        = 'Active';
    const STATUS_INACTIVE      = 'Inactive';

    const STATUS_END_CANCELLED = 'Cancelled';
    const STATUS_END_UPGRADED  = 'Upgraded';
    const STATUS_END_RENEWED   = 'Renewed';

    protected $table = 'client_subscriptions';

    protected $dates = ['valid_from', 'valid_to'];

    protected $fillable = [
        'paypal_plan_id', 'paypal_agreement_id', 'paypal_token_id', 'paypal_approval_url',
        'name', 'description', 'type', 'country_id',
        'fee_monthly', 'fee_monthly_maintenance', 'fee_yearly', 'fee_yearly_license',
        'fee_yearly_maintenance', 'fee_initial_setup', 'max_api_calls', 'max_decisions', 'discounts',
        'created_by', 'updated_by'
    ];

    protected $appends = ['total', 'currency'];

    //---------- relationships
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }

    //---------- scopes
    public function scopeCurrent($query)
    {
        $date = current_date_to_string();
        return $query->whereRaw("'{$date}' BETWEEN valid_from and valid_to ")
            ->where('status', self::STATUS_ACTIVE);
    }

    public function scopeSubscriptionId($query, $id)
    {
        if ($id)
        {
            return $query->where('subscription_id', $id);
        }
    }

    public function scopeClientId($query, $client_id)
    {
        if ($client_id)
        {
            return $query->where('client_id', $client_id);
        }
    }

    public function scopePaypalPlanId($query, $paypal_plan_id)
    {
        if ($paypal_plan_id)
        {
            return $query->where('paypal_plan_id', $paypal_plan_id);
        }
    }

    public function scopePaypalAgreementId($query, $paypal_agreement_id, $client_id = null)
    {
        if ($paypal_agreement_id)
        {
            return $query->clientId($client_id)
                ->where('paypal_agreement_id', $paypal_agreement_id);
        }
    }

    public function scopePaypalTokenId($query, $paypal_token_id)
    {
        if ($paypal_token_id)
        {
            return $query->where('paypal_token_id', $paypal_token_id);
        }
    }

    public function scopeName($query, $name)
    {
        if ($name)
        {
            return $query->like('name', $name);
        }
    }

    public function scopeType($query, $type)
    {
        if ($type)
        {
            return $query->where('type', $type);
        }
    }

    public function scopeStatus($query, $status)
    {
        if ($status)
        {
            return $query->where('status', $status);
        }
    }

    public function scopeActive($query, $is_active = self::STATUS_ACTIVE)
    {
        return $query->where('status', $is_active);
    }

    public function scopeUnfinishedTempSubscription($query, $client_id = null)
    {
        return $query->clientId($client_id)
            ->where('status', self::STATUS_INACTIVE)
            ->where('status_end', null)
            ->where('valid_from', null)
            ->where('valid_to', null);
    }

    public function scopeIsAutoRenew($query, $flag = false)
    {
        if ($flag != null)
        {
            return $query->where('is_auto_renew', (int) $flag);
        }
    }

    public function scopeCompanyName($query, $company_name)
    {
        if ($company_name)
        {
            return $query->whereHas('client', function($query) use ($company_name){
                $query->like('company_name', $company_name);
            });
        }
    }

    public function scopeValidFrom($query, $date)
    {
        if ($date)
        {
            return $query->where('valid_from', $date);
        }
    }

    public function scopeValidTo($query, $date)
    {
        if ($date)
        {
            return $query->where('valid_to', $date);
        }
    }

    //---------- helpers
    public function cancel()
    {
        $this->status = self::STATUS_INACTIVE;
        $this->status_end = self::STATUS_END_CANCELLED;
        $this->save();
    }

    public function renew()
    {
        $this->status = self::STATUS_INACTIVE;
        $this->status_end = self::STATUS_END_RENEWED;
        $this->save();
    }

    public function upgrade()
    {
        $this->status = self::STATUS_INACTIVE;
        $this->status_end = self::STATUS_END_UPGRADED;
        $this->save();
    }

    public function generateInvoice()
    {
        $invoice = Invoice::subtractCredit([
            'category'      => Invoice::PURCHASE_SUBSCRIPTION,
            'client_id'     => $this->client_id,
            'name'          => $this->name.
                                ' <'.
                                convert_to_string($this->valid_from, 'F j').
                                ' - '.
                                convert_to_string($this->valid_to, 'F j, Y').
                                '> ',
            'description'   => '-',
            'total_amount_in_credit' => $this->price_in_credit,
        ]);

        if ($invoice)
        {
            $this->invoice_id = $invoice->id;
        }
    }

    public function setValidity($date, $term = '')
    {
        $this->valid_from = $date;

        if ($term == self::TERM_ANNUALLY)
        {
            $this->valid_to = $this->valid_from->addDays(364);
        }
        else
        {
            // Monthly and Trial
            $this->valid_to = $this->valid_from->addDays(29);
        }
    }

    public function hasPaypal()
    {
        return $this->paypal_plan_id && $this->paypal_agreement_id;
    }
}
