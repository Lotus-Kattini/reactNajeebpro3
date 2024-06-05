import React,{useEffect, useState,useContext} from 'react'
import axios from 'axios'
import { User } from '../../Website/Context/UserContext'
import { useNavigate } from 'react-router-dom'

function UpdateUsers() {
  const[name,setname]=useState('')
  const[email,setemail]=useState('')
  const[password,setpassword]=useState('')
  const[passwordR,setpasswordR]=useState('')
  const[accept,setaccept]=useState(false)
  const [emailError,setemailError]=useState('')

  const userNow=useContext(User)
  // console.log(userNow.auth.token)
  const token=userNow.auth.token;

  const nav=useNavigate()

  const buttonstyle={
    width:'100%',
  }

  const id=window.location.pathname.split('/').slice(-1)[0];

  useEffect(()=>{
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`,{headers:{
      Authorization:'Bearer '+token,
    }})
    .then((res)=>res.json())
    .then((data)=>{
        setname(data[0].name)
        setemail(data[0].email)
    })
},[])

async function Submit(e){
  e.preventDefault();
  try{
      let res = await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`,{
        name:name,
        email:email,
        password:password,
        password_confirmation:passwordR,
      },{headers:{
        Authorization:'Bearer '+token,
      }})
      nav('/dashboard/users')

  }
  catch(err){
    setemailError(err.response.status)
    setaccept(true)
  }

}
  

  
    

  return (
    <div>
      <h1 style={{marginLeft:'1rem'}}>Update User:</h1>
        <div className='parent'>
        <div className='register' >
        <form onSubmit={Submit} >
            <label htmlFor='name'>Name:</label>
            <input id='name' type='text ' placeholder='Enter Your Name' value={name} onChange={(e)=>setname(e.target.value)}/>
            {name ==='' && accept &&<p className='error' >Username is required</p>}
            <label htmlFor='email'>Email:</label>
            <input id='email' type='email' placeholder='Enter Your Email'required value={email} onChange={(e)=>setemail(e.target.value)}/>
            {emailError===422 && accept && <p className='error'>this email is aleady been taken</p>}
            <label htmlFor='password'>Password:</label>
            <input id='password' type='password' placeholder='Password'value={password} onChange={(e)=>setpassword(e.target.value)}/>
            {(password.length < 8 && accept) ?<p className='error' >password musr be more than 8 charaters</p> : ''}
            <label htmlFor='repeate'>Repeate Password:</label>
            <input id='repeate' type='password' placeholder='Repeate Password'value={passwordR} onChange={(e)=>setpasswordR(e.target.value)}/>
            {(password !== passwordR && accept) ?<p className='error' >passwords dosen't match</p> : ''}
            <div style={{textAlign:'center'}}>
                <button type='submit' style={buttonstyle} >Update</button>
            </div>
        </form>
        </div>
    </div>
    </div>
  )
}

export default UpdateUsers