<?php

namespace App\Models;

class ClientSubscription extends Subscription
{
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

    //---------- mutators

    //---------- scopes
    public function scopeClientId($query, $client_id)
    {
        if ($client_id)
        {
            return $query->where('client_id', $client_id);
        }
    }

    public function scopeCurrent($query)
    {
        $date = current_date_to_string();
        return $query->whereRaw("'{$date}' BETWEEN valid_from and valid_to ");
    }

    public function scopeEmailReminderSent($query, $sent = true)
    {
        return $query->where('email_reminder_sent', $sent);
    }

    public function scopeRenew($query)
    {
        return $query->where('renew', true);
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
        $this->renew = 0;
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

    public function setValidity($date)
    {
        // TODO-GEM: validity range
        $this->valid_from   = $date;
        $this->valid_to     = $this->valid_from->addDays(29);
    }
}
