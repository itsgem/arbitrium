<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysql_logs')->create('admin_logs', function($table)
        {
            $table->engine = 'MyISAM';
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable();
            $table->string('username')->nullable();
            $table->string('email_address')->nullable();
            $table->string('name')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->string('page_accessed')->nullable();
            $table->string('api_accessed')->nullable();
            $table->string('log_level', 10)->nullable();
            $table->text('referrer')->nullable();
            $table->text('parameters')->nullable();
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->timestamps();
        });
        Schema::connection('mysql_logs')->create('client_logs', function($table)
        {
            $table->engine = 'MyISAM';
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable();
            $table->string('username')->nullable();
            $table->string('email_address')->nullable();
            $table->string('name')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->string('page_accessed')->nullable();
            $table->string('api_accessed')->nullable();
            $table->string('log_level', 10)->nullable();
            $table->text('referrer')->nullable();
            $table->text('parameters')->nullable();
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysql_logs')->drop('admin_logs');
        Schema::connection('mysql_logs')->drop('client_logs');
    }
}
