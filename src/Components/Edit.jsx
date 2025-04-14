import React from 'react'
import { useNavigate } from 'react-router-dom'

function Edit({item , img}) {

    const navigate = useNavigate()
   
    async function handleUpdate() {
        try {
            navigate('/addblog' , 
         {state : {title : item.title ,content : item.content ,slug : item.slug , status : item.status, blogid : item.$id , img}})
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
          Edit
        </button>
  )
}

export default Edit