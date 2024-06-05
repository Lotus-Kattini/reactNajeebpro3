import React, { useContext } from 'react'
import { User } from '../Context/UserContext'
import { Navigate, Outlet,useLocation } from 'react-router-dom'

function RequireAuth() {
    const user=useContext(User)
    const location=useLocation()
  return (
    <div>
        {user.auth.userDetails ? <Outlet/> 
        :<Navigate state={{from : location}} replace to='/login'/>}
    </div>
  )
}

export default RequireAuth