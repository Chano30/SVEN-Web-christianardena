"use client"

import { useRef } from "react"
import HeroSection from "@/features/home/HeroSection"
import AboutSection from "@/features/home/AboutSection"
import AppointmentSection from "@/features/appointment/AppointmentSection"
// import AppointmentSection from "../appointment/AppointmentSection"

const HomePage = () => {
  const aboutRef = useRef(null)
  const appointmentRef = useRef(null)
  const topRef = useRef(null)

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="flex min-h-screen flex-col font-sans">
      <HeroSection
        ref={topRef}
        onAboutClick={() => scrollTo(aboutRef)}
        onScheduleClick={() => scrollTo(appointmentRef)}
      />
    <AboutSection ref={aboutRef} onScheduleClick={() => scrollTo(appointmentRef)} />
      <AppointmentSection ref={appointmentRef} onLogoClick={() => scrollTo(topRef)} />
    </main>
  )
}

export default HomePage
