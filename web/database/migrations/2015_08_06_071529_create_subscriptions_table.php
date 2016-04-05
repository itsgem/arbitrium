<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscriptions', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->integer('price_in_credit')->default(0)->nullable();
            $table->integer('max_questions')->default(0)->nullable();
            $table->integer('max_surveys')->default(0)->nullable();
            $table->integer('max_responses')->default(0)->nullable();
            $table->boolean('has_email_support')->default(0)->nullable();
            $table->boolean('has_templates')->default(0)->nullable();
            $table->boolean('multi_language')->default(0)->nullable();
            $table->boolean('has_export_data')->default(0)->nullable();
            $table->boolean('has_real_time_reporting')->default(0)->nullable();
            $table->boolean('statistical_analysis')->default(0)->nullable();
            $table->boolean('tbl_graph_charts')->default(0)->nullable();
            $table->boolean('has_skip_question_logic')->default(0)->nullable();
            $table->boolean('can_edit_survey_questions')->default(0)->nullable();
            $table->boolean('can_embed_media')->default(0)->nullable();
            $table->boolean('can_customize_invite')->default(0)->nullable();
            $table->boolean('can_randomize_questions')->default(0)->nullable();
            $table->boolean('can_add_open_ended_questions')->default(0)->nullable();
            $table->boolean('can_theme')->default(0)->nullable();
            $table->boolean('has_data_validation')->default(0)->nullable();
            $table->boolean('has_incentive_payments')->default(0)->nullable();
            $table->boolean('has_respondent_management')->default(0)->nullable();
            $table->boolean('has_call_support')->default(0)->nullable();
            $table->boolean('has_piping')->default(0)->nullable();

            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes()->nullable();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');
            $table->index('name', 'idx_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('subscriptions');
    }
}
