import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import appwriteData from '../Appwrite/Data'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { popHide, popUp } from '../Redux/Slicer'

function Addblog() {

    const [loader,setLoader] = useState(false)
    const [slugval , setSlug] = useState()
    const userId = useSelector((state) => state.auth.userData)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {title , status , slug , content ,blogid , img } = location.state || {}
    const {register,handleSubmit,setValue , watch ,  formState: { errors }} = useForm({defaultValues : {
        title : title || "",
        slug : slug || "",
        content : content || "",
        status : status || "active",
    }})

    console.log(blogid)

    async function handlePost(data) {
        
        console.log("handlePost function called!");
        setLoader(true)
        if(img !== undefined){
            try {
                const res = await appwriteData.updateDocument(blogid , data)
                setLoader(false)
                
                dispatch(popUp({text : "Blog is Updated" , colour : `bg-green-500 text-white`}))
                setTimeout(() => dispatch(popHide()), 3000);
                navigate('/')    
            } catch (error) {
                console.log(error.message)
            }
        }
        else{
            try {
                const actualFile = data.file instanceof FileList ? data.file[0] : data.file;
                const fileres = await appwriteData.uploadImage(actualFile)
                
                const res = await appwriteData.createBlog({
                    title : data.title,slug : data.slug,content : data.content,status : data.status, userId : userId.$id , fileId : fileres.$id
                })
                if(res){ 
                    setLoader(false)
                    
                    navigate('/')   
                    dispatch(popUp({text : "Blog is Uploaded" , colour : `bg-green-500 text-white`}))
                setTimeout(() => dispatch(popHide()), 2000);
                }
    
            } catch (error) {
                setLoader(false)
                console.log(error.message)
            }
        }
    }

    const titleval = watch("title"); // Get live value of title
    const Cardcolor = useSelector((state) => state.theme.cardColor)

    useEffect(() => {
      if (titleval) {
        const formattedSlug = titleval.toLowerCase().replace(/\s+/g, "-"); // Convert spaces to "-"
        setValue("slug", formattedSlug);
      }
    }, [titleval, setValue]);

  return (
    <>
    {/* <form onSubmit={handleSubmit(handlePost, (error) => console.log("Errors:", error))}  class={`max-w-[350px] ${Cardcolor} md:max-w-[80vw] mx-auto my-5 p-6  shadow-lg rounded-lg`}>
    <div class="mb-4">
        <label class="block  font-bold mb-2">Title</label>
        <input placeholder='Enter the title' onChange={(e) => handleSlug(e.target.value)} {...register('title', {required : true})} type="text" name="title" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300" required></input>
    </div>

    <div class="mb-4">
        <label class="block  font-bold mb-2">Slug</label>
        <input  
        {...register('slug' , {required : true})} 
        type="text" 
        value={watch("slug") }
        disabled
        name="slug" 
        placeholder='Enter the slug'
        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300" 
        required></input>
    </div>

    <div class="mb-4">
        <label class="block  font-bold mb-2">Content</label>
        <textarea placeholder='Enter the text here'  {...register('content' , {required : true})} name="content" rows="5" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300" required></textarea>
    </div>

    {/* <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Upload File</label>
        <input  {...register('file' , {required : true})} type="file" name="file" class="w-full border border-gray-300 rounded-lg p-2"></input>
    </div> }

<div className="mb-4">
      <label className="block  font-bold mb-2">Upload File</label>
      <input
        {...register("file")}
        type="file"
        name="file"
        className="w-full border border-gray-300 rounded-lg p-2"
        disabled = {img != undefined}
      />

      
      {img && (
        <div className="mt-4">
          <p className="">Preview:</p>
          <img src={img} alt="Preview" className="w-full h-40 object-cover rounded-lg shadow-lg" />
        </div>
      )}
    </div>

    <div class="mb-4">
        <label class="block  font-bold mb-2">Status</label>
        <select  {...register('status' , {required : true})} name="status" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
        </select>
    </div>

    <button 
    
    type="submit" class={`w-full px-4 flex justify-center py-2 text-white font-semibold rounded-lg transition duration-300
              ${!img ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}>
    {loader == false ? (!img ? 'Submit' : 'Update') : (
              <div class="w-5 h-5  border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
    </button>
</form> */
}

<form
  onSubmit={handleSubmit(handlePost, (error) => console.log("Errors:", error))}
  className={`max-w-[350px] ${Cardcolor} md:max-w-[80vw] mx-auto my-5 p-6 shadow-lg rounded-lg grid gap-6 md:grid-cols-2`}
>
  {/* Left Side (Form Fields) */}
  <div className="flex flex-col gap-4">
    <div>
      <label className="block font-bold mb-2">Title</label>
      <input
        placeholder="Enter the title"
        onChange={(e) => handleSlug(e.target.value)}
        {...register("title", { required: true })}
        type="text"
        name="title"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        required
      />
    </div>

    <div>
      <label className="block font-bold mb-2">Slug</label>
      <input
        {...register("slug", { required: true })}
        type="text"
        value={watch("slug")}
        disabled
        name="slug"
        placeholder="Enter the slug"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        required
      />
    </div>

    <div>
      <label className="block font-bold mb-2">Content</label>
      <textarea
        placeholder="Enter the text here"
        {...register("content", { required: true })}
        name="content"
        rows="5"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        required
      ></textarea>
    </div>

    <div>
      <label className="block font-bold mb-2">Status</label>
      <select
        {...register("status", { required: true })}
        name="status"
        className={`w-full p-2 border ${Cardcolor} rounded-lg focus:outline-none focus:ring focus:border-blue-300`}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  </div>

  {/* Right Side (Image Upload & Preview) */}
  <div className="flex flex-col items-center">
    <div className="w-full">
      <label className="block font-bold mb-2">Upload File</label>
      <input
        {...register("file")}
        type="file"
        name="file"
        className="w-full border border-gray-300 rounded-lg p-2"
        disabled={img !== undefined}
      />

      {/* Image Preview */}
      {img && (
        <div className="mt-4">
          <p className="">Preview:</p>
          <img
            src={img}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className={`mt-6 w-full px-4 py-2 flex justify-center text-white font-semibold rounded-lg transition duration-300
              ${!img ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
    >
      {loader === false ? (
        !img ? (
          "Submit"
        ) : (
          "Update"
        )
      ) : (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      )}
    </button>
  </div>
</form>

</>
  )
}

export default Addblog