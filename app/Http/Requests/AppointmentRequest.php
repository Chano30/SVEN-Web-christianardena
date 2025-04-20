<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AppointmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // We'll handle authorization in the controller or middleware
    }

    public function rules(): array
    {
        return [
            'frequency' => ['required', Rule::in(['recurring', 'one-time'])],
            'appointment_date' => ['required', 'date', 'after_or_equal:today'],
            'selected_day' => ['required', Rule::in(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])],
            'time_slot' => ['required', Rule::in(['Morning', 'Afternoon', 'Evening'])],
            'notes' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'appointment_date.after_or_equal' => 'The appointment date must be today or a future date.',
        ];
    }
}
