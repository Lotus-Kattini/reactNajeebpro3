import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { User } from '../Context/UserContext';
import Loading from '../../../components/Loading';
import Cookies from 'universal-cookie';

function PresisLogin() {
    // get current user
    const context=useContext(User)
    const token=context.auth.token;
    const [loading,setloading]=useState(true)
    // cookie
    const cookie=new Cookies();
    const getToken=cookie.get('Bearer')
    // console.log(getToken)
    // send refresh token
    useEffect(()=>{
        async function refresh(){
            try{
               await axios.post('http://127.0.0.1:8000/api/refresh',null, {headers:{
                    Authorization:'Bearer '+ getToken,
               }})
               .then((data)=>{
                cookie.set('Bearer',data.data.token)
                context.setauth((prev)=>{
                    return{
                        userDetails: data.data.user,
                        token: data.data.token,
                    }
                })
                })
            }
            catch(err){
                console.log(err)
            }
            finally{
                setloading(false)
            }
        }
    
        {!token ? refresh() : setloading(false)}
    },[])
    
  return (
    <div>
        {loading ? <Loading/> :<Outlet/> }
    </div>
  )
}

export default PresisLogin