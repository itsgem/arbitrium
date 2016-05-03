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
            $table->integer('client_id')->unsigned();
            $table->string('token', 500)->nullable();
            $table->string('name');
            $table->string('description')->nullable();
            $table->text('api_permissions')->nullable();

            $table->enum('is_api_call_restricted', [0, 1])->default(0);
            $table->enum('is_whitelist', [0, 1])->default(0);
            $table->enum('is_active', [0, 1])->default(1);
            $table->enum('is_test_key', [0, 1])->default(0);

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
