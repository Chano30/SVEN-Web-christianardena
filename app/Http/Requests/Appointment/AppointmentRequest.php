<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // We'll handle authorization in the controller or middleware
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
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

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'appointment_date.after_or_equal' => 'The appointment date must be today or a future date.',
        ];
    }
}
