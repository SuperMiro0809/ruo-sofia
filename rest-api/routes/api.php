<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProtocolController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\Auth\LoginController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
// Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
// Route::post('login', [LoginController::class, 'login']);
Route::group([
    'middleware' => 'api'
], function ($router) {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/refresh', [UserController::class, 'refresh']);
    Route::post('/login', [UserController::class, 'login']);
    Route::get('/profile', [UserController::class, 'userProfile']);
    Route::post('/profile/avatar', [UserController::class, 'uploadAvatar']);
    Route::put('/users/{id}', [UserController::class, 'editUser']);
});

Route::get('/protocols', [ProtocolController::class, 'index']);
Route::post('/protocols', [ProtocolController::class, 'store']);
Route::delete('/protocols/{id}', [ProtocolController::class, 'destroy']);

Route::get('/teachers', [TeacherController::class, 'index']);
Route::post('/teachers', [TeacherController::class, 'store']);
Route::get('/teachers/{egn}', [TeacherController::class, 'teacher']);