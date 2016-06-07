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
        'invoice_id', 'name', 'amount',
        'created_by', 'updated_by'
    ];

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
