import React from "react";
import img from "../../../assets/all-img/logoOneLeter.png";

const Success = () => {
  return (
    <div className="m-auto">
      <div className="col-5 mx-auto">
        <img src={img} alt="" className="w-100 h-100" />
      </div>
      <div className="d-flex col-8 mx-auto justify-content-center align-items-center my-5 flex-column gap-3">
        <h3 className="text-center">
          We’ve received your registration request
        </h3>
        <p className="fs-5 text-light text-center">
          Anyma Capital team will be in touch with you shortly by e-mail to
          grant you access to your account
        </p>
      </div>
    </div>
  );
};

export default Success;
