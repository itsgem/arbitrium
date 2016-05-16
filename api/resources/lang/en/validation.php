<?php
use App\Errors;

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted'             => 'The :attribute must be accepted.',
    'active_url'           => 'The :attribute is not a valid URL.',
    'after'                => 'The :attribute must be a date after :date.',
    'alpha'                => 'The :attribute may only contain letters.',
    'alpha_dash'           => 'The :attribute may only contain letters, numbers, and dashes.',
    'alpha_num'            => 'The :attribute may only contain letters and numbers.',
    'array'                => 'The :attribute must be an array.',
    'before'               => 'The :attribute must be a date before :date.',
    'between'              => [
        'numeric' => 'The :attribute must be between :min and :max.',
        'file'    => 'The :attribute must be between :min and :max kilobytes.',
        'string'  => 'The :attribute must be between :min and :max characters.',
        'array'   => 'The :attribute must have between :min and :max items.',
    ],
    'boolean'              => 'The :attribute field must be true or false.',
    'confirmed'            => 'The :attribute confirmation does not match.',
    'date'                 => 'The :attribute is not a valid date.',
    'date_format'          => 'The :attribute does not match the format :format.',
    'different'            => 'The :attribute and :other must be different.',
    'digits'               => 'The :attribute must be :digits digits.',
    'digits_between'       => 'The :attribute must be between :min and :max digits.',
    'email'                => 'The :attribute must be a valid email address.',
    'filled'               => 'The :attribute field is required.',
    'exists'               => 'The selected :attribute is invalid.',
    'image'                => 'The :attribute must be an image.',
    'in'                   => 'The selected :attribute is invalid.',
    'integer'              => 'The :attribute must be an integer.',
    'ip'                   => 'The :attribute must be a valid IP address.',
    'max'                  => [
        'numeric' => 'The :attribute may not be greater than :max.',
        'file'    => 'The :attribute may not be greater than :max kilobytes.',
        'string'  => 'The :attribute may not be greater than :max characters.',
        'array'   => 'The :attribute may not have more than :max items.',
    ],
    'mimes'                => 'The :attribute must be a file of type: :values.',
    'min'                  => [
        'numeric' => 'The :attribute must be at least :min.',
        'file'    => 'The :attribute must be at least :min kilobytes.',
        'string'  => 'The :attribute must be at least :min characters.',
        'array'   => 'The :attribute must have at least :min items.',
    ],
    'not_in'               => 'The selected :attribute is invalid.',
    'numeric'              => 'The :attribute must be a number.',
    'regex'                => 'The :attribute format is invalid.',
    'required'             => 'The :attribute field is required.',
    'required_if'          => 'The :attribute field is required when :other is :value.',
    'required_with'        => 'The :attribute field is required when :values is present.',
    'required_with_all'    => 'The :attribute field is required when :values is present.',
    'required_without'     => 'The :attribute field is required when :values is not present.',
    'required_without_all' => 'The :attribute field is required when none of :values are present.',
    'same'                 => 'The :attribute and :other must match.',
    'size'                 => [
        'numeric' => 'The :attribute must be :size.',
        'file'    => 'The :attribute must be :size kilobytes.',
        'string'  => 'The :attribute must be :size characters.',
        'array'   => 'The :attribute must contain :size items.',
    ],
    'string'               => 'The :attribute must be a string.',
    'timezone'             => 'The :attribute must be a valid zone.',
    'unique'               => 'The :attribute has already been taken.',
    'url'                  => 'The :attribute format is invalid.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'pets' => [
            'required_if' => 'The :attribute field is required.'
        ],
        'username' => [
            'unique' => trans('errors.'.Errors::USERNAME_TAKEN),
        ],
        'new_email_address' => [
            'unique_users_by_user_type' => trans('errors.'.Errors::EMAIL_TAKEN)
        ],
        'number_greater'            => ['required_without' => 'The :attribute is required if :values is enabled'],
        'number_lesser'             => ['required_without' => 'The :attribute is required if :values is enabled'],
        'time_greater'              => ['required_without' => 'The :attribute is required if :values is enabled'],
        'time_lesser'               => ['required_without' => 'The :attribute is required if :values is enabled'],
        'date_greater'              => ['required_without' => 'The :attribute is required if :values is enabled'],
        'date_lesser'               => ['required_without' => 'The :attribute is required if :values is enabled'],
        'number_greater_equal'      => ['required_without' => 'The :attribute is required if :values is enabled'],
        'number_lesser_equal'       => ['required_without' => 'The :attribute is required if :values is enabled'],
        'time_greater_equal'        => ['required_without' => 'The :attribute is required if :values is enabled'],
        'time_lesser_equal'         => ['required_without' => 'The :attribute is required if :values is enabled'],
        'date_greater_equal'        => ['required_without' => 'The :attribute is required if :values is enabled'],
        'date_lesser_equal'         => ['required_without' => 'The :attribute is required if :values is enabled'],
        'date_time_greater'         => ['required_without' => 'The :attribute is required if :values is enabled'],
        'date_time_lesser'          => ['required_without' => 'The :attribute is required if :values is enabled'],
        'date_time_greater_equal'   => ['required_without' => 'The :attribute is required if :values is enabled'],
        'date_time_lesser_equal'    => ['required_without' => 'The :attribute is required if :values is enabled']
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [
        'rep_first_name'    => "company representative's first name",
        'rep_last_name'     => "company representative's last name",
        'rep_email_address' => "company representative's email address",
        'rep_gender'        => "company representative's gender",
        'rep_mobile_code'   => "company representative's mobile code",
        'rep_mobile_number' => "company representative's mobile number",
        'rep_phone_code'    => "company representative's phone code",
        'rep_phone_number'  => "company representative's phone number",
        'rep_position'      => "company representative's position",
        'rep_department'    => "company representative's department",
        'alt_first_name'    => "alternative representative's first name",
        'alt_last_name'     => "alternative representative's last name",
        'alt_email_address' => "alternative representative's email address",
        'alt_gender'        => "alternative representative's gender",
        'alt_mobile_code'   => "alternative representative's mobile code",
        'alt_mobile_number' => "alternative representative's mobile number",
        'alt_phone_code'    => "alternative representative's phone code",
        'alt_phone_number'  => "alternative representative's phone number",
        'alt_position'      => "alternative representative's position",
        'alt_department'    => "alternative representative's department",

        'number_greater'    => 'minimum value',
        'number_lesser'     => 'maximum value',
        'time_greater'      => 'minimum value',
        'time_lesser'       => 'maximum value',
        'date_greater'      => 'minimum value',
        'date_lesser'       => 'maximum value',
        'number_greater_equal'  => 'minimum value',
        'number_lesser_equal'   => 'maximum value',
        'time_greater_equal'    => 'minimum value',
        'time_lesser_equal'     => 'maximum value',
        'date_greater_equal'    => 'minimum value',
        'date_lesser_equal'     => 'maximum value',
        'date_time_greater'     => 'minimum value',
        'date_time_lesser'      => 'maximum value',
        'date_time_greater_equal'   => 'minimum value',
        'date_time_lesser_equal'    => 'maximum value',

        'electronic_device_others'  => 'other electronic devices',
        'ethnicity_others'  => 'other ethnicity',
        'go_to_page_no'         => 'page',
        'go_to_question_id'     => 'question',
        'has_purchased_responses_unverified'    => 'non-kyc',
        'has_purchased_responses_verified'      => 'kyc',
        'industry_others'   => 'other industry',
        'max_no_of_answers' => 'maximum no. of answers allowed',
        'min_no_of_answers' => 'minimum no. of answers allowed',
        'max_no_of_characters'  => 'maximum no. of characters allowed',
        'min_no_of_characters'  => 'minimum no. of characters allowed',
        'pet_others'        => 'other pets',
        'religion_others'   => 'other religion',
        'required_responses_unverified' => 'number of non-kyc verified respondents',
        'required_responses_verified'   => 'number of kyc verified respondents',
    ],


    /*
    |--------------------------------------------------------------------------
    | Custom Validation Values
    |--------------------------------------------------------------------------
    */
    'values' => [
        'show_footer' => [
            '1' => 'enabled'
        ],
        'show_header' => [
            '1' => 'enabled'
        ],
        'show_logo' => [
            '1' => 'enabled'
        ],
        'show_theme' => [
            '1' => 'enabled'
        ],
        'has_sports' => [
            '1' => 'yes'
        ],
        'has_purchased_responses_unverified' => [
            '1' => 'enabled'
        ],
        'has_purchased_responses_verified' => [
            '1' => 'enabled'
        ]
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Functions
    |--------------------------------------------------------------------------
    */
    'alpha_dash_dot'    => 'The :attribute may only contain letters, numbers, dashes, underscores and periods',
    'common_password'   => 'The :attribute is common. Please choose another one.',
    'date_after_or_equal'   => 'The :attribute must be a date after :date.',
    'date_before_or_equal'  => 'The :attribute must be a date before :date.',
    'date_range'        => 'The :other should be greater than the :attribute.',
    'digit'             => 'The :attribute may only contain numbers.',
    'dropdown_exists'   => 'The selected :attribute is invalid.',
    'dropdown_exists_with_others' => 'The selected :attribute is invalid.',
    'future_date'       => 'The :attribute must be a date after the current date.',
    'gender'            => 'The selected :attribute is invalid.',
    'greater_than'      => 'The :attribute should be greater than the :other.',
    'greater_than_equal'    => 'The :attribute should be greater than or equal the :other.',
    'hex'               => 'The :attribute is invalid.',
    'money'             => 'The :attribute must be a valid money format. (No commas and unit)',
    'password'          => 'The :attribute must have small letters, capital letters and numbers.',
    'past_date'         => 'The :attribute must be a date before the current date.',
    'unique_username'   => trans('errors.'.Errors::USERNAME_TAKEN),
    'unique_users_by_user_type' => 'The :attribute has already been taken.',
];
