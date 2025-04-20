"use client"

import Logo from "@/features/component/Logo"

const ServiceInfo = ({ onLogoClick }) => {
  return (
    <div className="bg-slate-700 text-white p-8 md:p-18 flex flex-col justify-center items-center h-full">
      <div className="flex items-center mb-8 cursor-pointer" onClick={onLogoClick}>
        <Logo color="white" />
      </div>

      <div className="mb-8">
        <h4 className="font-extrabold text-3xl mb-8">All services include:</h4>
        <ul className="space-y-8">
          <li className="flex items-start text-xl">
            <span className="mr-2">•</span>
            <span>A photo update for you during the visit</span>
          </li>
          <li className="flex items-start text-xl">
            <span className="mr-2">•</span>
            <span>Notification of your arrival</span>
          </li>
          <li className="flex items-start text-xl">
            <span className="mr-2">•</span>
            <span>Treats for your pet, with your permission</span>
          </li>
        </ul>
      </div>

      <div className="mt-auto">
        <img src="/images/furryDog.png" alt="Cute puppy" className="rounded-lg w-full max-w-xs mx-auto" />
      </div>
    </div>
  )
}

export default ServiceInfo
