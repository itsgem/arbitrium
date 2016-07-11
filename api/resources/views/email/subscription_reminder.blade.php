<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>Hi {{ $name }},</div><br/>

    <div>
        <div>Please be reminded that your subscription will be auto-renewed on <strong>{{ $date }}</strong>. Corresponding charges will apply.</div><br/>

        <div>If you wish to change your subscription, just go to your dashboard then Subscriptions.</div><br/>
        <div>For inquiries, please contact the System Administrator.</div><br/>

        <div>Regards,</div><br/>
        <div>{{ trans('email.sender') }}</div>
    </div>

</body>
</html>