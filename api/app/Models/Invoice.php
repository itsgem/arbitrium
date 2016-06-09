<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Client;
use App\Models\InvoiceDetail;
use App\Nrb\NrbModel;
use App\Services\FileServices;
use App\Services\MailServices;
use App\User;

/**
 * Class Invoice
 *
 * @SWG\Definition(
 *     definition="InvoiceResponse",
 *     required={"id", "user_id", "client_id", "discounts", "total_amount", "invoice_no", "invoiced_at", "po_no", "description", "status", "payment_method", "paid_at", "company_name", "rep_first_name", "rep_last_name", "street_address_1", "street_address_2", "city", "state", "country", "postal_code", "url"},
 *     @SWG\Property(property="id", type="integer", format="int64", description="Invoice ID", default="2"),
 *     @SWG\Property(property="user_id", type="integer", format="int64", description="User ID", default="1"),
 *     @SWG\Property(property="client_id", type="integer", format="int64", description="Client ID", default="1"),
 *     @SWG\Property(property="discounts", type="integer", description="Discounted Amount", default="7.00"),
 *     @SWG\Property(property="total_amount", type="integer", description="Total Amount", default="180.00"),
 *     @SWG\Property(property="invoice_no", type="string", description="Invoice number", default="00000009"),
 *     @SWG\Property(property="invoiced_at", type="string", description="Date invoiced", default="2016-06-07 02:51:12"),
 *     @SWG\Property(property="po_no", type="string", description="Invoice PO Number", default="2016-999000007-384778"),
 *     @SWG\Property(property="description", type="string", description="Invoice description", default="Basic Package Plan"),
 *     @SWG\Property(property="status", type="string", description="Invoice status (Unpaid|Paid|Cancelled)", default="Paid"),
 *     @SWG\Property(property="payment_method", type="string", description="Payment method (Paypal)", default="Paypal"),
 *     @SWG\Property(property="paid_at", type="string", description="Date paid", default="2016-06-07 02:51:12"),
 *     @SWG\Property(property="company_name", type="string", description="Company Name", default="XYZ Company"),
 *     @SWG\Property(property="rep_first_name", type="string", description="Representative First Name", default="John"),
 *     @SWG\Property(property="rep_last_name", type="string", description="Representative Last Name", default="Doe"),
 *     @SWG\Property(property="street_address_1", type="string", description="Company street address 1", default="Apple St."),
 *     @SWG\Property(property="street_address_2", type="string", description="Company street address 2", default="Orange County"),
 *     @SWG\Property(property="city", type="string", description="Company city", default="New York"),
 *     @SWG\Property(property="state", type="string", description="Company state", default="NY"),
 *     @SWG\Property(property="country", type="string", description="Company country", default="USA"),
 *     @SWG\Property(property="postal_code", type="string", description="Company postal code", default="92013"),
 *     @SWG\Property(property="url", type="string", description="Representative Position", default="http://arbitrium-api.dev/invoices/00000009.pdf"),
 *     @SWG\Property(property="invoice_details", type="array", description="Optional: Invoice Details (For)", items=@SWG\Property(ref="#/definitions/InvoiceDetailResponse")),
 *     @SWG\Property(property="system_settings", description="Optional: System Settings",
 *         @SWG\Property(property="<setting_1>", type="string", description="setting_1 value", default="<setting_1_value>"),
 *         @SWG\Property(property="<setting_2>", type="string", description="setting_2 value", default="<setting_2_value>"),
 *         @SWG\Property(property="<setting_3>", type="string", description="setting_3 value", default="<setting_3_value>"),
 *     ),
 * )
 *
 * @SWG\Definition(
 *     definition="InvoiceDetailResponse",
 *     required={"id", "invoice_id", "name", "amount"},
 *     @SWG\Property(property="id", type="integer", format="int64", description="Invoice Detail ID", default="1"),
 *     @SWG\Property(property="invoice_id", type="integer", format="int64", description="Invoice ID", default="1"),
 *     @SWG\Property(property="name", type="string", description="Product/Service Name", default="Monthly Fee"),
 *     @SWG\Property(property="amount", type="integer", description="Amount", default="140.00"),
 * )
 *
 * @package App\Models
 */
class Invoice extends NrbModel
{
    const CANCELLED = 'Cancelled';
    const PAID      = 'Paid';
    const UNPAID    = 'Unpaid';

    const PAYMENT_METHOD_PAYPAL = 'Paypal';

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

    //---------- mutators

    public function getUrlAttribute($value)
    {
        $value = config('arbitrium.invoice.url').basename($value);
        return url($value);
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
            $this->paid_at = current_datetime();
            $this->load('user', 'invoice_details');
            $this->url = with(new FileServices())->setStoragePath(config('arbitrium.invoice.path'))->generateInvoicePDF($this);
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

    public function sendInvoice()
    {
        if ($this->isPaid())
        {
            with(new MailServices())->sendInvoice($this->user, $this->url);

            return true;
        }

        return false;
    }
}
