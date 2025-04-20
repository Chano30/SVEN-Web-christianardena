"use client"

import { forwardRef } from "react"
import ServiceInfo from "@/features/appointment/ServiceInfo"
import AppointmentForm from "@/features/appointment/AppointmentForm"

const AppointmentSection = forwardRef(({ onLogoClick }, ref) => {
  return (
    <div ref={ref} className="min-h-screen">
      <div className="grid md:grid-cols-2 h-screen">
        <ServiceInfo onLogoClick={onLogoClick} />
        <AppointmentForm />
      </div>
    </div>
  )
})

AppointmentSection.displayName = "AppointmentSection"

export default AppointmentSection
