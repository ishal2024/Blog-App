import React , {useEffect, useState} from 'react'
import { Camera, Save, X } from "lucide-react";
import Updatephoto from './Updatephoto';
import { useSelector } from 'react-redux';

function Profile() {
    const [name , setName] = useState("")
    const [email , setemail] = useState("")
    const userData = useSelector((state) => state.auth.userData)
    const cardColor = useSelector((state) => state.theme.cardColor)
  
  return (
    <div className={`max-w-lg mx-auto p-6 space-y-6 my-10 ${cardColor}  shadow-md rounded-lg`}>
    {/* Profile Photo Section */}
 

    <Updatephoto />

    {/* User Information */}
    <div className="space-y-4">
      <div>
        <label className="block font-medium">Full Name</label>
        <input
          type="text"
          value={userData != null ? userData.name : ""}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          value={userData != null ? userData.email : ""}
          disabled
          className="w-full p-2 border rounded-md "
        />
      </div>
      
      
      
    </div>

    {/* Actions */}
    
  </div>
  )
}

export default Profile