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
            $table->string('description')->nullable()->after('name');
        });

        Schema::table('client_subscriptions', function(Blueprint $table)
        {
            $table->text('paypal_plan_id')->nullable()->after('invoice_id');
            $table->text('paypal_agreement_id')->nullable()->after('paypal_plan_id');
            $table->text('paypal_token_id')->nullable()->after('paypal_agreement_id');
            $table->text('paypal_approval_url')->nullable()->after('paypal_token_id');
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
            $table->dropColumn('description');
        });

        Schema::table('client_subscriptions', function(Blueprint $table)
        {
            $table->dropColumn('paypal_plan_id');
            $table->dropColumn('paypal_agreement_id');
            $table->dropColumn('paypal_token_id');
            $table->dropColumn('paypal_approval_url');
            $table->dropColumn('description');
        });
    }
}
