import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart, MdContacts } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';

function Nav() {
  const { getCurrentUser, userData } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      console.log(result.data)
      getCurrentUser(null);
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full h-16 bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-4 md:px-8 shadow-md shadow-black">
      
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" className="w-8 md:w-10" />
        <h1 className="text-lg md:text-2xl text-black font-sans">OneCart</h1>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex items-center gap-4 text-white">
          <li className="text-sm md:text-base hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2 px-4 rounded-2xl" onClick={() => navigate("/")}>HOME</li>
          <li className="text-sm md:text-base hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2 px-4 rounded-2xl" onClick={() => navigate("/collection")}>COLLECTIONS</li>
          <li className="text-sm md:text-base hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2 px-4 rounded-2xl" onClick={() => navigate("/about")}>ABOUT</li>
          <li className="text-sm md:text-base hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2 px-4 rounded-2xl" onClick={() => navigate("/contact")}>CONTACT</li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {!showSearch && (
          <IoSearchCircleOutline 
            className="w-9 h-9 text-black cursor-pointer" 
            onClick={() => { setShowSearch(prev => !prev); navigate("/collection") }} 
          />
        )}
        {showSearch && (
          <IoSearchCircleSharp 
            className="w-9 h-9 text-black cursor-pointer" 
            onClick={() => setShowSearch(prev => !prev)} 
          />
        )}

        {!userData && (
          <FaCircleUser 
            className="w-7 h-7 text-black cursor-pointer" 
            onClick={() => setShowProfile(prev => !prev)} 
          />
        )}
        {userData && (
          <div 
            className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center cursor-pointer" 
            onClick={() => setShowProfile(prev => !prev)}
          >
            {userData?.name.slice(0, 1)}
          </div>
        )}

        {/* Cart (desktop only) */}
        <div className="relative hidden md:block">
          <MdOutlineShoppingCart 
            className="w-8 h-8 text-black cursor-pointer" 
            onClick={() => navigate("/cart")} 
          />
          <p className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-black text-white rounded-full text-xs">
            {getCartCount()}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="w-full h-20 bg-[#d8f6f9dd] absolute top-full left-0 flex items-center justify-center">
          <input 
            type="text" 
            className="w-[80%] md:w-[50%] h-12 bg-[#233533] rounded-full px-6 placeholder:text-white text-white text-base" 
            placeholder="Search Here" 
            onChange={(e) => setSearch(e.target.value)} 
            value={search} 
          />
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute w-56 bg-[#000000d7] top-full right-4 border border-gray-400 rounded-lg z-10">
          <ul className="flex flex-col text-white text-sm md:text-base">
            {!userData && (
              <li className="hover:bg-[#2f2f2f] px-4 py-2 cursor-pointer" onClick={() => { navigate("/login"); setShowProfile(false) }}>Login</li>
            )}
            {userData && (
              <li className="hover:bg-[#2f2f2f] px-4 py-2 cursor-pointer" onClick={() => { handleLogout(); setShowProfile(false) }}>Logout</li>
            )}
            <li className="hover:bg-[#2f2f2f] px-4 py-2 cursor-pointer" onClick={() => { navigate("/order"); setShowProfile(false) }}>Orders</li>
            <li className="hover:bg-[#2f2f2f] px-4 py-2 cursor-pointer" onClick={() => { navigate("/about"); setShowProfile(false) }}>About</li>
          </ul>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <div className="w-full h-20 flex items-center justify-around px-4 text-xs fixed bottom-0 left-0 bg-[#191818] md:hidden">
        <button className="text-white flex flex-col items-center gap-1" onClick={() => navigate("/")}>
          <IoMdHome className="w-7 h-7" /> Home
        </button>
        <button className="text-white flex flex-col items-center gap-1" onClick={() => navigate("/collection")}>
          <HiOutlineCollection className="w-7 h-7" /> Collections
        </button>
        <button className="text-white flex flex-col items-center gap-1" onClick={() => navigate("/contact")}>
          <MdContacts className="w-7 h-7" /> Contact
        </button>
        <div className="relative">
          <button className="text-white flex flex-col items-center gap-1" onClick={() => navigate("/cart")}>
            <MdOutlineShoppingCart className="w-7 h-7" /> Cart
          </button>
          <p className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-white text-black font-semibold rounded-full text-xs">
            {getCartCount()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Nav
