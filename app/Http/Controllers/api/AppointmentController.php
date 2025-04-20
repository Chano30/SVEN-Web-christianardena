<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AppointmentRequest;
use App\Models\Appointment;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class AppointmentController extends Controller
{
    /**
     * Create a new appointment.
     */
    public function store(AppointmentRequest $request): JsonResponse
    {
        try {
            // Get validated data
            $validated = $request->validated();

            // Add user_id to the validated data
            $validated['user_id'] = auth()->id();

            // Create the appointment
            $appointment = Appointment::create($validated);

            // Return success response
            return response()->json([
                'message' => 'Appointment scheduled successfully!',
                'appointment' => $appointment,
            ], 201);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Failed to create appointment: ' . $e->getMessage());

            // Return error response
            return response()->json([
                'message' => 'Failed to schedule appointment. Please try again.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Get all appointments for the authenticated user.
     */
    public function index(): JsonResponse
    {
        try {
            $appointments = Appointment::where('user_id', auth()->id())
                ->orderBy('appointment_date', 'asc')
                ->get();

            return response()->json([
                'appointments' => $appointments,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to fetch appointments: ' . $e->getMessage());

            return response()->json([
                'message' => 'Failed to fetch appointments. Please try again.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Get a specific appointment.
     */
    public function show(Appointment $appointment): JsonResponse
    {
        // Check if the appointment belongs to the authenticated user
        if ($appointment->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Unauthorized access to appointment.',
            ], 403);
        }

        return response()->json([
            'appointment' => $appointment,
        ]);
    }

    /**
     * Update an appointment.
     */
    public function update(AppointmentRequest $request, Appointment $appointment): JsonResponse
    {
        // Check if the appointment belongs to the authenticated user
        if ($appointment->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Unauthorized access to appointment.',
            ], 403);
        }

        try {
            // Get validated data
            $validated = $request->validated();

            // Update the appointment
            $appointment->update($validated);

            // Return success response
            return response()->json([
                'message' => 'Appointment updated successfully!',
                'appointment' => $appointment,
            ]);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Failed to update appointment: ' . $e->getMessage());

            // Return error response
            return response()->json([
                'message' => 'Failed to update appointment. Please try again.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Cancel an appointment.
     */
    public function cancel(Appointment $appointment): JsonResponse
    {
        // Check if the appointment belongs to the authenticated user
        if ($appointment->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Unauthorized access to appointment.',
            ], 403);
        }

        try {
            // Update the appointment status to cancelled
            $appointment->update(['status' => 'cancelled']);

            // Return success response
            return response()->json([
                'message' => 'Appointment cancelled successfully!',
                'appointment' => $appointment,
            ]);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Failed to cancel appointment: ' . $e->getMessage());

            // Return error response
            return response()->json([
                'message' => 'Failed to cancel appointment. Please try again.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }
}
