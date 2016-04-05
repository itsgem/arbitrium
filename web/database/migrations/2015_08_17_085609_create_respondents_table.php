<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRespondentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dropdown_lists', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->string('type')->nullable();
            $table->tinyInteger('sort_no')->default(0)->nullable();
            $table->index('type', 'idx_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('dropdown_lists');
    }
}
