<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterClientSubscriptionsStatusEndColumnEnumValues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE client_subscriptions CHANGE COLUMN status_end status_end ENUM('Cancelled', 'Upgraded', 'Renewed', 'Expired')");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE client_subscriptions CHANGE COLUMN status_end status_end ENUM('Cancelled', 'Upgraded', 'Renewed')");
    }
}
