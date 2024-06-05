import React from 'react'
// import './style.css'
import Header from '../../../components/Header'
import { useState, useContext} from 'react'
import axios from 'axios'
import { User } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
function Signup() {
  const[name,setname]=useState('')
  const[email,setemail]=useState('')
  const[password,setpassword]=useState('')
  const[passwordR,setpasswordR]=useState('')
  const[accept,setaccept]=useState(false)
  const [emailError,setemailError]=useState('')

  const userNow=useContext(User)
  console.log(userNow)

  const cookie=new Cookies()

  const nav=useNavigate()

  const styleRegister={
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40px",
  }

  const styleForm={
    boxShadow: "0 2px 15px rgb(0 0 0/10%)",
    width:'400px'
  }

  const buttonstyle={
    width:'100%',
  }


  async function Submit(e){
    e.preventDefault();
    setaccept(true)
    try{
        let res = await axios.post(`http://127.0.0.1:8000/api/register`,{
          name:name,
          email:email,
          password:password,
          password_confirmation:passwordR,
        })
        const token=res.data.data.token;
        cookie.set('Bearer',token)
        const userDetails=res.data.data.user;
        userNow.setauth({token,userDetails})
        nav('/dashboard')
    }
    catch(err){
      setemailError(err.response.status)
      setaccept(true)
      console.log(err)
    }
  }
  
  return (
    <div>
      <Header/>
    <div className='parent' style={{
    paddingTop: "4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",}}>
      <div className='register' style={styleRegister }>
        <form onSubmit={Submit} style={ styleForm}>
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
                <button type='submit' style={ buttonstyle} >Register</button>
            </div>
        </form>
        </div>
    </div>
    </div>
  )
}

export default Signup