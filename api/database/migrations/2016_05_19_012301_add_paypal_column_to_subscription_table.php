<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPaypalColumnToSubscriptionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('subscriptions', function(Blueprint $table)
        {
            $table->text('paypal_plan_id_monthly')->nullable()->after('id');
            $table->text('paypal_plan_id_yearly')->nullable()->after('paypal_plan_id_monthly');
            $table->string('description')->nullable()->after('name');
        });

        Schema::table('client_subscriptions', function(Blueprint $table)
        {
            $table->text('paypal_plan_id')->nullable()->after('invoice_id');
            $table->text('paypal_payment_id')->nullable()->after('paypal_plan_id');
            $table->text('paypal_payer_id')->nullable()->after('paypal_payment_id');
            $table->text('paypal_profile_id')->nullable()->after('paypal_payer_id');
            $table->string('description')->nullable()->after('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('subscriptions', function(Blueprint $table)
        {
            $table->dropColumn('paypal_plan_id_monthly');
            $table->dropColumn('paypal_plan_id_yearly');
            $table->dropColumn('description');
        });

        Schema::table('client_subscriptions', function(Blueprint $table)
        {
            $table->dropColumn('paypal_plan_id');
            $table->dropColumn('paypal_payment_id');
            $table->dropColumn('paypal_payer_id');
            $table->dropColumn('paypal_profile_id');
            $table->dropColumn('description');
        });
    }
}
