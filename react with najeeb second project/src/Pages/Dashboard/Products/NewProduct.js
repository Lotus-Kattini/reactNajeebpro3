import axios from 'axios'
import { User } from '../../Website/Context/UserContext'
import { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'
function NewProduct() {
  const[title,settitle]=useState('')
  const[description,setdescription]=useState('')
  const[image,setimage]=useState(false)
  const[accept,setaccept]=useState(false)

  const userNow=useContext(User)
  const token=userNow.auth.token;

  const nav =useNavigate()


  const buttonstyle={
    width:'100%',
  }


  async function Submit(e){
    e.preventDefault();
    try{
        const formData=new FormData();
        formData.append('title',title)
        formData.append('description',description)
        formData.append('image',image)
        let res = await axios.post(`http://127.0.0.1:8000/api/product/create`,
          formData
        ,{headers:{
          Authorization:'Bearer '+token,
        }})
        nav('/dashboard/products')

    }
    catch(err){
      console.log(err)
      setaccept(true)
    }

  }
  return (
    <div className='parent'>
      <div className='register' >
        <form onSubmit={Submit} >
            <label htmlFor='name'>Title:</label>
            <input id='name' type='text ' placeholder='Title...' value={title} onChange={(e)=>settitle(e.target.value)}/>
            {title ==='' && accept &&<p className='error' >Title is required</p>}
            <label htmlFor='email'>Description:</label>
            <input id='email' type='text' placeholder='Description...' value={description} onChange={(e)=>setdescription(e.target.value)}/>
            {/* {emailError===422 && accept && <p className='error'>this email is aleady been taken</p>} */}
            <label htmlFor='password'>Password:</label>
            <input id='password' type='file' placeholder='Password' onChange={(e)=>setimage(e.target.files.item(0))}/>
            {/* {(password.length < 8 && accept) ?<p className='error' >password musr be more than 8 charaters</p> : ''} */}
            <div style={{textAlign:'center'}}>
                <button type='submit' style={ buttonstyle} >Create Product</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default NewProduct