import React from "react";
import "./header.scss";

import { Link, useLocation } from "react-router-dom";
import { formatPathToTitle } from "../../utils/formater/StringFormater";

const Header= ({ role }) => {
  const { pathname } = useLocation();
  const curPage = formatPathToTitle(pathname);
  // personal-details
  // new-company
  // personal-add
  console.log(curPage.toLowerCase())
  const Button=()=>{
   
    if(curPage.toLocaleLowerCase()==="member"){
    return <Link to="member/personal-add" className="btn-red text-decoration-none"> Create a new member</Link>
    }
    if(curPage.toLocaleLowerCase()==="companies"){
    return <Link to="companies/new-company" className="btn-red text-decoration-none"> Create a company</Link>
    }
    if(curPage.toLocaleLowerCase()==="personal details"){
    return <Link to="member/personal-details" className="btn-red text-decoration-none"> Edit</Link>
    }
  }

  return (<>
   {(curPage.toLocaleLowerCase()!=="personal details"&&curPage.toLocaleLowerCase()!=="profile")&&<div id={role} className="d-flex  admin-header justify-content-between align-items-center">
      <h5 className="text-capitalize m-0 fw-semibold">{curPage}</h5>
      <div className="right-profile  d-flex gap-4">
        <div><Button/></div>
      </div>
    </div>}
    </>
  );
};

export default Header;
