<?php

Route::group(['prefix' => 'client', 'middleware' => 'auth.client'], function()
{
    Route::group(['namespace' => 'client'], function()
    {
        //-- PROFILE
        Route::get('profile',               ['uses' => 'ClientsController@show']);
        Route::put('profile',               ['uses' => 'ClientsController@update']);

        //-- SUBSCRIPTION
        Route::group(['prefix' => 'subscription'], function()
        {
            Route::post('',                 ['uses' => 'ClientsController@purchaseSubscription']);
            Route::patch('cancel',          ['uses' => 'ClientsController@cancelSubscription']);
            Route::get('current',           ['uses' => 'ClientsController@getSubscription']);
        });
    });
});