import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Lists from './pages/Lists'
import Orders from './pages/Orders'
import Login from './pages/Login'
import { adminDataContext } from './context/AdminContext'
  import { ToastContainer, toast } from 'react-toastify';
import AddCategory from './pages/AddCategory'
import AddSubCategory from './pages/AddSubCategory'

function App() {
  let {adminData} = useContext(adminDataContext)
  return (

    <>
      <ToastContainer />
    {!adminData ? <Login/> : <>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/addcategory' element={<AddCategory/>}/>
        <Route path='/addsubcategory' element={<AddSubCategory />} />
        <Route path='/lists' element={<Lists/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </>
      }
    </>
  )
}

export default App
