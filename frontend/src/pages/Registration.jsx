import React, { useState, useContext } from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { authDataContext } from '../context/AuthContext';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function Registration() {
  const [show, setShow] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const { getCurrentUser } = useContext(userDataContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const result = await axios.post(serverUrl + '/api/auth/registration', {
        name, email, password, phone
      }, { withCredentials: true })
      getCurrentUser()
      navigate("/")
      toast.success("User Registration Successful")
      console.log(result.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error("User Registration Failed")
      setLoading(false)
    }
  }

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      let user = response.user
      let name = user.displayName;
      let email = user.email

      const result = await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true })
      console.log(result.data)
      getCurrentUser()
      navigate("/")
      toast.success("User Registration Successful")
    } catch (error) {
      console.log(error)
      toast.error("User Registration Failed")
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full h-20 flex items-center px-6 gap-3 cursor-pointer" onClick={() => navigate("/")}>
        <img className="w-10" src={Logo} alt="logo" />
        <h1 className="text-lg md:text-xl font-sans">OneCart</h1>
      </div>

      {/* Title */}
      <div className="w-full flex flex-col items-center gap-2 mb-6">
        <span className="text-xl md:text-2xl font-semibold">Registration Page</span>
        <span className="text-sm md:text-base">Welcome to OneCart, Place your order</span>
      </div>

      {/* Form Card */}
      <div className="w-[90%] max-w-md bg-[#00000025] border border-[#96969635] rounded-lg shadow-lg p-6">
        <form onSubmit={handleSignup} className="flex flex-col items-center gap-5">
          
          {/* Google Signup */}
          <div 
            className="w-full h-12 bg-[#42656cae] rounded-lg flex items-center justify-center gap-3 cursor-pointer" 
            onClick={googleSignup}
          >
            <img src={google} alt="google" className="w-5" /> 
            <span className="text-sm md:text-base">Register with Google</span>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center gap-3">
            <div className="flex-1 h-px bg-[#96969635]"></div>
            <span className="text-xs md:text-sm">OR</span>
            <div className="flex-1 h-px bg-[#96969635]"></div>
          </div>

          {/* Inputs */}
          <input 
            type="text" 
            className="w-full h-12 border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-4 font-semibold" 
            placeholder="UserName" 
            required 
            onChange={(e) => setName(e.target.value)} 
            value={name}
          />

          <input 
            type="tel" 
            className="w-full h-12 border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-4 font-semibold" 
            placeholder="Phone Number" 
            required 
            onChange={(e) => setPhone(e.target.value)} 
            value={phone}
          />

          <input 
            type="text" 
            className="w-full h-12 border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-4 font-semibold" 
            placeholder="Email" 
            required 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
          />

          {/* Password with Eye Toggle */}
          <div className="relative w-full">
            <input 
              type={show ? "text" : "password"} 
              className="w-full h-12 border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-4 font-semibold" 
              placeholder="Password" 
              required 
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
            />
            {show ? (
              <IoEye 
                className="absolute right-3 top-3 w-5 h-5 cursor-pointer" 
                onClick={() => setShow(false)} 
              />
            ) : (
              <IoEyeOutline 
                className="absolute right-3 top-3 w-5 h-5 cursor-pointer" 
                onClick={() => setShow(true)} 
              />
            )}
          </div>

          {/* Submit Button */}
          <button className="w-full h-12 bg-[#6060f5] rounded-lg flex items-center justify-center text-base font-semibold mt-2">
            {loading ? <Loading /> : "Create Account"}
          </button>

          {/* Login Link */}
          <p className="text-sm md:text-base flex gap-2">
            Already have an account? 
            <span 
              className="text-[#5555f6cf] font-semibold cursor-pointer" 
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Registration
