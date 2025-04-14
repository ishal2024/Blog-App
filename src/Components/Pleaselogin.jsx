import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Pleaselogin() {
  
    const cardColor = useSelector((state) => state.theme.cardColor)
  return (
    <div className="my-[150px]  flex justify-center ">
    <div className={` p-8 shadow-lg ${cardColor}  rounded-lg text-center w-96`}>
      <h2 className="text-2xl font-semibold ">🔒 Please Login</h2>
      <p className=" mt-2">You need to log in to access this page.</p>
      
      <NavLink to='/login'><button  className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition">
        Login
      </button></NavLink>
    </div>
  </div>
  )
}

export default Pleaselogin