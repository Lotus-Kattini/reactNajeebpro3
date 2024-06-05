import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {FaEdit} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { User } from '../../Website/Context/UserContext'


function Users() {

    const[users,setusers]=useState([])
    const [runuseeffect,setrunuseeffect]=useState(0)

    const context=useContext(User)
    const token=context.auth.token;

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/user/show',{
            headers:{
                Accept:"application/json",
                Authorization:"Bearer " + token,
            },
        })
        .then((data)=>setusers(data.data))
        .catch((err)=>console.log(err))
    },[runuseeffect])

    async function deletsuserHandler(id){
        try{
            const res= await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`,{headers:{
                Accept:'application/json',
                Authorization:'Bearer '+token,
            }})
            if(res.status===200){
             setrunuseeffect((prev)=> prev + 1)
            }
        }
        catch{
            //none
        }
    }

    

    const showusers=users.map((user,index)=>
    <tr key={index}>
    <td>{index+1}</td>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>
    <Link to={`${user.id}`}>
    <FaEdit style={{fontSize:'1.2rem' ,cursor:'pointer',color:'#1d3e6e78'}}/>
    </Link>
    <AiFillDelete style={{color:'red',marginLeft:'0.7rem',fontSize:'1.2rem',cursor:'pointer'}}
     onClick={()=>deletsuserHandler(user.id)}/>
     </td>
    </tr>
    )

  return (
    <div style={{padding:'20px'}}>
        <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {showusers}
            </tbody>
        </table>
    </div>
  )
}

export default Users