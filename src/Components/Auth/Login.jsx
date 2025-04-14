import React, { useState } from 'react'
import appwriteAuth from '../../Appwrite/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { logIn, popHide, popUp } from '../../Redux/Slicer'


function Login() {

    const {register,handleSubmit} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error,setError] = useState("")
    const [hide ,setHide] = useState('password')
    const [loader,setLoader] = useState(false)
    

    async function submit(data){
      setError("")
    setLoader(true)
        if(data){

        
        try {
            const response = await appwriteAuth.login(data)
            if(typeof response == 'object'){
                const data = await appwriteAuth.getUser()
                dispatch(logIn(data))

                setLoader(false)
                dispatch(popUp({text : "User is Logged In" , colour : `bg-green-500 text-white`}))
                setTimeout(() => dispatch(popHide()), 3000);
                 navigate('/')
            }
            else{
                setError(response)
                setLoader(false)
                
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    }

    function handleView(){
        setHide((prev) => prev == 'password' ? 'text' : 'password')
    }

    const bgColor = useSelector((state) => state.theme.bgColor)
    const cardColor = useSelector((state) => state.theme.cardColor)

  return (
    <div className={`flex justify-center items-center my-[70px] ${bgColor}`}>
    <div className={`${cardColor} p-8 rounded-lg shadow-lg w-96`}>
      <h2 className="text-2xl font-bold text-center  mb-1">Login</h2>
      <p className="text-center  mb-6">
Don't have an account?  
<span onClick={() => navigate('/signup')} className="text-blue-600 hover:underline"> Sign up here</span>.
</p>

      <form onSubmit={handleSubmit(submit)}>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Email</label>
          <input 
            type="email" 
            name="email" 
             {...register("email" , {required : true})}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter your email" 
            required 
          />
        </div>

        {/* <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Password</label>
          <input 
            type={hide} 
            name="password" 
            
            {...register("password" , {required : true})}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter your password" 
            required 
          />
        </div> */}

        
<div className="mb-4 relative">
<label className="block  font-medium mb-1">Password</label>
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

        {error != "" ? (
               <p className="text-red-600 text-center mt-2">{error}</p>
        ) : null }
        <p className="mt-2 text-center mb-4">
  <NavLink to='/email' className="text-blue-600 hover:underline ">Forgot password?</NavLink>
</p>
        <button 
          type="submit" 
          className=" mt-3 flex justify-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
           {loader == false ? 'Log In' : (
              <div class="w-5 h-5  border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
        </button>
      </form>
   
    </div>
  </div>
  )
}

export default Login