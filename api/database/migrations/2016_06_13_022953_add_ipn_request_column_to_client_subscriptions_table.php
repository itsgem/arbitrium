<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIpnRequestColumnToClientSubscriptionsTable extends Migration
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
            $table->text('paypal_transaction_id')->nullable()->after('paypal_approval_url');
            $table->text('paypal_ipn_response')->nullable()->after('paypal_transaction_id');
            $table->boolean('is_email_reminder_sent')->default(false)->nullable()->after('is_auto_renew');

            $table->index('is_email_reminder_sent', 'idx_is_email_reminder_sent');
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
            $table->dropColumn('paypal_transaction_id');
            $table->dropColumn('paypal_ipn_response');
            $table->dropColumn('is_email_reminder_sent');
        });
    }
}
