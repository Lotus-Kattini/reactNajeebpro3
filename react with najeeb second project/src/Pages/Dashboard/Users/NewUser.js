import axios from 'axios'
import { User } from '../../Website/Context/UserContext'
import { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'
function NewUser() {
  const[name,setname]=useState('')
  const[email,setemail]=useState('')
  const[password,setpassword]=useState('')
  const[passwordR,setpasswordR]=useState('')
  const[accept,setaccept]=useState(false)
  const [emailError,setemailError]=useState('')

  const userNow=useContext(User)
  const token=userNow.auth.token;

  const nav =useNavigate()


  const buttonstyle={
    width:'100%',
  }


  async function Submit(e){
    e.preventDefault();
    try{
        let res = await axios.post(`http://127.0.0.1:8000/api/user/create`,{
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
                <button type='submit' style={ buttonstyle} >Create</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default NewUser