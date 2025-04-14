import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.js'
import Signup from './Components/Auth/Signup.jsx'
import Login from './Components/Auth/Login.jsx'
import Addblog from './Components/Addblog.jsx'
import Home from './Components/Home.jsx'
import Blogdetails from './Components/Blogdetails.jsx'
import Activepost from './Components/Activepost.jsx'
import Profile from './Components/Profile.jsx'
import Setting from './Components/Setting.jsx'
import ThemeChanger from './Components/ThemeChanger.jsx'
import ProtectRoute from './Components/ProtectRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      
   
      {
        element: <ProtectRoute />, // 
        children: [
          { path: "/addblog", element: <Addblog /> },
          { path: "/activeblog", element: <Activepost /> },
          { path: "/profile", element: <Profile /> },
          { path: "/setting", element: <Setting /> },
          { path: "/theme", element: <ThemeChanger /> },
        ],
      },

      { path: "/", element: <Home /> },
      { path: "/:blog", element: <Blogdetails /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
  <RouterProvider router={router} />
  
  </Provider>
)
