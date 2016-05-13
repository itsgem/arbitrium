<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewInvoiceTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('invoice_details');
        Schema::dropIfExists('invoices');

        Schema::create('invoices', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable();
            $table->integer('client_id')->unsigned()->nullable();

            $table->decimal('total_amount', 15, 2)->default(0.00)->nullable();
            $table->string('invoice_no')->nullable();
            $table->timestamp('invoiced_at')->nullable();
            $table->string('po_no')->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['Unpaid', 'Paid', 'Cancelled'])->default('Unpaid')->nullable();
            $table->string('payment_method')->nullable();
            $table->timestamp('paid_at')->nullable();

            $table->string('company_name')->nullable();
            $table->string('rep_first_name', 64)->nullable();
            $table->string('rep_last_name', 64)->nullable();
            $table->string('street_address_1')->nullable();
            $table->string('street_address_2')->nullable();
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('country')->nullable();
            $table->string('postal_code', 10)->nullable();

            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes()->nullable();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');

            $table->index(['rep_first_name', 'rep_last_name'], 'idx_client_name');
            $table->index('rep_first_name', 'idx_client_first_name');
            $table->index('rep_last_name', 'idx_client_last_name');
            $table->index('invoice_no', 'idx_invoice_no');
            $table->index('po_no', 'idx_po_no');
        });

        Schema::create('invoice_details', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('invoice_id')->unsigned();

            $table->string('product_name')->nullable();
            $table->decimal('amount', 15, 2)->default(0.00)->nullable();

            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes()->nullable();

            $table->foreign('invoice_id')->references('id')->on('invoices')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('invoice_details');
        Schema::drop('invoices');
    }
}
