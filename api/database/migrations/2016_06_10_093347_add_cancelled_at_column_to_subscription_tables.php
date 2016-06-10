<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCancelledAtColumnToSubscriptionTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('client_subscriptions', function(Blueprint $table)
        {
            $table->timestamp('cancelled_at')->nullable()->after('status_end');
        });
        Schema::table('invoices', function(Blueprint $table)
        {
            $table->timestamp('cancelled_at')->nullable()->after('paid_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('client_subscriptions', function(Blueprint $table)
        {
            $table->dropColumn('cancelled_at');
        });
        Schema::table('invoices', function(Blueprint $table)
        {
            $table->dropColumn('cancelled_at');
        });
    }
}
