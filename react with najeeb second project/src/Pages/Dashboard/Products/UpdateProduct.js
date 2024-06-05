import React,{useEffect, useState,useContext} from 'react'
import axios from 'axios'
import { User } from '../../Website/Context/UserContext'
import { useNavigate } from 'react-router-dom'

function UpdateProduct() {
  const[title,settitle]=useState('')
  const[description,setdescription]=useState('')
  const[image,setimage]=useState(false)
  const[accept,setaccept]=useState(false)

  const userNow=useContext(User)
  // console.log(userNow.auth.token)
  const token=userNow.auth.token;

  const nav=useNavigate()

  const buttonstyle={
    width:'100%',
  }

  const id=window.location.pathname.split('/').slice(-1)[0];

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/product/showbyid/${id}`,{headers:{
      Authorization:'Bearer '+token,
    }})
    .then((data)=>{
      console.log(data)
        settitle(data.data[0].title)
        setdescription(data.data[0].description)
    })
},[])

async function Submit(e){
  e.preventDefault();
  try{
      const formData=new FormData();
      formData.append('title',title)
      formData.append('description',description)
      formData.append('image',image)
      let res = await axios.post(`http://127.0.0.1:8000/api/product/update/${id}`,
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
    <div>
      <h1 style={{marginLeft:'1rem'}}>Update Product:</h1>
        <div className='parent'>
        <div className='register' >
        <form onSubmit={Submit} >
            <label htmlFor='name'>Title:</label>
            <input id='name' type='text ' placeholder='Title...' value={title} onChange={(e)=>settitle(e.target.value)}/>
            {title ==='' && accept &&<p className='error' >Username is required</p>}
            <label htmlFor='email'>Description:</label>
            <input id='email' type='text' placeholder='Description...' value={description} onChange={(e)=>setdescription(e.target.value)}/>
            {/* {emailError===422 && accept && <p className='error'>this email is aleady been taken</p>} */}
            <div style={{textAlign:'center'}}>
                <button type='submit' style={buttonstyle} >Update Product</button>
            </div>
        </form>
        </div>
    </div>
    </div>
  )
}

export default UpdateProduct