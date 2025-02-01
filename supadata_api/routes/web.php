<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeController;
use App\Http\Controllers\EntrepriseController;

use App\Http\Controllers\UserController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
// Route::get('/complete-card/{token}', [EmployeController::class, 'completeCard'])->name('complete.card');
Route::get('/list_users', [UserController::class, 'showAllUsers'])->name('list_users');
Route::get('/list_ambassador',[UserController::class, 'showAmbassadors']);
Route::delete('/delete_user/{id}', [UserController::class, 'deleteUser'])->name('delete_user');

Route::get('/edit_user/{id}', [UserController::class, 'get_user_id'])->name('get_user_id');
Route::post('/edit_user/{id}', [UserController::class, 'EditUser'])->name('edit_user');

Route::get('/edit_ambassador/{id}', [UserController::class, 'get_ambassador_id']);

Route::post('/edit_ambassador/{id}', [UserController::class, 'EditAmbassador']);
Route::delete('/delete_ambassador/{id}', [UserController::class, 'deleteAmbassador']);
//company
Route::get('/list_companies',[EntrepriseController::class,'showAllCompanies']);
Route::get('/edit_companies/{id}',[EntrepriseController::class,'get_company_id']);
Route::post('/EditCompany/{id}',[EntrepriseController::class,'EditCompany']);
Route::delete('/deleteCompany/{id}',[EntrepriseController::class,'deleteCompany']);




