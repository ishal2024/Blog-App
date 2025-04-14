import React, { useEffect, useState } from 'react'
import {Camera, X} from 'lucide-react'
import appwriteData from '../Appwrite/Data'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { popHide, popUp, setPhoto } from '../Redux/Slicer'

function Updatephoto() {

    const [fileId , setfileid] = useState(null)
    const [img , setimg] = useState(null)
    const [userId , setUserid] = useState('')
    const [imgdoc , setImgDoc] = useState('')
    const {register , handleSubmit} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth.userData)
    const [upload , setupload] = useState(false)
    const [loader,setLoader] = useState(false)

    useEffect(() => {
        
        userData && setUserid(userData.$id)
       
    }, [userData])

    useEffect(() => {
        if (userId) {
            imgDoc()
        }
       }, [userId]);

       useEffect(() => {
        if (fileId && fileId.length > 0) {
            fetchImage();
        }
    }, [fileId]);

  async function imgDoc(){
    const data = await appwriteData.getImgDoc(userId)
    setfileid(data.documents)
  }

    async function updatePhoto({userFile}){
        setLoader(true)
    try {
        const file = userFile[0]
        if(fileId.length == 0){
            const fileres = await appwriteData.uploadUserImage(file)
            const imgData = await appwriteData.createUserImageDoc({userId , fileId : fileres.$id})
            setImgDoc(imgData.$id)
           setLoader(false)
            navigate('/')
        }
        else{
          // try {
            
          //   const fileres = await appwriteData.deleteUserImg(fileId[0].fileId)
          //   const newfileres = await appwriteData.uploadUserImage(file)
          //   const newfiledoc = await appwriteData.updateUserImgDoc(imgDoc , {userId , fileId :newfileres.$id})
          // } catch (error) {
          //   console.log(error.message)
          // }
          setLoader(false)
          dispatch(popUp({text : "Sorry We can't upload your photo" , colour : `bg-red-500 text-white`}))
          setTimeout(() => dispatch(popHide()), 3000);
        }
   
    } catch (error) {
      setLoader(false)
        console.log(error.message)
    }
    }

    const bgColor = useSelector((state) => state.theme.bgColor)

    async function fetchImage(){
        if(fileId.length > 0){
        try {
           
            
            const url = await appwriteData.getUserFile(fileId[0].fileId) 
            if(url){
                
            setimg(url)
            dispatch(setPhoto(url))
            }    
        } catch (error) {
           console.log(error.message)  
        }
    }
}

async function handleUpload(){
     setupload(true)
}

  return (
    <>
    <div className="flex flex-col items-center object-cover object-center space-y-4">
    <img
      src={img ? img : 'https://cdn4.iconfinder.com/data/icons/man-6/48/man-09-128.png'}
     
   
      alt="User Profile"
      className="w-32 h-32 rounded-full border"
    />
   
  </div>
  {/* <div onClick={handleUpload} className='w-full flex justify-center'>
  <label   className="flex  w-[280px] justify-between px-2 items-center py-2 border rounded-md cursor-pointer hover:bg-gray-100">
    <Camera size={16} className="mr-2" />Upload Photo
    <X onClick={() => setupload(false)}/>
  </label>
  </div> */}

<div
  onClick={handleUpload}
  className="w-full flex justify-center"
>
  <label
    className="flex w-[280px] justify-between px-3 py-2 border rounded-md cursor-pointer hover:bg-blue-500 items-center"
    role="button"
    aria-label="Upload Photo"
  >
    <div className="flex items-center">
      <Camera size={16} className="mr-2" />
      <span>Upload Photo</span>
    </div>
    {upload && <X
      onClick={(e) => {
        e.stopPropagation();
        setupload(false);
      }}
      className="cursor-pointer"
    />}
  </label>
</div>


  {upload && <div  className={`w-full py-4 border-2 ${bgColor} `}>
    <p className='mb-2 px-2'>Choose an Image :</p>
    <form onSubmit={handleSubmit(updatePhoto)}  className='flex gap-2.5 px-2 justify-between'>
    <input 
    type="file" 
    
    {...register('userFile' , {required : true})}
    className="border-2 w-[65%] text-center p-2" 
    id="file-upload"
  />
  <button type='submit' className='flex w-[25%] items-center justify-center py-2 px-4 transition rounded-1xl text-white rounded-lg bg-blue-500'>
  {loader == false ? 'Submit' : (
              <div class="w-5 h-5  border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
    </button>
  </form>
  </div>}
  </>
  )
}

export default Updatephoto