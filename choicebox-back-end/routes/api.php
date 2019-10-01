<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**======================================================
 * Unauthenticated Routes
 =======================================================*/

Route::put('mobile/register', 'MobileDeviceController@store');

/**======================================================
 * Mobile Device Routes
 =======================================================*/

Route::prefix('mobile')->middleware('auth:mobile')->group(function () {
    // Interventions
    Route::get('interventions', 'InterventionController@index');
    Route::get('interventions/unanswered', 'InterventionController@unanswered');
});

/**======================================================
 * Hardware Device Routes
 =======================================================*/
Route::prefix('hardware')->middleware('auth:hardware')->group(function () {

});

/**======================================================
 * All-device Routes
 =======================================================*/
Route::prefix('device')->middleware('auth:hardware,mobile')->group(function () {
    Route::put('interactions', 'InteractionController@store');
});