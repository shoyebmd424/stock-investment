import React from "react";
import img from "../../../assets/all-img/logoOneLeter.png";
import {Link} from "react-router-dom";

const Success = () => {
  return (
    <div className="m-auto">
      <div className="col-5 mx-auto">
        <img src={img} alt="" className="w-100 h-100" />
      </div>
      <div className="d-flex col-8 mx-auto justify-content-center align-items-center my-5 flex-column gap-3">
        <h3 className="text-center">
        Thank you for completing your onboarding process! 
        </h3>
        <p className="fs-5 text-light text-center">
        To proceed, please click the button below to access the login page  
         and enter the investor dashboard
        </p>
        <p> <Link to="/login" className="text-red"> Login Here</Link></p> 
      </div>
    </div>
  );
};

export default Success;
