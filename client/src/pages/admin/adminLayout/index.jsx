import React, { useEffect } from 'react'
import "./adminLayout.scss"
import Sidebar from '../../../common/sidebar'
import Header from '../../../common/header'
import {  Outlet, useNavigate } from 'react-router-dom'
import {  MdHome } from 'react-icons/md'
import { FaBriefcase, FaHotjar } from 'react-icons/fa'
import { getAuth } from '../../../utils/authenticationHelper'
import { getUserByIdService } from '../../../service/auth/AuthService'

const AdminLayout = () => {
  const userId=getAuth()?.user?._id;
  const navigate=useNavigate();

  useEffect(()=>{
   const handle=async()=>{
    const detail=await getUserByIdService(userId);
    if(detail?.account?.role!=="ADMIN"){
      navigate("/");
    }
   }
   handle();
  },[userId])

  return (
    <>
      <div className="admin-layout">
      <Sidebar sidebarData={sidebarData} />
      <div className="main-part">
        <Header role="admin" />
        <div className="admin-pages h-100 mt-3">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminLayout;

const sidebarData=[
  {
    icon: <MdHome />,
    name: "Members",
    path: "member",
  },
  {
    icon: <FaBriefcase /> ,
    name: "Companies",
    path: "companies",
  },
  {
    icon:  <FaHotjar /> ,
    name: "Deals",
    path: "deals",
  },
]