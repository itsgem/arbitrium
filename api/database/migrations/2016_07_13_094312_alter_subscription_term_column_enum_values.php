<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterSubscriptionTermColumnEnumValues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE client_subscriptions CHANGE COLUMN term term ENUM('Daily', 'Monthly', 'Annually')");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE client_subscriptions CHANGE COLUMN term term ENUM('Monthly', 'Annually')");
    }
}
