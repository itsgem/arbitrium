<?php

namespace App\Builders;

use App\Models\Logs\EmailLog;

class MailDetailsBuilder
{
    private $attachment = '';
    private $content = '';
    private $email_category = '';
    private $email_reject_reason = '';
    private $email_status = '';
    private $from_email_address = '';
    private $from_name = '';
    private $notes = '';
    private $sender_type = '';
    private $subject = '';
    private $to_email_address = '';
    private $to_name = '';
    private $to_user_id = '';

    public function build($data)
    {
        $this->from_name        = get_val($data, 'from_name');
        $this->email_category   = get_val($data, 'email_category');
        $this->sender_type      = get_val($data, 'sender_type', EmailLog::SYSTEM);
        $this->email_status     = get_val($data, 'email_status', EmailLog::SENT);
        return $this->toArray();
    }

    public function buildFromEmailLog($log)
    {
        $this->content               = $log->content;
        $this->subject               = $log->subject;
        $this->from_email_address    = $log->from_email_address;
        $this->to_email_address      = $log->to_email_address;
        $this->to_name               = $log->to_name;
        $this->to_user_id            = $log->to_user_id;
        $this->email_category        = $log->email_category;
        $this->notes                 = $log->notes;
        $this->attachment            = $log->attachment;
        $this->email_status          = EmailLog::SENT;
        $this->sender_type           = EmailLog::MANUAL;
        return $this->toArray();
    }

    public function setContent($content)
    {
        $this->content = $content;
    }

    public function setFromEmailAddress($from_email_address)
    {
        $this->from_email_address = $from_email_address;
    }

    public function setSubject($subject)
    {
        $this->subject = $subject;
    }

    public function setToEmailAddress($to_email_address)
    {
        $this->to_email_address = $to_email_address;
    }

    public function setToName($to_name)
    {
        $this->to_name = $to_name;
    }

    public function setToUserId($to_user_id)
    {
        $this->to_user_id = $to_user_id;
    }

    private function toArray()
    {
        return [
            'content'               => $this->content,
            'subject'               => $this->subject,
            'from_name'             => $this->from_name,
            'from_email_address'    => $this->from_email_address,
            'to_email_address'      => $this->to_email_address,
            'to_name'               => $this->to_name,
            'to_user_id'            => $this->to_user_id,
            'email_category'        => $this->email_category,
            'notes'                 => $this->notes,
            'attachment'            => $this->attachment,
            'email_status'          => $this->email_status,
            'sender_type'           => $this->sender_type,
            'email_reject_reason'   => $this->email_reject_reason
        ];
    }
}