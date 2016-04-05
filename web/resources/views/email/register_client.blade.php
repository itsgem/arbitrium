<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>Hi {{ $name }},</div><br/>

    <div>
        <div>Thank you for registering.</div>
        <div>Please click on the link below to verify your account:</div>
        <div>Link: <a href="{{ $link }}">{{ $link }}</a></div>
        <div>Mobile Code: {{ $code }}</div>

        <br/><div>If you did not request for this, please contact the administrator right away.</div><br/>

        <div>Regards,</div><br/>
        <div>{{ trans('email.sender') }}</div>
    </div>

</body>
</html>