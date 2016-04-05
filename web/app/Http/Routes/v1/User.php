<?php

Route::group(['prefix' => 'auth'], function()
{
    Route::post('login',                ['uses' => 'AuthController@login']);
    Route::post('login-via-social',     ['uses' => 'AuthController@loginViaSocial']);
});

Route::group(['prefix' => 'password'], function()
{
    Route::get('forgot',    ['uses' => 'UsersController@forgotPassword']);
    Route::get('reset',     ['uses' => 'UsersController@getResetPasswordToken']);
    Route::patch('reset',   ['uses' => 'UsersController@resetPassword']);
});


Route::group(['prefix' => 'user'], function()
{
    Route::group(['prefix' => 'client'], function()
    {
        Route::post('register',         ['uses' => 'UsersController@registerClient']);
    });

    Route::group(['prefix' => 'email'], function()
    {
        Route::get('token',             ['uses' => 'UsersController@getChangeEmailToken']);
        Route::patch('verify',          ['uses' => 'UsersController@doChangeEmail']);
    });

    Route::group(['prefix' => 'register'], function()
    {
        Route::get('token',             ['uses' => 'UsersController@getVerifyEmailToken']);
        Route::patch('verify',          ['uses' => 'UsersController@verifyEmail']);
    });
});


Route::group(['middleware' => 'auth'], function()
{
    Route::group(['prefix' => 'auth'], function()
    {
        Route::delete('logout',         ['uses' => 'AuthController@logout']);
    });

    Route::group(['prefix' => 'user'], function()
    {
        Route::get('available',         ['uses' => 'UsersController@checkUsernameAvailability']);
        Route::group(['prefix' => 'email'], function()
        {
            Route::get('cancel-change', ['uses' => 'UsersController@cancelChangeEmail']);
            Route::get('change',        ['uses' => 'UsersController@changeEmail']);
        });
        Route::put('password/change',   ['uses' => 'UsersController@changePassword']);

        //-- ADMIN ONLY
        Route::group(['prefix' => '{user}', 'middleware' => 'auth.admin'], function(){
            Route::patch('activate',    ['uses' => 'UsersController@activate']);
            Route::patch('deactivate',  ['uses' => 'UsersController@deactivate']);
            Route::patch('unlock',      ['uses' => 'UsersController@unlock']);
        });
    });
});