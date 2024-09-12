<?php

use App\Http\Controllers\HouseController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ResidentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/resident', [ResidentController::class, 'index']);
Route::post('/resident', [ResidentController::class, 'store']);
Route::post('/resident/{id}', [ResidentController::class, 'update']);
Route::delete('/resident/{id}', [ResidentController::class, 'destroy']);

Route::get('/house/unoccupied', [HouseController::class, 'getUnoccupied']);
Route::get('/house/occupied', [HouseController::class, 'getOccupied']);
Route::post('/house', [HouseController::class, 'store']);
Route::post('/house/{id}', [HouseController::class, 'update']);
Route::delete('/house/{id}', [HouseController::class, 'destroy']);

Route::post('/sendbill', [PaymentController::class, 'sendBill']);
Route::patch('/editpayment', [PaymentController::class, 'editPayment']);
Route::post('/paidoff/{id}', [PaymentController::class, 'paidOff']);
Route::post('/expense', [PaymentController::class, 'expense']);
Route::get('/report', [PaymentController::class, 'report']);
