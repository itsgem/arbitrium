<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
    <div>Hi {{ $name }},</div><br/>

    <div>
        <div>We are sorry but your registration has been disapproved. For inquiries, please contact the System Administrator.</div><br/><br/>

        <div>Regards,</div><br/>
        <div>{{ trans('email.sender') }}</div>
    </div>

</body>
</html>