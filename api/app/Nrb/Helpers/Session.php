<?php

function belongs_to_logged_in_user($user_id)
{
    $logged_in = is_logged_in();
    return $logged_in && $user_id == $logged_in->id;
}

function get_logged_in_user_api_creds()
{
    $logged_in = is_logged_in();
    return $logged_in && $logged_in->hasApi() ? $logged_in->api->getAuth() : NULL;
}

function get_logged_in_client_id()
{
    $logged_in = is_logged_in();
    return $logged_in && $logged_in->isClient() ? $logged_in->client->id : NULL;
}

function get_logged_in_admin_id()
{
    $logged_in = is_logged_in();
    return $logged_in && $logged_in->isAdmin() ? $logged_in->admin->id : NULL;
}

function get_logged_in_user_id()
{
    $logged_in = is_logged_in();
    return $logged_in ? $logged_in->id : NULL;
}

function get_sesssion_lifetime()
{
    return config('session.lifetime');
}

function is_logged_in()
{
    return auth()->user();
}

function is_admin_user_logged_in()
{
    $logged_in = is_logged_in();
    return $logged_in && $logged_in->isAdmin();
}

function is_client_user_logged_in()
{
    $logged_in = is_logged_in();
    return $logged_in && $logged_in->isClient();
}