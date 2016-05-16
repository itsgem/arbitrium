<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");
        Schema::dropIfExists('subscriptions');
        DB::statement("SET FOREIGN_KEY_CHECKS = 1");

        Schema::create('subscriptions', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->enum('type', ['Trial', 'Plan'])->nullable();
            $table->integer('country_id')->unsigned()->nullable();
            $table->decimal('fee_monthly', 15, 2)->default(0.00)->nullable();
            $table->decimal('fee_monthly_maintenance', 15, 2)->default(0.00)->nullable();
            $table->decimal('fee_yearly', 15, 2)->default(0.00)->nullable();
            $table->decimal('fee_yearly_license', 15, 2)->default(0.00)->nullable();
            $table->decimal('fee_yearly_maintenance', 15, 2)->default(0.00)->nullable();
            $table->decimal('fee_initial_setup', 15, 2)->default(0.00)->nullable();
            $table->integer('max_api_calls')->unsigned()->nullable();
            $table->integer('max_decisions')->unsigned()->nullable();
            $table->decimal('discounts', 15, 2)->default(0.00)->nullable();

            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes()->nullable();

            $table->foreign('country_id')->references('id')->on('countries')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');

            $table->index('name', 'idx_name');
            $table->index('type', 'idx_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('subscriptions');
    }
}
