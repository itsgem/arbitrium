<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>Hi {{ $name }},</div><br/>

    <div>
        <div>Your pending <strong>{{ $subscription_name }}</strong> subscription has been successfully cancelled since you have decided not to push through with this plan.<div>

        <br/><div>Feel free to subscribe again at your Subscription Dashboard.</div>

        <br/><div>Thank you for being with us!</div>

        <br/><br/><div>Regards,</div><br/>
        <div>{{ trans('email.sender') }}</div>
    </div>

</body>
</html>