import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import '../Forms/index.css'
import { User } from '../../Pages/Website/Context/UserContext'


function Forms(props) {
  const[name,setname]=useState('')
  const[email,setemail]=useState('')
  const[password,setpassword]=useState('')
  const[passwordR,setpasswordR]=useState('')
  const[accept,setaccept]=useState(false)
  const [emailError,setemailError]=useState('')

  const userNow=useContext(User)
  console.log(userNow)


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

  useEffect(()=>{
    setname(props.name)
    setemail(props.email)
  },[props.name,props.email])

  async function Submit(e){
    let flag=true
    e.preventDefault();
    setaccept(true)
    if(name ==='' || password.length <8 ||passwordR !== password){
      flag=false
    }
    else{
      flag=true
    }
    try{
      if(flag){
        let res = await axios.post(`http://127.0.0.1:8000/api/${props.endpoint}`,{
          name:name,
          email:email,
          password:password,
          password_confirmation:passwordR,
        })
        const token=res.data.data.token;
        const userDetails=res.data.data.user;
        userNow.setauth({token,userDetails})
        if(res.status === 200){
          props.haslocalStorage && window.localStorage.setItem('email',email);
          // window.location.pathname=`/${props.navigate}`;
        }
      }
    }
    catch(err){
      setemailError(err.response.status)
    }

    

  }
  return (
    <div>
        <div className='register' style={props.styleRegisterprop && styleRegister }>
        <form onSubmit={Submit} style={props.styleRegisterprop && styleForm}>
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
                <button type='submit' style={props.buttonstyle && buttonstyle} >{props.button}</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Forms