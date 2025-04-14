import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Delete from './Delete'
import Edit from './Edit'
import { useSelector } from 'react-redux'

function Blogdetails() {

    const location = useLocation()
    const navigate = useNavigate()
    const {item , img} = location.state
    console.log(item , img)
    const bgcolor = useSelector((state) => state.theme.bgcolor)


  return (
    <div className={`max-w-3xl ${bgcolor} mx-auto p-6`}>
  {/* Title */}
  <h1 className="text-3xl font-bold  text-center">{item.title}</h1>

  {/* Image Container with Buttons */}
  <div className="relative mt-4">
    <img
      src={img}
      alt={item.title}
      className="w-full h-[400px] object-cover rounded-lg shadow-lg"
    />

    {item.status == 'active' && (
      <div className="absolute top-4 right-4 flex gap-2">
        <Edit item={item} img={img} />
        <Delete blogid={item.$id} />
      </div>
    )}
  </div>

  {/* Content */}
  <div className="mt-6 text-lg  leading-relaxed">
    {item.content}
  </div>

  {/* Go Back Button */}
  <div className="mt-6 flex justify-center">
    <button 
      onClick={() => navigate(-1)} 
      className="px-4 py-2 bg-red-600 hover:bg-gray-300 text-white rounded-lg shadow"
    >
      Go Back
    </button>
  </div>
</div>
  )
}

export default Blogdetails