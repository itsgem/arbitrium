<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmailLogs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::connection('mysql_logs')->create('email_logs', function(Blueprint $table)
        {
            $table->increments('id');

            $table->string('email_category')->nullable();
            $table->enum('sender_type', ['System', 'Manual'])->default('System')->nullable();
            $table->timestamp('sent_at')->nullable();

            $table->integer('to_user_id')->unsigned()->nullable();
            $table->string('from_email_address')->nullable();
            $table->string('to_email_address')->nullable();
            $table->string('to_name')->nullable();

            $table->string('subject')->nullable();
            $table->text('content')->nullable();
            $table->string('notes')->nullable();
            $table->string('attachment')->nullable();
            $table->string('mail_id')->nullable();
            $table->string('email_status')->nullable();
            $table->string('email_reject_reason')->nullable();

            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->timestamps();

            $table->index('sent_at', 'idx_sent_at');
            $table->index('to_user_id', 'idx_to_user_id');
            $table->index('to_email_address', 'idx_to_email_address');
            $table->index('to_name', 'idx_to_name');
            $table->index('sender_type', 'idx_sender_type');
            $table->index('email_category', 'idx_email_category');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysql_logs')->drop('email_logs');
    }
}
