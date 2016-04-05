<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>Hi {{ $name }},</div><br/>

    <div>
        <div>Your account has been created. You may now login to the system using either your username or email address. <div>
        <div>Your username is: {{ $username }} </div><br/>
        <div>Your email address is: {{ $email }} </div><br/>
        <div>To set your password, click on the link provided below.</div>
        <div>Link: <a href="{{ $link }}">{{ $link }}</a></div>
        <div>Mobile Code: {{ $code }} </div><br/>

        <div>Regards,</div><br/>
        <div>{{ trans('email.sender') }}</div>
    </div>

</body>
</html>