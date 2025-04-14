import React from 'react'
import Logout from './Auth/Logout'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Profilemenu({ setMenuHide}) {
  const headerColor = useSelector((state) => state.theme.headerColor)
  return (
    // <div className='h-[130px] z-10 w-[150px] text-white font-bold list-none bg-blue-700 rounded-2xl absolute top-22 right-5 '>
    //     <NavLink to='/profile' onClick={() => setMenuHide(false)} className='p-4 hover:bg-blue-500'>User Profile</NavLink>
    //     <hr />
    //     <NavLink onClick={() => setMenuHide(false)} className='hover:bg-blue-500'><Logout className="bg-blue-700 hover:bg-blue-500 text-white mt-0" /></NavLink>
    // </div>
    <div className={`absolute ${headerColor} z-10 w-40  font-bold rounded-lg shadow-md right-5 top-20`}>
  <ul className="flex flex-col">
    <li>
      <NavLink
        to="/profile"
        onClick={() => setMenuHide(false)}
        className="block px-4 py-3 hover:bg-blue-500 transition duration-300"
      >
        User Profile
      </NavLink>
    </li>
    <hr className="border-blue-500" />
    <li>
      <NavLink
        onClick={() => setMenuHide(false)}
        className="block px-1 py-2 hover:bg-blue-500 transition duration-300"
      >
        <Logout className={`${headerColor} hover:bg-blue-500  mt-0`} />
      </NavLink>
    </li>
  </ul>
</div>

  )
}

export default Profilemenu