import React from 'react'
import "./navbar.scss";
import logo from "../../assets/all-img/Logo-02-removebg-preview.png";
import { Link, NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='h-navbar container'>
      <ul className='m-0'>
        <li className='logo'><img src={logo} alt="logo" className='h-100 w-100' /></li>
        <li className='my-auto'>
            <ul className='list m-0'>
              {navData?.map((val,key)=>( <NavLink className={({isActive})=>(isActive&&'active')} to={val?.path}> <li> <span>{val?.name}</span></li></NavLink>))}
            </ul>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar

const navData=[
    {name:"Investments",path:"/investments"},
    {name:"Team",path:"/team"},
    {name:"about us",path:"/about"},
    {name:"Member's Login",path:"/login"},
]