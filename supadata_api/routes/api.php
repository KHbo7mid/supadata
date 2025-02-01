<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use App\Http\Controllers\CSVController;
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



Route::post('/register',[authController::class,'register']);
Route::post('/login', [authController::class, 'login'])->middleware('web');

Route::middleware('auth:sanctum')->post('/logout', [authController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user/{id}', [authController::class, 'getUser']);
Route::put('/user/{id}', [authController::class, 'editUser'])->middleware('auth:sanctum');
Route::delete('/user/{id}', [authController::class, 'deleteUser'])->middleware('auth:sanctum');


Route::middleware([EnsureFrontendRequestsAreStateful::class])->get('/sanctum/csrf-cookie', function () {
    return response()->json(['status' => 'CSRF token fetched']);
});

Route::post('/upload', [CSVController::class, 'upload']);
