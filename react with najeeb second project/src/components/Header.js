import React from 'react'
// import {Router} from 're'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import axios from 'axios';

function Header() {

    const cookie=new Cookies();
    const token=cookie.get("Bearer");

    async function logoutHandler(){
        console.log('it is pressssssed')
        await axios.post('http://127.0.0.1:8000/api/logout',null,{headers:{
            Authorization:"Bearer "+token,
        }})
        console.log(token)
        cookie.remove('Bearer')
        window.location.pathname='/'
    }

  return (
    <div className='container shadow'>
        <nav className='d-flex p-2' >
            <div style={{display:'flex',gap:'1.4rem',fontSize:'1.5rem'}}>
                <Link to='/' className='step-nav' style={{textDecoration:'none'}}>Home</Link>
                <Link to='/about' style={{textDecoration:'none'}}>About</Link>
            </div>
            <div className='d-flex'>
                {!token ? <><Link to='/register' style={{textAlign:'center'}} className='register-nav'>
                    Register
                </Link>
                <Link to='/login' style={{textAlign:'center'}} className='register-nav'>
                    Login
                </Link>
                </>:<><Link to='/dashboard' style={{textAlign:'center'}} className='register-nav'>
                    Dashboard
                </Link>
                <div className='register-nav' onClick={logoutHandler}>Log Out</div></>}

            </div>
        </nav>
    </div>
  )
}

export default Header