<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersIndices extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE `common_passwords` CHANGE `password` `password` VARCHAR(100)  CHARACTER SET utf8  COLLATE utf8_bin  NOT NULL  DEFAULT '';");

        Schema::table('common_passwords', function(Blueprint $table)
        {
            $table->index('password', 'idx_password');
        });

        Schema::table('access_tokens', function(Blueprint $table)
        {
            $table->index('token', 'idx_access_token');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('common_passwords', function(Blueprint $table)
        {
            $table->dropIndex('idx_password');
        });

        DB::statement("ALTER TABLE `common_passwords` CHANGE `password` `password` VARCHAR(300)  CHARACTER SET utf8  COLLATE utf8_unicode_ci  NOT NULL  DEFAULT '';");

        Schema::table('access_tokens', function(Blueprint $table)
        {
            $table->dropIndex('idx_access_token');
        });
    }
}
