<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>Hi {{ $name }},</div><br/>

    <div>
        <div>Your subscription has been initially changed to <strong>{{ $subscription_name }}</strong>.<div>

        <br/><div>To confirm the subscription change, please make sure your Arbitrium account is logged in and then click on the link provided below.</div>
        <div>Link: <a href="{{ $link }}">{{ $link }}</a></div>

        <br/><div>Your current subscription will not be changed until you confirm this subscription change.</div>

        <br/><br/><div>Regards,</div><br/>
        <div>{{ trans('email.sender') }}</div>
    </div>

</body>
</html>