<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>Hi {{ $name }},</div><br/>

    <div>
        <div>Thank you for subscribing!<div>

        <br/><div>Your subscription has been successfully changed to <strong>{{ $subscription_name }}</strong> valid from <strong>{{ $subscription_validity }}</strong>.</div>

        <br/><br/><div>Regards,</div><br/>
        <div>{{ trans('email.sender') }}</div>
    </div>

</body>
</html>