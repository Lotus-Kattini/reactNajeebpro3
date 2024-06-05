import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {FaEdit} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { User } from '../../Website/Context/UserContext'


function Products() {

    const[products,setproducts]=useState([])
    const [runuseeffect,setrunuseeffect]=useState(0)

    const context=useContext(User)
    const token=context.auth.token;

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/product/show',{
            headers:{
                Accept:"application/json",
                Authorization:"Bearer " + token,
            },
        })
        .then((data)=>setproducts(data.data))
        .catch((err)=>console.log(err))
    },[runuseeffect])

    async function deletsproductHandler(id){
        try{
            const res= await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`,{headers:{
                Accept:'application/json',
                Authorization:'Bearer '+token,
            }})
            if(res.status===200){
             setrunuseeffect((prev)=> prev + 1)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    

    const showproducts=products.map((product,index)=>
    <tr key={index}>
    <td>{index+1}</td>
    <td>{product.title}</td>
    <td>{product.description}</td>
    <td>
    <Link to={`${product.id}`}>
    <FaEdit style={{fontSize:'1.2rem' ,cursor:'pointer',color:'#1d3e6e78'}}/>
    </Link>
    <AiFillDelete style={{color:'red',marginLeft:'0.7rem',fontSize:'1.2rem',cursor:'pointer'}}
     onClick={()=>deletsproductHandler(product.id)}/>
     </td>
    </tr>
    )

  return (
    <div style={{padding:'20px'}}>
        <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {showproducts}
            </tbody>
        </table>
    </div>
  )
}

export default Products