"use client"

import { useState } from "react"

export const useAppointmentValidation = () => {
  const [errors, setErrors] = useState({})

  const validateForm = (formData) => {
    const newErrors = {}
    let isValid = true

    if (!formData.pet_name?.trim()) {
      newErrors.pet_name = "Pet name is required"
      isValid = false
    }

    if (!formData.appointment_date) {
      newErrors.appointment_date = "Date is required"
      isValid = false
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (formData.appointment_date < today) {
        newErrors.appointment_date = "Date must be current or future date"
        isValid = false
      }
    }

    if (!formData.time_slot) {
      newErrors.time_slot = "Time slot is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
    }
  }

  return { errors, validateForm, clearError }
}
