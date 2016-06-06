<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Client;
use App\Models\InvoiceDetail;
use App\Nrb\NrbModel;
use App\Services\FileServices;
use App\Services\MailServices;
use App\User;

class Invoice extends NrbModel
{
    const CANCELLED = 'Cancelled';
    const PAID      = 'Paid';
    const UNPAID    = 'Unpaid';

    use SoftDeletes;

    protected $table = 'invoices';

    protected $hidden = ['created_by', 'updated_by', 'created_at', 'updated_at', 'deleted_at'];

    protected $dates = ['invoiced_at', 'paid_at'];

    protected $fillable = [
        'client_id', 'total_amount', 'description',
        'created_by', 'updated_by'
    ];

    public static function boot()
    {
        parent::boot();

        static::created(function($invoice)
        {
            $client = Client::findOrFail($invoice->client_id);
            $invoice->user_id           = $client->user_id;
            $invoice->company_name      = $client->company_name;
            $invoice->rep_first_name    = $client->rep_first_name;
            $invoice->rep_last_name     = $client->rep_last_name;
            $invoice->street_address_1  = $client->street_address_1;
            $invoice->street_address_2  = $client->street_address_2;
            $invoice->city          = $client->city;
            $invoice->state         = $client->state;
            $invoice->country       = $client->country->name;
            $invoice->postal_code   = $client->postal_code;
            $invoice->invoiced_at   = current_datetime();
            $invoice->invoice_no    = $invoice->generateInvoiceNo();
            $invoice->po_no         = $invoice->generatePoNo();
            $invoice->paid_at       = ($invoice->isPaid() ? current_datetime() : NULL);
            $invoice->save();
            return true;
        });

        static::deleting(function($invoice)
        {
            $invoice->invoice_details()->delete();
            return true;
        });
    }

    //---------- relationships
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function invoice_details()
    {
        return $this->hasMany(InvoiceDetail::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //---------- scopes
    public function scopeClientNameLike($query, $name)
    {
        if (!empty($name))
        {
            return $query->where(function($query) use ($name)
            {
                return $query->like('rep_first_name', $name)
                             ->orLike('rep_last_name', $name);
            });
        }
    }

    public function scopeClientId($query, $client_id)
    {
        if ($client_id)
        {
            return $query->where('client_id', $client_id);
        }
    }

    public function scopeCompanyNameLike($query, $name)
    {
        return $query->like('company_name', $name);
    }

    public function scopeInvoiceDateFrom($query, $from)
    {
        return $query->dateFrom('invoiced_at', $from, true);
    }

    public function scopeInvoiceDateTo($query, $to)
    {
        return $query->dateTo('invoiced_at', $to, true);
    }

    public function scopeInvoiceNoLike($query, $invoice_no)
    {
        return $query->like('invoice_no', $invoice_no);
    }

    public function scopePoNoLike($query, $po_no)
    {
        return $query->like('po_no', $po_no);
    }

    public function scopeStatus($query, $status)
    {
        if ($status)
        {
            return $query->where('status', $status);
        }
    }

    //---------- helpers
    public function cancel()
    {
        $this->status = self::CANCELLED;
        $this->save();
    }

    public function paid()
    {
        if (!$this->isPaid())
        {
            $this->status = self::PAID;
            $this->load('user', 'invoice_details');
            $this->url = with(new FileServices())->generateInvoicePDF($this);
            $this->save();
        }
    }

    public static function generate($data, $invoice_details = [])
    {
        $invoice = new Invoice($data);
        $invoice->save();

        if ($invoice_details)
        {
            $invoice->invoice_details()->saveMany($invoice_details);
        }
        else
        {
            $invoice->invoice_details()->save(new InvoiceDetail([
                'name'   => $data['name'],
                'amount' => $invoice->total_amount,
            ]));
        }
        $invoice->paid();

        return $invoice;
    }

    public function generateInvoiceNo()
    {
        return str_pad($this->id, 10, '0', STR_PAD_LEFT);
    }

    public function generatePoNo()
    {
        $post_fix = generate_code(6);
        return current_datetime()->year.'-'.str_pad($this->client_id, 6, '0', STR_PAD_LEFT).'-'.str_pad($post_fix, 6, '0', STR_PAD_LEFT);
    }

    public static function getStatusList()
    {
        return self::getListFromArray([
            self::CANCELLED,
            self::PAID,
            self::UNPAID
        ]);
    }

    public function isPaid()
    {
        return $this->status == self::PAID;
    }
}
