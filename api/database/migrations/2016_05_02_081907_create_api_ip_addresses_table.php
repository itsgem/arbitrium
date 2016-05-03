<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApiIpAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('api_ip_addresses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('api_key_id')->unsigned();
            $table->string('ip_address');
            $table->string('name')->nullable();

            $table->timestamps();
            $table->softDeletes()->nullable();

            $table->foreign('api_key_id')->references('id')->on('api_keys')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('api_ip_addresses');
    }
}
