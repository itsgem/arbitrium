<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>Hi {{ $name }},</div><br/>

    <div>
        <div>Your subscription has been changed to <strong>{{ $subscription_name }}</strong>.<div>

        <br/><div>To confirm the subscription change, please make sure your <strong>Arbitrium account is logged in</strong> and then click on the PayPal link provided below.</div>
        <div>Link: <a href="{{ $link }}">{{ $link }}</a></div>

        <br/><div>Regards,</div><br/>
        <div>{{ trans('email.sender') }}</div>
    </div>

</body>
</html>