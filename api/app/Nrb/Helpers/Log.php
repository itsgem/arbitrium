<?php

use App\Models\Logs\AdminLog;
use App\Models\Logs\ClientLog;
use App\Nrb\NrbLogModel;
use App\User;

function get_user_from_request($request)
{
    $user = new User([
        'username'      => $request->get('username', $request->get('login')),
        'email_address' => $request->get('email_address', $request->get('login')),
    ]);
    $user->user_type = $request->get('user_type');
    return $user;
}

function log_api_error($controller, $method, $user = null)
{
    $controller->logLevel = NrbLogModel::ERROR;
    log_api_access($controller, $method, $user);
}

// Get class name: (new \ReflectionClass($obj))->getShortName()
function log_api_access($controller, $method, $user = null)
{
    $user = $user ? $user : auth()->user();
    if ($user)
    {
        $request = $controller->request;
        $data = [
            'user_id'       => $user->id,
            'username'      => $user->username,
            'email_address' => $user->email_address,
            'name'          => $user->name,
            'ip_address'    => $request->server('REMOTE_ADDR'),
            'user_agent'    => $request->server('HTTP_USER_AGENT'),
            'page_accessed' => $controller->getMethodDisplayName($method),
            'api_accessed'  => $request->url(),
            'log_level'     => $controller->logLevel,
            'referrer'      => $request->server('HTTP_REFERER'),
            'parameters'    => json_encode($request->except('password', 'password_confirmation', 'current_password'))
        ];

        switch($user->user_type)
        {
            case User::CLIENT:      ClientLog::create($data); break;
            default:                AdminLog::create($data);
        }
    }
}

function log_command($cron_command)
{
    AdminLog::create([
        'page_accessed' => $cron_command,
        'api_accessed'  => $cron_command,
        'log_level'     => NrbLogModel::INFO,
        'referrer'      => 'Cron Job'
    ]);
}
