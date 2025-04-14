import { LogOut } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from './Auth/Logout'
import { useSelector } from 'react-redux'

function Setting() {
     const cardColor = useSelector((state) => state.theme.cardColor)
  return (
    <div className="max-w-3xl mx-auto  p-6">
    {/* Header */}
    <h1 className="text-3xl font-bold  text-center mb-6">Settings</h1>

    {/* Settings Sections */}
    <div className="grid gap-4 ">
      <button className={`p-4 ${cardColor} hover:bg-blue-500 hover:text-white rounded-lg shadow `}><NavLink  to='/'>All Blogs</NavLink></button>
      <button className={`p-4 ${cardColor} hover:bg-blue-500 hover:text-white rounded-lg shadow `}><NavLink to='/addblog'>Add Blog</NavLink></button>
      <button className={`p-4 ${cardColor} hover:bg-blue-500 hover:text-white rounded-lg shadow `}><NavLink to='/activeblog'>Active Blogs</NavLink></button>
      <button className={`p-4 ${cardColor} hover:bg-blue-500 hover:text-white rounded-lg shadow `}><NavLink to='/profile'>User Profile</NavLink></button>
      <button className={`p-4 ${cardColor} hover:bg-blue-500 hover:text-white rounded-lg shadow `}><NavLink to='/theme'>Theme Changer</NavLink></button>
      <button className="p-4 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"><Logout className="bg-red-500 hover:bg-red-600 text-white mt-0" /></button>
    </div>
  </div>
  )
}

export default Setting