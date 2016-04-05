<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>Hi {{ $name }},</div><br/>

    <div>
        <div>Your subscription has been successfully renewed. Attached herewith is the invoice.</div><br/>
        <div>Link: <a href="{{ $link }}">{{ $link }}</a></div><br/>

        <div>If you wish to turn off the auto-renewal of your subscription, just go to Account Settings then Subscription.</div><br/>
        <div>For inquiries, please contact the System Administrator.</div><br/>

        <div>Regards,</div><br/>
        <div>{{ trans('email.sender') }}</div>
    </div>

</body>
</html>