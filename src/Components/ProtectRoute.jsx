import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet ,Navigate } from 'react-router-dom'


function ProtectRoute() {

    const user = useSelector((state) => state.auth.userData)

    return user != null ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectRoute