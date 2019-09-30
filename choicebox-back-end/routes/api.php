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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

/**======================================================
 * Mobile Device Routes
 =======================================================*/

Route::put('mobile/register', 'MobileDeviceController@store');

Route::prefix('mobile')->middleware('auth:api:mobile')->group(function () {
    Route::get('/', function() {
        return 'HELLO!';
    });
});

/**======================================================
 * Hardware Device Routes
 =======================================================*/
Route::prefix('hardware')->middleware('auth:api:hardware')->group(function () {

});
