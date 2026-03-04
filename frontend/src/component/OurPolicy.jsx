import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className="w-full min-h-screen md:min-h-[70vh] flex flex-col items-center bg-gradient-to-l from-[#141414] to-[#0c2025] py-12 px-4 gap-12">
      
      {/* Title */}
      <div className="text-center">
        <Title text1="OUR" text2="POLICY" />
        <p className="w-full mx-auto text-xs md:text-lg px-4 text-blue-100">
          Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
        </p>
      </div>

      {/* Policy Items */}
      <div className="w-full flex flex-wrap items-center justify-center gap-8 md:gap-12">
        
        {/* Easy Exchange */}
        <div className="w-full sm:w-[300px] md:w-[350px] flex flex-col items-center gap-3 text-center">
          <RiExchangeFundsLine className="w-10 h-10 md:w-16 md:h-16 text-[#90b9ff]" />
          <p className="font-semibold text-lg md:text-2xl text-[#a5e8f7]">Easy Exchange Policy</p>
          <p className="text-sm md:text-base text-[aliceblue]">
            Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        {/* Return Policy */}
        <div className="w-full sm:w-[300px] md:w-[350px] flex flex-col items-center gap-3 text-center">
          <TbRosetteDiscountCheckFilled className="w-10 h-10 md:w-16 md:h-16 text-[#90b9ff]" />
          <p className="font-semibold text-lg md:text-2xl text-[#a5e8f7]">7 Days Return Policy</p>
          <p className="text-sm md:text-base text-[aliceblue]">
            Shop with Confidence – 7 Days Easy Return Guarantee.
          </p>
        </div>

        {/* Customer Support */}
        <div className="w-full sm:w-[300px] md:w-[350px] flex flex-col items-center gap-3 text-center">
          <BiSupport className="w-10 h-10 md:w-16 md:h-16 text-[#90b9ff]" />
          <p className="font-semibold text-lg md:text-2xl text-[#a5e8f7]">Best Customer Support</p>
          <p className="text-sm md:text-base text-[aliceblue]">
            Trusted Customer Support – Your Satisfaction Is Our Priority.
          </p>
        </div>

      </div>
    </div>
  )
}

export default OurPolicy
