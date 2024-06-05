import React from 'react'
import { Link } from 'react-router-dom'

function TopBar() {
  return (
    <div className='d-flex container shadow'>
        <h1>Store</h1>
        <Link to='/' className='register-nav'>Go To Website</Link>
    </div>
  )
}

export default TopBar