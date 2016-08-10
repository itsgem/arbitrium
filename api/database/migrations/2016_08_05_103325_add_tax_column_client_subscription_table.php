<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTaxColumnClientSubscriptionTable extends Migration
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
            $table->integer('fee_monthly_tax')->nullable()->after('fee_monthly_maintenance');
            $table->integer('fee_yearly_tax')->nullable()->after('fee_yearly_maintenance');
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
            $table->dropColumn('fee_monthly_tax');
            $table->dropColumn('fee_yearly_tax');
        });
    }
}
