<?php

namespace App\Http\Requests\v1\Admin;

use App\Nrb\Http\v1\Requests\NrbRequest;

// Admin/SubscriptionsController::store
// Admin/SubscriptionsController::update
class SubscriptionRequest extends NrbRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [];
        $method = $this->method();
        if ($method == 'POST' || $method == 'PUT')
        {
            $id = 'NULL';
            if ($method == 'PUT')
            {
                $id = last($this->segments());
            }
            $rules = [
                'name'              => 'required|max:20|unique:subscriptions,name,'.$id.',id,deleted_at,NULL',
                'price_in_credit'   => 'required|integer',
                'max_questions'     => 'required|integer',
                'max_surveys'       => 'required|integer',
                'max_responses'     => 'required|integer',
                'has_email_support' => 'required|boolean',
                'has_templates'     => 'required|boolean',
                'multi_language'    => 'required|integer|in:0,1,2',
                'has_export_data'   => 'required|boolean',
                'has_real_time_reporting'   => 'required|boolean',
                'statistical_analysis'      => 'required|integer|in:0,1,2',
                'tbl_graph_charts'          => 'required|integer|in:0,1,2',
                'has_skip_question_logic'   => 'required|boolean',
                'can_edit_survey_questions' => 'required|boolean',
                'can_embed_media'           => 'required|boolean',
                'can_customize_invite'      => 'required|boolean',
                'can_randomize_questions'   => 'required|boolean',
                'can_add_open_ended_questions' => 'required|boolean',
                'can_theme'                 => 'required|boolean',
                'has_data_validation'       => 'required|boolean',
                'has_incentive_payments'    => 'required|boolean',
                'has_respondent_management' => 'required|boolean',
                'has_call_support'  => 'required|boolean',
                'has_piping'        => 'required|boolean'
            ];
        }

        return $rules;
    }
}