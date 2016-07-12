<?php

namespace App\Models\Logs;

use App\Nrb\NrbLogModel;

class EmailLog extends NrbLogModel
{
    const SYSTEM = 'System';
    const MANUAL = 'Manual';

    const SENT      = 'sent';
    const REJECTED  = 'rejected';

    const USER_RESET_PASSWORD   = 'Reset Password';
    const USER_CHANGE_EMAIL     = 'Change Email';
    const USER_CHANGE_PASSWORD  = 'Change Password';
    const CLIENT_APPROVAL       = 'Client Approval';
    const CLIENT_NEW            = 'Account Creation';
    const CLIENT_REGISTRATION   = 'Client Registration';
    const CLIENT_VERIFIED       = 'Client Account Verification';
    const INVOICE               = 'Invoice';
    const RENEW_SUBSCRIPTION    = 'Subscription Renewal';
    const CHANGE_SUBSCRIPTION   = 'Admin Change Client Subscription Approval';
    const CHANGE_SUBSCRIPTION_SUCCESS = 'Client Subscription Change Success';
    const SUBSCRIPTION_RENEWAL_SUCCESS = 'Client Subscription Renewal Success';
    const SUBSCRIPTION_EXPIRED  = 'Client Subscription Expired';
    const CANCEL_SUBSCRIPTION   = 'Client Subscription Cancellation';
    const ADMINISTER_SURVEY     = 'Administer Survey';
    const SURVEY_INVITATION     = 'Survey Invitation';

    protected $fillable = [
        'email_category', 'sender_type', 'sent_at',
        'from_user_id', 'to_user_id',
        'from_email_address', 'to_email_address', 'to_name',
        'subject', 'content', 'notes', 'attachment',
        'mail_id', 'email_status', 'email_reject_reason',
        'created_by', 'updated_by'
    ];

    protected $dates = ['sent_at'];

    //---------- relationships

    //---------- mutators

    //---------- scopes
    public function scopeMailId($query, $id)
    {
        if ($id)
        {
            return $query->where('mail_id', $id);
        }
    }

    //---------- helpers

}
