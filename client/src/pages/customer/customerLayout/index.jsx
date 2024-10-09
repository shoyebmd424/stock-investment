import React from 'react'
import "./customerLayout.scss"
import { Outlet } from 'react-router-dom'
import {  MdHome } from 'react-icons/md'
import { FaBriefcase, FaHotjar } from 'react-icons/fa'
import Sidebar from '../../../common/sidebar'
import Header from '../../../common/header'
import { HiSpeakerphone } from 'react-icons/hi'
import { BiSolidCalendarStar } from 'react-icons/bi'

const CustomerLayout = () => {
  return (
    <>
      <div className="customer-layout">
      <Sidebar sidebarData={sidebarData} />
      <div className="main-part">
        <Header role="customer" />
        <div className="customer-pages h-100 mt-3">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  )
}

export default CustomerLayout;

const sidebarData=[
  // {
  //   icon: <MdHome />,
  //   name: "Home",
  //   path: "home",
  //   soon:true,
  // },
  {
    icon: <FaBriefcase /> ,
    name: "Portfolio",
    path: "overview",
  },
  {
    icon: <FaHotjar /> ,
    name: "Live deal",
    path: "live-deal",
    soon:true,
  },
  {
    icon: <HiSpeakerphone />,
    name: "News",
    path: "news",
    soon:true,
  },
  {
    icon:<BiSolidCalendarStar /> ,
    name: "Events",
    path: "events",
    soon:true,
  },
]