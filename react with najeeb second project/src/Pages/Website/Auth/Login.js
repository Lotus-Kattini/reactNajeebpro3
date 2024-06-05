import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Header from '../../../components/Header'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { User } from '../Context/UserContext'
import Cookies from 'universal-cookie'


function Login() {
    
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const[accept,setaccept]=useState(false)
    const [emailError,setemailError]=useState('')

    const cookie=new Cookies()

    const userNow=useContext(User)
    console.log(userNow)

    const nav=useNavigate()
  
    async function Submit(e){
      e.preventDefault();
      setaccept(true)

      try{
          let res = await axios.post('http://127.0.0.1:8000/api/login',{
            email:email,
            password:password,
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
      }
  
    }
  
    return (
      <div>
        <Header/>
      <div className='parent login'>
          <div className='register'>
          <form onSubmit={Submit}>
              <label htmlFor='email'>Email:</label>
              <input id='email' type='email' placeholder='Enter Your Email' required value={email} onChange={(e)=>setemail(e.target.value)}/>
              {emailError===401 && accept && <p className='error'>this email is not registered!</p>}
              <label htmlFor='password'>Password:</label>
              <input id='password' type='password' placeholder='Password'value={password} onChange={(e)=>setpassword(e.target.value)}/>
              {(password.length < 8 && accept) ?<p className='error' >password musr be more than 8 charaters</p> : ''}
              <div style={{textAlign:'center'}}>
                  <button type='submit'>Log in</button>
              </div>
          </form>
          </div>
      </div>
      </div>
    )
}

export default Login