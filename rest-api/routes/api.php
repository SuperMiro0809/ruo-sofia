<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProtocolController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CommitteController;
use App\Http\Controllers\StudentClassController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\StudentsSecondaryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProtocolClassController;
use App\Http\Controllers\ProtocolSecondaryController;
use App\Http\Controllers\CommitteEducationController;
use App\Http\Controllers\MpsController;

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

Route::post('/login', [UserController::class, 'login']);

Route::group([
    'middleware' => ['jwt.verify', 'api']
], function($router) {
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/refresh', [UserController::class, 'refresh']);
    Route::get('/profile', [UserController::class, 'userProfile']);
    Route::post('/profile/avatar', [UserController::class, 'uploadAvatar']);
    Route::delete('/profile/avatar', [UserController::class, 'deleteAvatar']);
    Route::put('/users/changePassword/{id}', [UserController::class, 'changePassword']);
    Route::put('/users/{id}', [UserController::class, 'editUser']);
    Route::get('/users/{id}', [UserController::class, 'getById']);

    Route::get('/protocols', [ProtocolController::class, 'index']);
    Route::post('/protocols', [ProtocolController::class, 'store']);
    Route::delete('/protocols/{id}', [ProtocolController::class, 'destroy']);
    Route::put('/protocols/{id}', [ProtocolController::class, 'edit']);
    Route::get('/protocols/{id}', [ProtocolController::class, 'getById']);

    Route::get('/teachers', [TeacherController::class, 'index']);
    Route::post('/teachers', [TeacherController::class, 'store']);
    Route::get('/teachers/applications/{id}', [TeacherController::class, 'getApplication']);
    Route::post('/teachers/applications', [TeacherController::class, 'addApplication']);
    Route::delete('/teachers/{id}', [TeacherController::class, 'destroy']);
    Route::put('/teachers/{id}', [TeacherController::class, 'edit']);
    Route::get('/teachers/certificates', [TeacherController::class, 'certificates']);
    Route::get('/teachers/{id}', [TeacherController::class, 'getById']);

    Route::get('/students-class', [StudentClassController::class, 'index']);
    Route::get('/students-class/certificates', [StudentClassController::class, 'certificates']);
    Route::get('/students-class/application/{id}', [StudentClassController::class, 'getApplication']);
    Route::put('/students-class/application/{id}', [StudentClassController::class, 'editApplication']);
    Route::get('/students-class/{egn}', [StudentClassController::class, 'findByEgn']);
    Route::delete('/students-class/{id}', [StudentClassController::class, 'destroy']);
    Route::post('/students-class', [StudentClassController::class, 'store']);

    Route::get('/students-secondary', [StudentsSecondaryController::class, 'index']);
    Route::get('/students-secondary/certificates', [StudentsSecondaryController::class, 'certificates']);
    Route::post('/students-secondary', [StudentsSecondaryController::class, 'store']);
    Route::delete('/students-secondary/{id}', [StudentsSecondaryController::class, 'destroy']);
    Route::put('/students-secondary/{id}', [StudentsSecondaryController::class, 'edit']);
    Route::get('/students-secondary/{id}', [StudentsSecondaryController::class, 'getById']);

    Route::get('/protocols-class', [ProtocolClassController::class, 'index']);
    Route::post('/protocols-class', [ProtocolClassController::class, 'store']);
    Route::delete('/protocols-class/{id}', [ProtocolClassController::class, 'destroy']);
    Route::get('/protocols-class/{id}', [ProtocolClassController::class, 'getById']);
    Route::put('/protocols-class/{id}', [ProtocolClassController::class, 'edit']);

    Route::get('/protocols-secondary', [ProtocolSecondaryController::class, 'index']);
    Route::post('/protocols-secondary', [ProtocolSecondaryController::class, 'store']);
    Route::delete('/protocols-secondary/{id}', [ProtocolSecondaryController::class, 'destroy']);
    Route::get('/protocols-secondary/{id}', [ProtocolSecondaryController::class, 'getById']);
    Route::put('/protocols-secondary/{id}', [ProtocolSecondaryController::class, 'edit']);

    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::get('/subjects', [SubjectController::class, 'index']);
    Route::post('/subjects', [SubjectController::class, 'save']);
    Route::delete('/subjects/{id}', [SubjectController::class, 'destroy']);
    Route::put('/subjects/{id}', [SubjectController::class, 'edit']);

    Route::get('/committe', [CommitteController::class, 'index']);
    Route::put('/committe', [CommitteController::class, 'save']);

    Route::get('/committe-education', [CommitteEducationController::class, 'index']);
    Route::put('/committe-education', [CommitteEducationController::class, 'save']);

    Route::prefix('mps')->group(function () {
        Route::get('/', [MpsController::class, 'index']);
        Route::post('/', [MpsController::class, 'store']);
        Route::put('/{id}', [MpsController::class, 'edit']);
        Route::delete('/{id}', [MpsController::class, 'destroy']);
        Route::get('/{id}', [MpsController::class, 'getById']);
    });
});