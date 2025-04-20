<?php

use App\Http\Controllers\Api\AppointmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('appointments', AppointmentController::class)
        ->only(['index', 'store', 'show', 'update']);

