import React from 'react'
import logo from "../assets/logo.png"

function Footer() {
  return (
    <div className="w-full bg-[#dbfcfcec]">
      
      {/* Top Section */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-12 py-8 gap-8">
        
        {/* Logo + Description */}
        <div className="w-full md:w-1/3 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-8 h-8 md:w-10 md:h-10" />
            <p className="text-lg md:text-xl text-black font-semibold">OneCart</p>
          </div>
          <p className="text-sm md:text-base text-[#1e2223] hidden md:block">
            OneCart is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery—all backed by trusted service designed to make your life easier every day.
          </p>
          <p className="text-sm text-[#1e2223] md:hidden">
            Fast. Easy. Reliable. OneCart Shopping
          </p>
        </div>

        {/* Company Links */}
        <div className="w-full md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <p className="text-lg md:text-xl text-[#1e2223] font-semibold">COMPANY</p>
          <ul className="space-y-1">
            <li className="text-sm md:text-base text-[#1e2223] cursor-pointer hidden md:block">Home</li>
            <li className="text-sm md:text-base text-[#1e2223] cursor-pointer">About us</li>
            <li className="text-sm md:text-base text-[#1e2223] cursor-pointer hidden md:block">Delivery</li>
            <li className="text-sm md:text-base text-[#1e2223] cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <p className="text-lg md:text-xl text-[#1e2223] font-semibold">GET IN TOUCH</p>
          <ul className="space-y-1">
            <li className="text-sm md:text-base text-[#1e2223]">+91-9876543210</li>
            <li className="text-sm md:text-base text-[#1e2223]">contact@onecart.com</li>
            <li className="text-sm md:text-base text-[#1e2223] hidden md:block">+1-123-456-7890</li>
            <li className="text-sm md:text-base text-[#1e2223] hidden md:block">admin@onecart.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-slate-400"></div>

      {/* Bottom Section */}
      <div className="w-full py-4 flex items-center justify-center text-xs md:text-sm text-[#1e2223]">
        © 2025 OneCart.com — All Rights Reserved
      </div>
    </div>
  )
}

export default Footer
