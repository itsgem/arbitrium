<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApiKeyPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('api_key_permissions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('api_key_id')->unsigned();
            $table->integer('api_permission_id')->unsigned();
            $table->enum('value', [0, 1])->default(1);

            $table->foreign('api_key_id')->references('id')->on('api_keys')->onDelete('cascade');
            $table->foreign('api_permission_id')->references('id')->on('api_permissions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('api_key_permissions');
    }
}
