<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientSubscriptions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reset_tokens', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('user_id')->unsigned();

            $table->string('password_reset_code')->nullable();
            $table->string('password_reset_token')->nullable();
            $table->timestamp('password_reset_expiry')->nullable();

            $table->string('new_email_address_code')->nullable();
            $table->string('new_email_address_token')->nullable();
            $table->timestamp('new_email_address_expiry')->nullable();

            $table->string('verification_code')->nullable();
            $table->string('verification_token')->nullable();
            $table->timestamp('verification_expiry')->nullable();

            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->softDeletes()->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');

            $table->index(['password_reset_code', 'password_reset_token'], 'idx_password_reset_token');
            $table->index(['new_email_address_code', 'new_email_address_token'], 'idx_new_email_token');
            $table->index(['verification_code', 'verification_token'], 'idx_verification_token');
        });

        DB::statement('CREATE TABLE client_subscriptions LIKE subscriptions');
        Schema::table('client_subscriptions', function(Blueprint $table)
        {
            $table->integer('client_id')->unsigned()->nullable()->after('id');
            $table->integer('subscription_id')->unsigned()->nullable()->after('client_id');
            $table->integer('invoice_id')->unsigned()->nullable()->after('subscription_id');
            $table->date('valid_from')->nullable()->after('invoice_id');
            $table->date('valid_to')->nullable()->after('valid_from');
            $table->boolean('renew')->default(true)->nullable()->after('valid_to');
            $table->boolean('email_reminder_sent')->default(false)->nullable()->after('renew');

            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreign('invoice_id')->references('id')->on('invoices')->onDelete('cascade');
            $table->foreign('subscription_id')->references('id')->on('subscriptions')->onDelete('cascade');

            $table->index(['valid_from', 'valid_to'], 'idx_validity');
            $table->index('valid_from', 'idx_valid_from');
            $table->index('valid_to', 'idx_valid_to');
            $table->index('email_reminder_sent', 'idx_email_reminder_sent');
            $table->index('renew', 'idx_renew');
        });

        Schema::table('invoices', function(Blueprint $table)
        {
            $table->integer('balance_in_credit')->nullable()->after('total_amount');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('reset_tokens');

        Schema::drop('client_subscriptions');

        Schema::table('invoices', function(Blueprint $table)
        {
            $table->dropColumn('balance_in_credit');
        });
    }
}
