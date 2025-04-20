"use client"

import Logo from "@/features/component/Logo"

const Navigation = ({ onAboutClick, onScheduleClick }) => {
  return (
    <nav className="flex justify-between items-center py-6">
      <div className="flex items-center">
        <Logo color="white" />
      </div>
      <div className="flex space-x-6 text-white">
        <button onClick={onAboutClick} className="hover:underline transition-all">
          About us
        </button>
        <button onClick={onScheduleClick} className="hover:underline transition-all">
          Schedule a visit
        </button>
      </div>
    </nav>
  )
}

export default Navigation
