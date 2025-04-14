import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Components/Auth/Signup'
import Header from './Components/Header'
import { Outlet, useNavigation } from 'react-router-dom'
import Footer from './Components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import Popup from './Components/Popup'


function App() {
 
  const pop = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate website loading time
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Change time as needed
  }, []);

  const bgColor = useSelector((state) => state.theme.bgColor)

  return (



   <>
   {!loading ? (
   <div className={`${bgColor}`}>
   <Header />
   {pop.pop && <Popup text = {pop.popText} className = {pop.popColor} />}
   { <div className="h-[78vh]  overflow-auto flex items-center">
  <div className="w-full h-[85%]  overflow-auto">
    <Outlet />
  </div> 
  </div>}
 
   <Footer />
   </div>

   ) : (
    <div className="h-screen flex justify-center items-center">
      {loading ? (
        // Loader
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        // Actual Website Content
        <h1 className="text-3xl font-bold">Website Loaded</h1>
      )}
    </div>
   )}
   
   </>
  )
}

export default App
