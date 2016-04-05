<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('user_id')->unsigned();

            $table->integer('credit_balance')->default(0)->nullable();
            $table->enum('approval_status', ['Pending', 'Approved', 'Disapproved'])->default('Pending')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('disapproved_at')->nullable();

            $table->string('company_name')->nullable();
            $table->string('street_address_1')->nullable();
            $table->string('street_address_2')->nullable();
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->integer('country_id')->unsigned()->nullable();
            $table->string('postal_code', 10)->nullable();

            $table->string('rep_first_name', 64)->nullable();
            $table->string('rep_last_name', 64)->nullable();
            $table->string('rep_email_address')->nullable();
            $table->enum(  'rep_gender', ['Male', 'Female'])->nullable();
            $table->string('rep_mobile_code', 10)->nullable();
            $table->string('rep_mobile_number', 20)->nullable();
            $table->string('rep_phone_code', 10)->nullable();
            $table->string('rep_phone_number', 20)->nullable();
            $table->string('rep_position', 100)->nullable();
            $table->string('rep_department', 100)->nullable();

            $table->string('alt_first_name', 64)->nullable();
            $table->string('alt_last_name', 64)->nullable();
            $table->string('alt_email_address')->nullable();
            $table->enum(  'alt_gender', ['Male', 'Female'])->nullable();
            $table->string('alt_mobile_code', 10)->nullable();
            $table->string('alt_mobile_number', 20)->nullable();
            $table->string('alt_phone_code', 10)->nullable();
            $table->string('alt_phone_number', 20)->nullable();
            $table->string('alt_position', 100)->nullable();
            $table->string('alt_department', 100)->nullable();

            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes()->nullable();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('country_id')->references('id')->on('countries')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');
            $table->index('company_name', 'idx_name');
            $table->index('approval_status', 'idx_approval_status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('clients');
    }
}
