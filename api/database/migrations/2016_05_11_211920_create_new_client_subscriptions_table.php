<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewClientSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");
        Schema::dropIfExists('client_subscriptions');
        DB::statement("SET FOREIGN_KEY_CHECKS = 1");

        DB::statement('CREATE TABLE client_subscriptions LIKE subscriptions');
        Schema::table('client_subscriptions', function(Blueprint $table)
        {
            $table->integer('client_id')->unsigned()->nullable()->after('id');
            $table->integer('subscription_id')->unsigned()->nullable()->after('client_id');
            $table->integer('invoice_id')->unsigned()->nullable()->after('subscription_id');
            $table->enum('term', ['Monthly', 'Annually'])->nullable()->after('invoice_id');
            $table->date('valid_from')->nullable()->after('term');
            $table->date('valid_to')->nullable()->after('valid_from');
            $table->boolean('is_auto_renew')->default(true)->nullable()->after('valid_to');
            $table->enum('status', ['Active', 'Inactive'])->nullable()->after('is_auto_renew');
            $table->enum('status_end', ['Cancelled', 'Upgraded', 'Renewed'])->nullable()->after('status');

            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreign('invoice_id')->references('id')->on('invoices')->onDelete('cascade');
            $table->foreign('subscription_id')->references('id')->on('subscriptions')->onDelete('cascade');
            $table->foreign('country_id')->references('id')->on('countries')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');

            $table->index('term', 'idx_term');
            $table->index(['valid_from', 'valid_to'], 'idx_validity');
            $table->index('valid_from', 'idx_valid_from');
            $table->index('valid_to', 'idx_valid_to');
            $table->index('is_auto_renew', 'idx_is_auto_renew');
            $table->index('status', 'idx_status');
            $table->index('status_end', 'idx_status_end');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('client_subscriptions');
    }
}
