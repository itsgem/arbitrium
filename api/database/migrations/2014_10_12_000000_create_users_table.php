<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username')->nullable();
            $table->string('email_address')->nullable();
            $table->string('new_email_address')->nullable();
            $table->string('name')->nullable();
            $table->string('password', 500)->nullable();
            $table->string('provider')->nullable();
            $table->string('provider_id')->nullable();
            $table->tinyInteger('login_attempts')->nullable()->default(0);
            $table->tinyInteger('user_type')->nullable();
            $table->rememberToken();
            $table->timestamp('activated_at')->nullable();
            $table->timestamp('locked_at')->nullable();
            $table->tinyInteger('items_per_page')->default(10)->unsigned()->nullable();
            $table->string('timezone', 50)->default(config('arbitrium.default_timezone'))->nullable();
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes()->nullable();

            $table->index('username', 'idx_username');
            $table->index('email_address', 'idx_email_address');
            $table->index(['username', 'email_address'], 'idx_login');
            $table->index(['email_address', 'user_type'], 'idx_unique_users');
            $table->index('provider_id', 'idx_provider_id');
        }); 
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
