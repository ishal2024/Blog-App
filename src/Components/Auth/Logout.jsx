import React from 'react'
import appwriteAuth from '../../Appwrite/Auth'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut, popHide, popUp } from '../../Redux/Slicer'

function Logout({className}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

    async function handleLogout() {
        try {
          const res = await appwriteAuth.logout()
          dispatch(logOut())
          dispatch(popUp({text : "User is Logged Out" , colour : "bg-red-500 text-white"}))
            setTimeout(() => dispatch(popHide()), 2000);
          
            navigate('/')
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <NavLink to='/login'>
    <button onClick={handleLogout} className={`inline-flex ${className} items-center border-0 py-1 px-3 focus:outline-none  rounded text-base `}>Log Out
    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7"></path>
    </svg>
  </button>
   </NavLink>
  )
}

export default Logout