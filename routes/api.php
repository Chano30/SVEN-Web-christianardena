<?php

use App\Http\Controllers\Api\AppointmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    // Appointment routes
    Route::apiResource('appointments', AppointmentController::class)
        ->only(['index', 'store', 'show', 'update']);

    // Cancel appointment route
    Route::patch('appointments/{appointment}/cancel', [AppointmentController::class, 'cancel'])
        ->name('appointments.cancel');
});
