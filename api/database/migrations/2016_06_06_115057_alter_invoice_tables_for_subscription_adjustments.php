<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterInvoiceTablesForSubscriptionAdjustments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('invoices', function(Blueprint $table)
        {
            $table->decimal('discounts', 15, 2)->default(0.00)->nullable()->after('client_id');
            $table->string('url')->after('postal_code')->nullable();
        });

        Schema::table('invoice_details', function (Blueprint $table)
        {
            $table->renameColumn('product_name','name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('invoices', function(Blueprint $table)
        {
            $table->dropColumn('discounts');
            $table->dropColumn('url');
        });

        Schema::table('invoice_details', function (Blueprint $table)
        {
            $table->renameColumn('name','product_name');
        });
    }
}
