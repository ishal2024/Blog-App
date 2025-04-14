import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { changeTheme } from '../Redux/ThemeSlicer'
import {Undo2} from 'lucide-react'
import { useNavigate } from 'react-router-dom'


function ThemeChanger() {
  const bgColor = useSelector((state) => state.theme.bgColor)
  const cardColor = useSelector((state) => state.theme.cardColor)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function handleDark(){
      dispatch(changeTheme(
        {header : 'bg-[#121212] text-white' ,
           card : 'bg-[#121212] text-white ' ,
            bg : ' bg-[#1E1E1E] text-white' ,
            footer : 'bg-[#121212] text-white' ,
            active : 'bg-red-500 text-white',
            spin : 'white'
          }
      ))
  }

  function handleLight(){
    dispatch(changeTheme(
      {header : 'bg-blue-600 text-white' ,
         card : 'bg-white text-gray-800 ' ,
          bg : ' bg-gray-100 text-gray-800' ,
          footer : 'bg-white text-gray-800' ,
          active : 'bg-blue-500 text-white',
          spin : 'black'
        }
    ))
}
  return (
    <div className={`min-h-screen ${bgColor}  p-6 flex flex-col items-center`}>

    {/* Header Section */}
    <div className="w-full max-w-md flex items-center justify-between mb-6">
      <button onClick={() => navigate(-1)} className=" px-3 py-2 rounded-lg ">
      <Undo2 />
      </button>
      <h1 className="text-xl font-semibold">Theme Changer</h1>
      <div className="w-12"></div> {/* Spacer for alignment */}
    </div>

    {/* Theme Options */}
    <div className="w-full max-w-md space-y-3">
      <button onClick={handleDark} className={`w-full p-3 ${cardColor}`}>
        Dark Theme
      </button>
      <button onClick={handleLight} className="w-full p-3 text-black bg-white rounded-lg hover:bg-gray-200">
        Light Theme
      </button>
      
    </div>
  </div>
  )
}

export default ThemeChanger