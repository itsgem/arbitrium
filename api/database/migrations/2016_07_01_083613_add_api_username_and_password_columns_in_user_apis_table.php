<?php

use App\Models\UserApi;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddApiUsernameAndPasswordColumnsInUserApisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_apis', function(Blueprint $table)
        {
            $table->text('api_username')->nullable()->after('api_secret');
            $table->text('api_password')->nullable()->after('api_username');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_apis', function(Blueprint $table)
        {
            $table->dropColumn('api_username');
            $table->dropColumn('api_password');
        });
    }
}
