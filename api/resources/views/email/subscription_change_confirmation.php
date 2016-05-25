<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>Hi {{ $name }},</div><br/>

    <div>
        <div>Your subscription has been changed to <strong>{{ $subscription_name }}</strong>.<div>
        <div>To confirm the subscription change, click on the link provided below.</div>
        <div>Link: <a href="{{ $link }}">{{ $link }}</a></div>

        <div>Regards,</div><br/>
        <div>{{ trans('email.sender') }}</div>
    </div>

</body>
</html>