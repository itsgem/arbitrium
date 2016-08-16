<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterUnlimitedSubscriptionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('subscriptions', function(Blueprint $table)
        {
            $table->dropColumn('is_unli');
            $table->boolean('is_unli_api_calls')->default(false)->nullable()->after('type');
            $table->boolean('is_unli_decisions')->default(false)->nullable()->after('is_unli_api_calls');
        });

        Schema::table('client_subscriptions', function(Blueprint $table)
        {
            $table->dropColumn('is_unli');
            $table->boolean('is_unli_api_calls')->default(false)->nullable()->after('term');
            $table->boolean('is_unli_decisions')->default(false)->nullable()->after('is_unli_api_calls');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('subscriptions', function (Blueprint $table)
        {
            $table->boolean('is_unli')->default(false)->nullable()->after('type');
            $table->dropColumn('is_unli_api_calls');
            $table->dropColumn('is_unli_decisions');
        });

        Schema::table('client_subscriptions', function (Blueprint $table)
        {
            $table->boolean('is_unli')->default(false)->nullable()->after('term');
            $table->dropColumn('is_unli_api_calls');
            $table->dropColumn('is_unli_decisions');
        });
    }
}
