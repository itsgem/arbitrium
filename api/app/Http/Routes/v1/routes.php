<?php

Route::group(['namespace' => 'v1', 'prefix' => 'api/v1'], function()
{
    include('User.php');
    Route::group(['middleware' => 'auth'], function()
    {
        include('Admin.php');
        include('Client.php');

        // API Keys
        Route::resource('api-key', 'api\ApiKeyController', ['only' => ['destroy', 'index', 'show', 'store', 'update']]);
        Route::group(['prefix' => 'api-key'], function()
        {
            Route::get('generate',              ['uses' => 'api\ApiKeyController@generate']);

        });

        // IP Address
        Route::resource('ip-address', 'api\ApiIpAddressController', ['only' => ['destroy', 'index', 'show', 'store', 'update']]);
        Route::group(['prefix' => 'ip-address'], function()
        {
            Route::patch('{ip_address}/assign', ['uses' => 'api\ApiIpAddressController@assign']);
        });
    });

    Route::get('form/lists',    ['uses' => 'DropdownListsController@getListByType']);

    Route::group(['prefix' => 'list'], function()
    {
        Route::get('countries',                 ['uses' => 'CountriesController@getList']);
        Route::group(['prefix' => 'invoice'], function()
        {
            Route::get('categories',            ['uses' => 'InvoicesController@getCategoryList']);
            Route::get('status',                ['uses' => 'InvoicesController@getStatusList']);
        });
        Route::get('role/admin',                ['uses' => 'RolesController@getAdminRoles']);
    });

    Route::post('mail-webhook',                 ['uses' => 'MailWebHooksController@status']);

    Route::get('subscription',                  ['uses' => 'SubscriptionsController@index']);

});