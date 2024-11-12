import React, { useEffect, useState } from "react";
import "./createMamber.scss";
import { useLocation } from "react-router-dom";
import { getUserByIdService, registerService, updateAuthService } from "../../../../service/auth/AuthService";
import { generateRandomPassword } from "../../../../utils/randomPassword";
import Investments from "./investments";
import { getAuth } from "../../../../utils/authenticationHelper";
const CreateMamber = () => {
  const user=getAuth()?.user;
  const {pathname,state}=useLocation();
  const paths=pathname.split("/");
  const [member,setMember]=useState(null);
  const [isEdit,setIsEdit]=useState(false);
  
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setMember({...member,[name]:value});
  }
  useEffect(()=>{
    const handleGet=async()=>{
      const data=await getUserByIdService(state);
      setMember({...data?.account,...data?.personal});
    }
    if(state){
      handleGet();
    }
  },[state]);
  



  const handleSubmit=(e)=>{
    e.preventDefault();
    if(state){
      updateAuthService(state,{personal:{...member},account:{...member}});
      setIsEdit(false);
      return;
    }
    const password=generateRandomPassword();
    registerService({member:{adminId:user?._id}, account:{...member ,password:password,cnfPassword:password},personal:{...member}});
  }

  return (
    <>
      {state && (
        <div className="d-flex my-3 py-2  admin-header justify-content-between align-items-center">
          <h5 className="text-capitalize m-0 fw-semibold">Personal Details</h5>
          <div className="right-profile  d-flex gap-4">
            {!isEdit && (
              <div>
                <button
                  onClick={() => setIsEdit(true)}
                  className="btn-red py-2 text-decoration-none"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <form action="" onSubmit={handleSubmit}>
        <div className="bg-white create-mamber">
          <div className="container">
            <div className="row">
              <div className="row row-cols-3">
                {fieldData?.map((val, index) => (
                  <div key={index}>
                    <div className="mx-3 mb-3 d-flex flex-column gap-2 field">
                      <label className="ms-3" htmlFor="">
                        {val?.label}
                      </label>
                        <input
                          type={val?.type==='date'?'date':"text"}
                          style={{
                            cursor: state
                              ? isEdit
                                ? "auto"
                                : "not-allowed"
                              : "auto",
                          }}
                          disabled={state ? !isEdit : false}
                          onChange={handleChange}
                          value={member && member[val?.name]}
                          name={val?.name}
                          // placeholder={val?.place}
                          className="input-field"
                        />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {(isEdit || !state) && (
          <div className="text-center">
            <button className="btn-red rounded-5 px-4 my-3">Save</button>
          </div>
        )}
      </form>

      {!paths?.includes("personal-add") && (
        <div className="h-50 investment-table">
          <div className="my-3">
            <div className="bg-dark py-3 px-4 rounded d-flex justify-content-between">
              <h5 className="text-white mb-0 fw-bold">Investments</h5>
            </div>
          </div>
         <Investments userId={state}/>
        </div>
      )}
    </>
  );
};

export default CreateMamber;


const fieldData = [
  { place: "Thomas", type: "input", name: "firstName", label: "First name" },
  { place: "Domingue", type: "input", name: "lastName", label: "Last name" },
  {
    place: "thomas.domnugue@gmail.com",
    type: "input",
    name: "email",
    label: " E-mail",
  },
  {
    place: "Paris, France",
    type: "input",
    name: "city",
    label: "City of residence",
  },
  { place: " 10-05-1993", type: "date", name: "dob", label: "Date Of birth" },
  {
    place: " 07754838908",
    type: "input",
    name: "phone",
    label: "Phone number",
  },
  { place: "Blue Nest", type: "input", name: "company", label: "Company name" },
  {
    place: " Tech and E-commerce ",
    type: "input",
    name: "industry",
    label: " Industry",
  },
];