import React, { useEffect, useState } from 'react'
import appwriteData from '../Appwrite/Data'
import { useSelector } from 'react-redux'
import Card from './Card'
import Popup from './Popup'
import {ScaleLoader} from 'react-spinners'
import Pleaselogin from './Pleaselogin'
import { NavLink } from 'react-router-dom'



function Home() {

    const userId = useSelector((state) => state.auth.userData)
    const pop = useSelector((state) => state.auth.pop)
    const [data, setData] = useState([])
    const [loader , setLoader] = useState(false)

    async function fetchBlogs() {
        try {
            const res = await appwriteData.getBlogs(userId.$id)
            setData(res.documents)
            setLoader(true)
        } catch (error) {
            console.log(error.message)
            setLoader(true)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [userId])
    console.log(data)

    const spin = useSelector((state) => state.theme.spinner)

    if(!loader){
      return (
        <div className=' flex justify-center items-center w-[98vw] overflow-y-hidden h-[70vh]'>
         <ScaleLoader color={spin} />
        </div>
      )
    }

    return (
      <>
      
        {userId != null ? (
        <div className="grid grid-cols-1 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 justify-center">
          
        {data.length > 0 ? (
          data.map((item) => (
            <Card key={item.slug} item = {item}  fileId={item.fileId} title={item.title} />
          ))
        ) : (
          <>
          <div className='mt-2  w-[98vw] flex items-center justify-center'>
  <div className="flex w-[70vw] flex-col items-center justify-center min-h-[60vh]  p-6 rounded-lg ">
  <svg
    className="w-32 h-32  animate-bounce"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13V3"></path>
  </svg>
  <h2 className="text-xl font-semibold  mt-4">
    No Blogs Available
  </h2>
  <p className=" text-center mt-2">
    Looks like there are no blogs yet. Start by adding a new one!
  </p>
  <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
  <NavLink to='/addblog'>Add Blog</NavLink>
  </button>
</div>
</div>
 



          </>
        )}
      </div>) : <Pleaselogin /> }
      </>
    )
}

export default Home