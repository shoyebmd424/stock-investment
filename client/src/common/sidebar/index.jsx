import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import logo from "../../assets/all-img/Logo-02-removebg-preview.png";
import { IoMdLogOut } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getAuth, logout } from "../../utils/authenticationHelper";
import { Server } from "../../service/axios";
import { getUserByIdService } from "../../service/auth/AuthService";
import dummy from "../../assets/profile/user.png";

const Sidebar = ({ sidebarData }) => {
  const userId = getAuth()?.user?._id;
  const [user,setUser]=useState(null);
  const navigate = useNavigate();
  const [isClose, setIsClose] = useState(false);
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const path = paths[paths.length - 1];
  useEffect(()=>{
    const hande=async()=>{
    const detial=await getUserByIdService(userId);
    setUser(detial);
    }
    hande();
  },[userId]);

    const handleLogout=()=>{
      logout()
      navigate("/");
    }

  return (
    <div className={`sidebar-upper ${isClose ? "side-open" : ""}`}>
      <div className="sidebar">
        <div className="text-white my-5 pb-5 flex-column gap-4 d-flex justify-content-center">
          <div className="me-auto position-relative d-flex align-items-center flex-column justify-content-center">
            {/* {!isClose && ( */}
            <div className={`w-75 mx-auto text-center mb-2`}>
              <img className="w-100 h-100 " src={logo} alt="" />
            </div>
            {/* )} */}
            {/* <MdMenu
            onClick={() => setIsClose(!isClose)}
            className={isClose?"side-closer more":"side-closer"}
            size={30}
          /> */}
            <small className="side text-capitalize">
              {user?.account?.role === "ADMIN" ? "Admin" : "Customer"} Dashboard
            </small>
          </div>
          <div className="d-flex  gap-3 mx-auto">
            <div className="profile-img">
              <img
                src={user?.personal?.profile?Server + user?.personal?.profile:dummy}
                className="w-100 h-100 rounded-circle"
                alt="profile"
              />
            </div>
            <div className="d-flex flex-column justify-content">
              <p className="m-0 p-0 text-light-gray text-capitalize">
                {user?.personal?.firstName} {user?.personal?.lastName}
              </p>
              <button
                onClick={() =>
                  navigate(`/${user?.account?.role?.toLowerCase()}/profile`, {
                    state: user?._id,
                  })
                }
                style={{ fontSize: "14px" }}
                className=" text-gray btn px-0 text-decoration-underline fw-semibold"
              >
                <span> Edit profile</span>
              </button>
            </div>
          </div>
        </div>
        <ul className="sidebar-list px-0">
          {sidebarData?.map((val, index) => (
            <NavLink
              key={index}
              to={val?.soon?"":val.path}
              className={({ isActive }) =>
                (isActive&&!val?.soon ? "active" : "") + ` ${val?.soon&&'not'} text-decoration-none`
              }
            >
              <li>
                <span>{val?.icon}</span>
                {!isClose && (
                  <>
                    <span
                      className={`text-${
                        val?.path !== path ? "gray" : ""
                      }  position-relative`}
                    >
                      {val?.name}
                      {val?.soon && (
                        <span
                          style={{ fontSize: "8px ",padding:"2.5px 0" }}
                          className="bg-secondary ms-1 my-auto rounded-5 text-white px-2 position-absolute"
                        >
                          SOON
                        </span>
                      )}
                    </span>
                    <span className={`ms-auto  active-icon`}>
                      {/* <FaAngleRight /> */}
                    </span>
                  </>
                )}
              </li>
            </NavLink>
          ))}
          <button onClick={handleLogout} className="btn text-white  d-flex">
              <li>
                <span><IoMdLogOut/></span>
                {!isClose && (
                  <>
                    <span
                      className={`  position-relative`}
                    >
                     Logout
                    </span>
                  </>
                )}
              </li>
              </button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
