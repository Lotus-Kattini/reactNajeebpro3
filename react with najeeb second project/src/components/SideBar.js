import React from 'react'
import { NavLink } from 'react-router-dom'
import {FaUsers} from 'react-icons/fa'
import {BiSolidUserPlus,BiSitemap} from 'react-icons/bi'
import {GrAddCircle} from 'react-icons/gr'

function SideBar() {
  return (
    <div className='side-bar'>
        <NavLink  to='/dashboard/users' className='item-link' >
        <FaUsers className='usersicon' style={{ fontSize:'1.5rem',marginRight:'0.6rem', marginTop:'0.5rem', background:'transparent'}}/>Users
        </NavLink>
        <NavLink  to='/dashboard/user/create' className='item-link'>
          <BiSolidUserPlus style={{fontSize:'1.6rem',marginLeft:'0.3rem'}}/> New User
        </NavLink>
        <NavLink  to='/dashboard/products' className='item-link'>
          <BiSitemap style={{fontSize:'1.6rem',marginLeft:'0.3rem'}}/> Products
        </NavLink>
        <NavLink  to='/dashboard/product/create' className='item-link' >
          <GrAddCircle style={{fontSize:'1.7rem',marginLeft:'0.3rem',paddingRight:'0.5rem'}}/>Add New Product
        </NavLink>
    </div>
  )
}

export default SideBar