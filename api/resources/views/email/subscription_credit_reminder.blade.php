<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>Hi {{ $name }},</div><br/>

    <div>
        <div>Your remaining credit balance in your account may disrupt the auto-renewal of your subscription.</div><br/>

        <div>To avoid any inconvenence, please purchase additional credits. Just go to Purchase Credits screen.</div><br/>
        <div>For inquiries, please contact the System Administrator.</div><br/>

        <div>Regards,</div><br/>
        <div>{{ trans('email.sender') }}</div>
    </div>

</body>
</html>