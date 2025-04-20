"use client"

import type React from "react"

import { z } from "zod"
import { format, addMonths, subMonths } from "date-fns"
import { useState } from "react"
import { toast } from "react-toastify"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Define types for the form data
type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
type TimeSlot = "Morning" | "Afternoon" | "Evening"
type Frequency = "recurring" | "one-time"

interface FormData {
  frequency: Frequency
  appointment_date: Date | null
  selected_day: DayOfWeek | null
  time_slot: TimeSlot | null
  notes: string
}

// Define validation schema with zod
const appointmentSchema = z.object({
  frequency: z.enum(["recurring", "one-time"]),
  appointment_date: z.date({
    required_error: "Please select a date",
    invalid_type_error: "Please select a valid date",
  }),
  selected_day: z.enum(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], {
    required_error: "Please select a day",
  }),
  time_slot: z.enum(["Morning", "Afternoon", "Evening"], {
    required_error: "Please select a time slot",
  }),
  notes: z.string().optional(),
})

type ValidationErrors = {
  [K in keyof FormData]?: string
}

const AppointmentForm = () => {
  const [formData, setFormData] = useState<FormData>({
    frequency: "recurring", // Default to recurring
    appointment_date: null,
    selected_day: null,
    time_slot: null,
    notes: "",
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isSuccess, setIsSuccess] = useState(false)

  const clearError = (field: keyof FormData) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validateForm = (data: FormData): boolean => {
    const result = appointmentSchema.safeParse(data)

    if (!result.success) {
      const formattedErrors: ValidationErrors = {}
      result.error.errors.forEach((err) => {
        const path = err.path[0] as keyof FormData
        formattedErrors[path] = err.message
      })
      setErrors(formattedErrors)
      return false
    }

    setErrors({})
    return true
  }

  const handleFrequencyChange = (frequency: Frequency) => {
    setFormData({ ...formData, frequency })
    clearError("frequency")
  }

  const handleDateChange = (date: Date) => {
    setFormData({ ...formData, appointment_date: date })
    clearError("appointment_date")
    setShowCalendar(false)
  }

  const handleDaySelect = (day: DayOfWeek) => {
    setFormData({ ...formData, selected_day: day })
    clearError("selected_day")
  }

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setFormData({ ...formData, time_slot: slot })
    clearError("time_slot")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    clearError(name as keyof FormData)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm(formData)) {
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          frequency: formData.frequency,
          appointment_date: formData.appointment_date?.toISOString(),
          selected_day: formData.selected_day,
          time_slot: formData.time_slot,
          notes: formData.notes,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit appointment")
      }

      // Optionally parse JSON if your Laravel response includes something
      // const result = await response.json()

      // Show success message and set success state
      setIsSuccess(true)
      toast.success("Appointment scheduled successfully!")

      // Reset form
      setFormData({
        frequency: "recurring",
        appointment_date: null,
        selected_day: null,
        time_slot: null,
        notes: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Days of the week for selection
  const daysOfWeek: DayOfWeek[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Generate calendar days for the current month view
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const dayOfWeek = firstDayOfMonth.getDay() || 7 // Convert Sunday (0) to 7
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days: (Date | null)[] = []
    // Add empty cells for days before the first day of the month
    for (let i = 1; i < dayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div className="h-full bg-[#fdf5f5] p-4 sm:p-6 md:p-8 lg:p-12">
      <h2 className="mb-4 sm:mb-6 md:mb-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-700 text-center">
        We'll take your dog for a walk. Just tell us when!
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">Frequency</label>
            <div className="grid grid-cols-2 gap-2 max-w-xs">
              <button
                type="button"
                onClick={() => handleFrequencyChange("recurring")}
                className={`rounded-md border px-3 sm:px-4 py-2 text-center text-xs sm:text-sm ${
                  formData.frequency === "recurring"
                    ? "border-[#f8d0d0] bg-[#f8d0d0] text-slate-700"
                    : "border-gray-300 bg-white text-slate-700 hover:bg-slate-50"
                } `}
              >
                Recurring
              </button>
              <button
                type="button"
                onClick={() => handleFrequencyChange("one-time")}
                className={`rounded-md border px-3 sm:px-4 py-2 text-center text-xs sm:text-sm ${
                  formData.frequency === "one-time"
                    ? "border-[#f8d0d0] bg-[#f8d0d0] text-slate-700"
                    : "border-gray-300 bg-white text-slate-700 hover:bg-slate-50"
                } `}
              >
                One time
              </button>
            </div>
            {errors.frequency && <p className="mt-1 text-sm text-red-500">{errors.frequency}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">Start date</label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={formData.appointment_date ? format(formData.appointment_date, "MM/dd/yyyy") : ""}
                onClick={() => setShowCalendar(!showCalendar)}
                placeholder="MM/DD/YYYY"
                className={`w-full max-w-xs cursor-pointer rounded-md border px-3 py-2 text-black ${
                  errors.appointment_date ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-slate-500`}
              />

              {showCalendar && (
                <div className="absolute z-10 mt-1 w-[280px] sm:w-[320px] rounded-md border border-gray-300 bg-white shadow-lg">
                  <div className="p-2 sm:p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-black hover:bg-slate-100"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>

                      <div className="text-center text-sm sm:text-base font-medium text-black">
                        {format(currentMonth, "MMMM yyyy")}
                      </div>

                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-black hover:bg-slate-100"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mb-2 grid grid-cols-7 gap-1">
                      {daysOfWeek.map((day) => (
                        <div key={day} className="text-center text-xs text-slate-600">
                          {day.charAt(0)}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((date, i) => {
                        if (!date) {
                          return <div key={`empty-${i}`} className="h-6 w-6 sm:h-8 sm:w-8"></div>
                        }

                        const isPast = date < today
                        const isSelected =
                          formData.appointment_date &&
                          format(formData.appointment_date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")

                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => (!isPast ? handleDateChange(date) : null)}
                            disabled={isPast}
                            className={`mx-auto flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs
                              ${isPast ? "text-gray-400" : "text-slate-700"}
                              ${isSelected ? "bg-slate-700 text-white" : "hover:bg-slate-100"}
                            `}
                          >
                            {date.getDate()}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {errors.appointment_date && <p className="mt-1 text-sm text-red-500">{errors.appointment_date}</p>}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Day: Select one</label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleDaySelect(day)}
                className={`rounded-md py-2 text-center text-xs sm:text-sm ${
                  formData.selected_day === day
                    ? "bg-[#f8d0d0] text-slate-700"
                    : "border border-gray-300 bg-white text-slate-700 hover:bg-slate-50"
                } `}
              >
                {day}
              </button>
            ))}
          </div>
          {errors.selected_day && <p className="mt-1 text-sm text-red-500">{errors.selected_day}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Time: Select one</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            {["Morning", "Afternoon", "Evening"].map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => handleTimeSlotSelect(slot as TimeSlot)}
                className={`rounded-md border px-4 py-2 text-center text-sm ${
                  formData.time_slot === slot
                    ? "border-[#f8d0d0] bg-[#f8d0d0] text-slate-700"
                    : "border-gray-300 bg-white text-slate-700 hover:bg-slate-50"
                } `}
              >
                {slot}
              </button>
            ))}
          </div>
          {errors.time_slot && <p className="mt-1 text-sm text-red-500">{errors.time_slot}</p>}
        </div>

        <div>
          <label htmlFor="notes" className="mb-1 block text-sm font-medium text-slate-600">
            Notes for your sitter
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500 text-black"
            placeholder="Does your pet have any special needs, preferences, treats, etc."
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-slate-700 px-4 sm:px-6 py-2 text-sm sm:text-base font-medium text-white hover:bg-slate-900 cursor-pointer"
          >
            {isSubmitting ? "Scheduling..." : "Schedule Service"}
          </button>
        </div>
      </form>

      {isSuccess && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md max-w-4xl mx-auto">
          <p className="text-green-700 text-center font-medium">
            Your appointment has been scheduled successfully! We'll be in touch soon.
          </p>
        </div>
      )}
    </div>
  )
}

export default AppointmentForm
