import React from 'react'
import appwriteData from '../Appwrite/Data'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { popHide, popUp } from '../Redux/Slicer'

function Delete({blogid}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleDelete(){
        try {
            const res = await appwriteData.deleteDocument(blogid)
            
            dispatch(popUp({text : "Blog is Deleted" , colour : `bg-red-500 text-white`}))
            setTimeout(() => dispatch(popHide()), 3000);
            navigate('/')
        } catch (error) {
           console.log(error.message) 
        }
    }

  return (
    <button
    onClick={handleDelete}    
    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition">
    Delete
  </button>
  )
}

export default Delete