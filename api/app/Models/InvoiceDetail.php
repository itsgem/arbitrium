<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Invoice;
use App\Nrb\NrbModel;

class InvoiceDetail extends NrbModel
{
    use SoftDeletes;

    protected $table = 'invoice_details';

    protected $hidden = ['created_by', 'updated_by', 'created_at', 'updated_at', 'deleted_at'];

    protected $dates = [];

    protected $fillable = [
        'invoice_id', 'product_name',
        'amount_in_credit', 'price_per_credit',
        'created_by', 'updated_by'
    ];

    public static function boot()
    {
        parent::boot();

        static::created(function($detail)
        {
            $detail->amount = $detail->price_per_credit * $detail->amount_in_credit;
            $detail->save();
            return true;
        });
    }

    //---------- relationships
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    //---------- mutators

    //---------- scopes
    public function scopeInvoiceId($query, $id)
    {
        if (isset($id))
        {
            return $query->where('invoice_id', $id);
        }
    }

    //---------- helpers

}
