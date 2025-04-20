const Logo = ({ color = "white" }) => {
    return (
      <div className="flex items-center">
        <div className="bg-[#fdf5f5] rounded-full p-1.5 flex items-center justify-center w-8 h-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 text-purple-800"
            fill="currentColor"
          >
            <path d="M12,8.5A1.5,1.5,0,1,0,13.5,10,1.5,1.5,0,0,0,12,8.5Zm-3.5,3A1.5,1.5,0,1,0,10,13,1.5,1.5,0,0,0,8.5,11.5Zm7,0A1.5,1.5,0,1,0,17,13,1.5,1.5,0,0,0,15.5,11.5ZM12,2a10,10,0,0,0-10,10c0,5.2,4.1,9.4,9.3,10V19.5A7.5,7.5,0,1,1,19.5,12,7.5,7.5,0,0,1,12,19.5V22c5.2-.6,9.3-4.8,9.3-10A10,10,0,0,0,12,2ZM8.5,5A1.5,1.5,0,1,1,7,6.5,1.5,1.5,0,0,1,8.5,5Zm7,0A1.5,1.5,0,1,1,14,6.5,1.5,1.5,0,0,1,15.5,5Z" />
          </svg>
        </div>
        <span className={`ml-2 text-${color} font-bold text-xl`}>PAWTASTIC</span>
      </div>
    )
  }

  export default Logo
