import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Logout from './Auth/Logout'
import appwriteAuth from '../Appwrite/Auth'
import { logIn } from '../Redux/Slicer'
import Profilemenu from './Profilemenu'
import { X } from 'lucide-react'
import Popup from './Popup'
import appwriteData from '../Appwrite/Data'

function Header() {

  const [menuhide, setMenuHide] = useState(false)
   
  const dispatch = useDispatch()
  const photo = useSelector((state) => state.auth.userPhoto)
  const status = useSelector((state) => state.auth.userData)

  async function fetchStatus() {
    const res = await appwriteAuth.getUser()
    if (typeof res == 'object') {
     
      dispatch(logIn(res))
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])
  console.log(status)



  const headerColor = useSelector((state) => state.theme.headerColor)

  return (
    <>
      <div className = {`${headerColor} p-4 flex justify-between items-center relative`}>
        {/* Left Side: Blog App Title */}
        <h1 className="text-2xl font-bold">Blog App</h1>

        {/* Right Side: Profile Avatar */}

        {status != null ? (
          <>
            {menuhide ? <X className='w-12 h-12' onClick={() => setMenuHide((prev) => !prev ? true : false)} /> : (
              <img
                onClick={() => setMenuHide((prev) => !prev ? true : false)}
                src={photo ? photo : 'https://cdn4.iconfinder.com/data/icons/man-6/48/man-09-128.png'}
                alt="Profile"
                className="w-12 h-12 object-cover object-center rounded-2xl border-2 border-white "
              />
            )}

            {menuhide && <Profilemenu setMenuHide={setMenuHide} />}

          </>
        ) : (<div className='flex gap-4 items-center '>
          <NavLink to='/login'>
            <button className="inline-flex items-center bg-white text-blue-500 border-0 py-2 px-3 focus:outline-none hover:bg-blue-500 hover:text-white rounded text-base  ">Log In
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </NavLink>
          <NavLink to='/signup'>
            <button className="inline-flex items-center bg-white text-blue-500 border-0 py-2 px-3 focus:outline-none hover:bg-blue-500 hover:text-white rounded text-base ">Sign Up
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </NavLink>
        </div>)}
      </div>

    </>
  )
}

export default Header