<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApiKeysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('api_keys', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('client_id')->unsigned()->nullable();
            $table->string('token', 500)->nullable();
            $table->string('name')->nullable();
            $table->string('description')->nullable();

            $table->boolean('is_api_call_restricted')->default(false);
            $table->boolean('is_whitelist')->default(false);
            $table->boolean('is_active')->default(false); //set default as true in controller
            $table->boolean('is_test_key')->default(false);

            $table->timestamps();
            $table->softDeletes()->nullable();

            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('api_keys');
    }
}
