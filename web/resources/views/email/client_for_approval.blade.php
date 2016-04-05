<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>Hi System Admin,</div><br/>

    <div>
        <div>A client account is for your approval.</div>
        <div>To review the account details, click on the link below:</div>
        <div>Link: <a href="{{ $link }}">{{ $link }}</a></div>

        <br/><div>If you did not request for this, please contact the administrator right away.</div><br/>

        <div>Regards,</div><br/>
        <div>{{ trans('email.sender') }}</div>
    </div>

</body>
</html>