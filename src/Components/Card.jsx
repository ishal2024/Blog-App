import React, { useEffect, useState } from 'react'
import appwriteData from '../Appwrite/Data'
import { NavLink ,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Card({item , fileId , title}) {

  const [img,setImg] = useState(null)
  const navigate = useNavigate()
   async function fetchImage(){
        try {
            const url = await appwriteData.getFile(fileId)
            
            
            setImg(url)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchImage()
    },[])

    function handleNavigate(){
      navigate(`/:${title}` ,{state : {item , img}})
    }

   const Cardcolor = useSelector((state) => state.theme.cardColor)

  return (
    
    <div onClick={handleNavigate} className={` ${Cardcolor}  rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 w-full sm:w-80 mx-auto`}>
    <img
      src={img}
      alt={title}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h2 className="text-xl font-semibold  truncate">{title}</h2>
    </div>
  </div>
 
  )
}

export default Card