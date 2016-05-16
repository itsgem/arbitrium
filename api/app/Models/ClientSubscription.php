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
    public function scopeClientId($query, $client_id)
    {
        if ($client_id)
        {
            return $query->where('client_id', $client_id);
        }
    }

    public function scopeType($query, $type)
    {
        if ($type)
        {
            return $query->where('type', $type);
        }
    }

    public function scopeCurrent($query)
    {
        $date = current_date_to_string();
        return $query->whereRaw("'{$date}' BETWEEN valid_from and valid_to ")
            ->where('status', self::STATUS_ACTIVE);
    }

    public function scopeIsAutoRenew($query, $flag = false)
    {
        if ($flag != null)
        {
            return $query->where('is_auto_renew', (int) $flag);
        }
    }

    public function scopeSubscriptionId($query, $id)
    {
        if ($id)
        {
            return $query->where('subscription_id', $id);
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

    public function canAvailFreeTrial($client_id = null)
    {
        $client_id = ($client_id) ? $client_id : $this->client_id;

        $trial_count = self::clientId($client_id)->type(self::TYPE_TRIAL)->count();

        // Once a free trial is used, even if its valid_from is not yet due or,
        // the user can no longer avail
        if ($trial_count)
        {
            return false;
        }

        return true;
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
        $this->valid_to   = $this->valid_from->addDays(29); // Monthly and Trial

        if ($term == self::TERM_ANNUALLY)
        {
            $this->valid_to = $this->valid_from->addDays(364);
        }
    }
}
