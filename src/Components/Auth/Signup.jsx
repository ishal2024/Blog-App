import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import appwriteAuth from '../../Appwrite/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,NavLink } from 'react-router-dom'
import { logIn, popHide, popUp } from '../../Redux/Slicer'



function Signup() {

  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error,setError] = useState("")
  const [hide,setHide] = useState('password')
  const [seen,setSeen] = useState(true)
  const [loader,setLoader] = useState(false)

  async function submit(data) {
    setError("")
    setLoader(true)
    try {
        if(data){

        const response = await appwriteAuth.signup(data)
       
        
        if(typeof response == 'object'){
            const user = await appwriteAuth.getUser()
            dispatch(logIn(user))
            setLoader(false)
            dispatch(popUp({text : "Account is Created" , colour : `bg-green-500 text-white`}))
            setTimeout(() => dispatch(popHide()), 2000);
         
            navigate('/')
        }
        else{
            setError(response)
            
            setLoader(false)
        }
      }
     
    
     
    } catch (error) {
        console.log(error.message)
    }
    
  }
  function handleView(){
    if(seen){
     setHide('password')
     setSeen(false)
    }
    else{
       setHide('text')
       setSeen(true)
     }
    }

    const bgColor = useSelector((state) => state.theme.bgColor)
    const cardColor = useSelector((state) => state.theme.cardColor)
  return (
    <div className={`flex justify-center items-center my-[70px] ${bgColor}`}>
      <div className={` p-8 rounded-lg shadow-lg w-96 ${cardColor}`}>
        <h2 className="text-2xl font-bold text-center  ">Signup</h2>
        <p className="text-center  mb-6 mt-1">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Login here
          </NavLink>
        </p>
        <form onSubmit={handleSubmit(submit)} >
          <div className="mb-4">
            <label className="block  font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              {...register('name',{required : true})}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block  font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              {...register('email', { required: true })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4 relative">
  <label className="block text-gray-600 font-medium mb-1">Password</label>
  <div className="relative">
    <input
      type={hide}
      name="password"
      {...register("password", { required: true })}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
      placeholder="Enter your password"
      required
    />
    <button
      type="button"
      className="absolute inset-y-0 right-3 flex items-center "
      onClick={handleView}
    >
      👁️
    </button>
  </div>
</div>

        {error != "" && (<p className='text-red-600 text-center mt-1 mb-3'>{error}</p>)}

          <button
            type="submit"
            className="w-full flex justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-3  transition">
            {loader == false ? 'Sign Up' : (
              <div class="w-5 h-5  border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
          </button>
        </form>
      </div>
    </div>

  )
}




export default Signup