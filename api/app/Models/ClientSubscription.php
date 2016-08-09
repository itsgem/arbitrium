<?php

namespace App\Models;

class ClientSubscription extends Subscription
{
    const TERM_DAILY           = 'Daily';
    const TERM_MONTHLY         = 'Monthly';
    const TERM_ANNUALLY        = 'Annually';
    const TERM_DAY             = '1 Day';
    const TERM_MONTH           = '1 Month';
    const TERM_ANNUAL          = '1 Year';

    const TYPE_TRIAL           = 'Trial';
    const TYPE_PLAN            = 'Plan';

    const STATUS_ACTIVE        = 'Active';
    const STATUS_INACTIVE      = 'Inactive';

    const STATUS_END_CANCELLED = 'Cancelled';
    const STATUS_END_UPGRADED  = 'Upgraded';
    const STATUS_END_RENEWED   = 'Renewed';
    const STATUS_END_EXPIRED   = 'Expired';

    const PAYPAL_STATE_ACTIVE     = 'Active';
    const PAYPAL_STATE_PENDING    = 'Pending';
    const PAYPAL_STATE_EXPIRED    = 'Expired';
    const PAYPAL_STATE_SUSPENDED  = 'Suspended';
    const PAYPAL_STATE_REACTIVATE = 'Reactivate';
    const PAYPAL_STATE_CANCEL     = 'Canceled';
    const PAYPAL_STATE_COMPLETED  = 'Completed';

    const PAYPAL_TRANSACTION_TYPE_SUBSCRIPTION_PAYMENT = 'recurring_payment';

    protected $table = 'client_subscriptions';

    protected $dates = ['valid_from', 'valid_to', 'cancelled_at'];

    protected $fillable = [
        'fee_monthly_tax', 'fee_yearly_tax', 'is_unli', 'no_days', 'paypal_payer_id', 'paypal_plan_id', 'paypal_agreement_id', 'paypal_token_id', 'paypal_approval_url',
        'paypal_transaction_id', 'paypal_ipn_response', 'name', 'description', 'type', 'country_id',
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

    //---------- mutators

    public function getPaypalIpnResponseAttribute($value)
    {
        return json_decode($value);
    }

    //---------- scopes
    public function scopeCurrent($query)
    {
        $date = current_date_to_string();
        return $query->whereRaw("'{$date}' BETWEEN valid_from and valid_to ")
            ->status(self::STATUS_ACTIVE);
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
        return $query->status($is_active);
    }

    public function scopeUnfinishedTempSubscription($query, $client_id = null)
    {
        return $query->clientId($client_id)
            ->status(self::STATUS_INACTIVE)
            ->whereNull('status_end')
            ->whereNull('valid_from')
            ->whereNull('valid_to')
            ->whereDate('created_at', '>', current_datetime()->subDay()->toDateTimeString());
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

    public function scopeIsEmailReminderSent($query, $sent = true)
    {
        return $query->where('is_email_reminder_sent', $sent);
    }

    //---------- helpers
    public function cancel()
    {
        $this->status = self::STATUS_INACTIVE;
        $this->status_end = self::STATUS_END_CANCELLED;
        $this->cancelled_at = current_datetime();
        $this->save();

        if ($this->invoice)
        {
            $this->invoice->cancel();
        }
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

    public function expire()
    {
        $this->status = self::STATUS_INACTIVE;
        $this->status_end = self::STATUS_END_EXPIRED;
        $this->save();
    }

    public function isCancelled()
    {
        return $this->status == self::STATUS_INACTIVE && $this->status_end == self::STATUS_END_CANCELLED;
    }

    public function isRenewed()
    {
        return $this->status == self::STATUS_INACTIVE && $this->status_end == self::STATUS_END_RENEWED;
    }

    public function isUpgraded()
    {
        return $this->status == self::STATUS_INACTIVE && $this->status_end == self::STATUS_END_UPGRADED;
    }

    public function isExpired()
    {
        return $this->status == self::STATUS_INACTIVE && $this->status_end == self::STATUS_END_EXPIRED;
    }

    public function isRecurring()
    {
        return (boolean) $this->is_auto_renew;
    }

    public function generateInvoice()
    {
        $subscription_fees = $this->getFees($this->term);
        $invoice_details = [];
        foreach ($subscription_fees as $fees)
        {
            $invoice_details[] = new InvoiceDetail($fees);
        }

        $invoice = Invoice::generate([
            'client_id'    => $this->client_id,
            'name'         => $this->name.
                                ' <'.
                                convert_to_string($this->valid_from, 'F j').
                                ' - '.
                                convert_to_string($this->valid_to, 'F j, Y').
                                '> ',
            'description'  => $this->description,
            'discounts'    => $this->discounts,
            'total_amount' => $this->calculateTotal($this->term.'_With_Setup'),
            'payment_method' => Invoice::PAYMENT_METHOD_PAYPAL,
        ], $invoice_details);

        if ($invoice)
        {
            $this->invoice_id = $invoice->id;
        }
    }

    public function getSubscriptionName()
    {
        $name = $this->name;

        if ($this->term)
        {
            $term = $this->term;

            if (!$this->is_auto_renew)
            {
                if ($term == self::TERM_ANNUALLY)
                {
                    $term = self::TERM_ANNUAL;
                }
                else
                {
                    $term = self::TERM_MONTH;
                }

                if (env('APP_DEBUG') && $this->term == self::TERM_DAILY)
                {
                    $term = self::TERM_DAY;
                }
            }

            $name .= ' ('.$term.')';
        }

        return $name;
    }

    public function getSubscriptionValidity()
    {
        if ($this->valid_from && $this->valid_to)
        {
            return $this->valid_from->toDateString().' to '.$this->valid_to->toDateString();
        }
    }

    public function setValidity($date, $term = '')
    {
        $this->valid_from = $date;

        if ($term == self::TERM_ANNUALLY)
        {
            $this->valid_to = $this->valid_from->addDays(config('paypal.period_days.annually'));
        }
        else
        {
            // Monthly and Trial
            $this->valid_to = $this->valid_from->addDays(config('paypal.period_days.monthly'));
        }

        if (env('APP_DEBUG') && $term == self::TERM_DAILY)
        {
            $this->valid_to = $this->valid_from->addDay();
        }
    }

    public function setValidityRange($date, $days = '')
    {
        $this->valid_from = $date;
        if ($days)
        {
            $this->valid_to = $this->valid_from->addDay($days);
        }
        else
        {
            $this->valid_to = $this->valid_from->addDays(config('paypal.period_days.monthly'));
        }
    }

    public function hasPaypal()
    {
        return $this->paypal_token_id && $this->paypal_agreement_id;
    }

    public function hasAlreadyConfirmed()
    {
        return !is_null($this->paypal_agreement_id);
    }

    public function isOwnedByClientId($client_id)
    {
        if ($client_id)
        {
            return $this->client_id == $client_id;
        }

        return false;
    }

    public function isFirstSubscription()
    {
        if (ClientSubscription::clientId($this->client_id)->count() == 1)
        {
            return true;
        }

        return false;
    }

    public function getAction()
    {
        if ($this->isFirstSubscription())
        {
            return [
                'noun' => 'registration',
                'past' => 'registered',
            ];
        }

        return [
            'noun' => 'change',
            'past' => 'changed',
        ];
    }

    public static function getTerms()
    {
        $data = [
            self::TERM_ANNUALLY,
            self::TERM_MONTHLY,
        ];

        if (env('APP_DEBUG'))
        {
            $data[] = self::TERM_DAILY;
        }

        return $data;
    }
}
