<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>Hi {{ $name }},</div><br/>

    <div>
        <div>Please be reminded that your subscription will be auto-renewed on {{ $date }}. Corresponding charges will apply.</div><br/>

        <div>If you wish to turn off the auto-renewal of your subscription, just go to Account Settings then Subscription.</div><br/>
        <div>For inquiries, please contact the System Administrator.</div><br/>

        <div>Regards,</div><br/>
        <div>{{ trans('email.sender') }}</div>
    </div>

</body>
</html>