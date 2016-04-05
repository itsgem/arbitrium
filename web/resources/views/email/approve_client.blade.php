<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>Hi {{ $name }},</div><br/>

    <div>
        <div>Your account has been approved. You may now login to the system using either your username or email address.</div> <br/>
        <div>To log in, click the link below.</div> <br/>
        <div>Link: <a href="{{ $link }}">{{ $link }}</a></div><br/><br/>

        <div>Regards,</div><br/>
        <div>{{ trans('email.sender') }}</div>
    </div>

</body>
</html>