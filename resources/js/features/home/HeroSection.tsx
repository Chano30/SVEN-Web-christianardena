"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import Navigation from "@/features/component/Navigation"

const HeroSection = forwardRef(({ onAboutClick, onScheduleClick }, ref) => {
  return (
    <div ref={ref} className="relative h-screen">
      {/* Background image with a subtle overlay */}
      <div className="absolute inset-0 bg-gray-700/40 z-10"></div>
      <div className="absolute inset-0">
        <img
          src="/images/bgDoggy.png"
          alt="Happy dog"
          className="w-full h-full object-cover object-center sm:object-right"
          style={{ filter: "brightness(0.85) contrast(1.1)" }}
        />
      </div>

      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col">
        {/* Navigation */}
        <Navigation onAboutClick={onAboutClick} onScheduleClick={onScheduleClick} />

        {/* Hero content - centered on mobile, positioned on the right on larger screens */}
        <div className="flex flex-col justify-center flex-grow">
          <div className="mx-auto sm:mx-0 sm:ml-auto max-w-md px-4 sm:px-0 text-center sm:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              We care for
              <br />
              your furry little
              <br />
              loved ones
              <br />
              while
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 sm:mt-6"
            >
              <button
                onClick={onScheduleClick}
                className="rounded-full bg-white text-slate-700 hover:bg-gray-100 px-5 py-2 sm:px-6 text-sm sm:text-base font-medium transition-colors cursor-pointer"
              >
                Schedule a visit
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pb-6 sm:pb-8 text-center sm:text-left">
          <span className="text-white/70 text-xs sm:text-sm">Scroll to explore</span>
        </div>
      </div>
    </div>
  )
})

HeroSection.displayName = "HeroSection"

export default HeroSection
