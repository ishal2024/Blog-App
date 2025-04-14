import React from 'react'

import {FilePlus , NotebookTabs ,House ,Settings} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Footer() {

  const userId = useSelector((state) => state.auth.userData)
  const footerColor = useSelector((state) => state.theme.footerColor)
  const activeColor = useSelector((state) => state.theme.activeColor)
  return (
    <footer className={` ${footerColor}   p-4 fixed bottom-0 w-full shadow-md border-t flex justify-around`}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex-1 flex justify-center items-center p-3 ${isActive ? activeColor : ""}`
        }
      >
       <House />
      </NavLink>
      
      
      
     {userId &&  (
      <>
      <NavLink
        to="/addblog"
        className={({ isActive }) =>
          `flex-1 flex justify-center items-center p-3 ${isActive ? activeColor : ""}`
        }
      >
 <FilePlus />

      </NavLink>
      <NavLink
        to="/activeblog"
        className={({ isActive }) =>
          `flex-1 flex justify-center items-center p-3 ${isActive ? activeColor : ""}`
        }
      >
  <NotebookTabs />

      </NavLink>
      <NavLink
        to="/setting"
        className={({ isActive }) =>
          `flex-1 flex justify-center items-center p-3 ${isActive ? activeColor : ""}`
        }
      >
      <Settings />

      </NavLink></>)}
    </footer>
  )
}

export default Footer