import React from 'react'

function NewLetterBox() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your subscription logic here
  }

  return (
    <div className="w-full min-h-[40vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center justify-center gap-6 py-8 px-4">
      
      {/* Title */}
      <p className="text-lg md:text-2xl lg:text-3xl text-[#a5faf7] font-semibold text-center">
        Subscribe now & get 20% off
      </p>
      
      {/* Subtitle */}
      <p className="text-sm md:text-base lg:text-lg text-center text-blue-100 font-semibold max-w-2xl">
        Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
      </p>
      
      {/* Form */}
      <form 
        onSubmit={handleSubmit} 
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
      >
        <input 
          type="email" 
          placeholder="Enter Your Email" 
          className="placeholder:text-black bg-slate-300 w-full sm:w-[70%] md:w-[50%] h-12 px-4 rounded-lg shadow-sm shadow-black" 
          required 
        />
        <button 
          type="submit" 
          className="text-sm md:text-base px-6 py-2 hover:bg-slate-500 cursor-pointer bg-[#2e3030c9] text-white border border-[#80808049] rounded-lg shadow-sm shadow-black"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewLetterBox
