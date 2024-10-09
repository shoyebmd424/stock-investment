import React, { useEffect, useState } from "react";
import "./createMamber.scss";
import { useLocation } from "react-router-dom";
import { getUserByIdService,  updateAuthService } from "../../service/auth/AuthService";
import { getAuth } from "../../utils/authenticationHelper";
import { FaPen } from "react-icons/fa";
import { Server } from "../../service/axios";
const Profile = () => {
    const {state}=useLocation();
  const id=getAuth()?.user?._id|| state;
  const [member,setMember]=useState(null);
  const [isEdit,setIsEdit]=useState(false);
  const [preview,setpeview]=useState(null);
  const [file,setFile]=useState(null);
  const [loading,setLoading]=useState(false);

  const handleChange=(e)=>{
    const {name,value,files}=e.target;
    try {
        if(files){
            setpeview(files[0]);
        }else{
        setMember({...member,[name]:files?files[0]:value});
        }
    } catch (error) {
        console.log(error);
    }
  }

  const handleImage=(e)=>{
    try {
      const {files}=e.target;
      if(files){
        setpeview(files[0]);
        setFile(files[0]);
      }
    } catch (error) {
      console.log(error)
      setFile(null);
    }
  }


  useEffect(()=>{
    const handleGet=async()=>{
      const data=await getUserByIdService(id);
      setMember({...data?.account,...data?.personal});
    }
    if(id){
      handleGet();
    }
  },[id]);
  



  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    const details={personal:{...member},account:{...member}};
    const formData=new FormData();
    formData.append('account',JSON.stringify(details.account));
    formData.append('personal',JSON.stringify(details.personal));
    if(file){
        formData.append("profile",file);
    }
    if(id){
    await updateAuthService(id,formData);
      window.location.reload();
    }
    setLoading(false);
  }

  return (
    <>
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
      
      <form action="" onSubmit={handleSubmit}>
        <div className="bg-white create-mamber">
          <div className="container">
            <div className="row">
                <div className="profile d-flex justify-content-center ">
                    <div className="position-relative " style={{width:"150px",aspectRatio:"1/1"}}>
                    <img src={(preview&&URL.createObjectURL(preview))||Server+member?.profile}   className="h-100 bg-light rounded-circle  w-100" alt="" />
                  {isEdit&&  <label htmlFor="profile" className="position-absolute cursor-pointer" style={{bottom:"25%",right:"-10%"}}>
                        <input onChange={handleImage} type="file" name="profile" className="position-absolute" style={{opacity:0}} />
                       <div  className="bg-very-light-gray p-2 rounded-circle cursor-pointer  " ><FaPen size={25}/></div> 
                    </label>}
                </div>
                </div>
              <div className="row row-cols-3">
                {fieldData?.map((val, index) => (
                  <div key={index}>
                    <div className="mx-3 mb-3 d-flex flex-column gap-2 field">
                      <label className="ms-3" htmlFor="">
                        {val?.label}
                      </label>
                        <input
                          type="text"
                          style={{
                            cursor: id
                              ? isEdit
                                ? "auto"
                                : "not-allowed"
                              : "auto",
                          }}
                          disabled={id ? !isEdit : false}
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

        {(isEdit || !id) && (
          <div className="text-center">
            <button disabled={loading} style={{cursor:loading?'not-allowed':'pointer'}} className="btn-red rounded-5 px-4 my-3">{loading?'wait....':'Save'}</button>
          </div>
        )}
      </form>

    </>
  );
};

export default Profile;


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