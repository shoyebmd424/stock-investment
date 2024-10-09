import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Account = ({setAccount}) => {
  const [show,setShow]=useState("");
  const [email,setEmail]=useState('');
  
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setAccount(pre=>({...pre,[name]:value}))
  }
 

  return (
    <div className="row row-cols-md-2">
      {fieldData?.map((val, index) => (
        <div key={index}>
          <div className="px-0 mb-4  d-flex flex-column gap-2 field position-relative">
            <label className="ms-3" htmlFor="">
              {val?.label}
            </label>
            {val?.type === "select" ? (
              <select name={val?.name} onChange={handleChange} id="" className="input-field ">
                {val?.option?.map((v, i) => (
                  <option key={v + "" + i} value="">
                    {v}
                  </option>
                ))}
              </select>
            ) : (<>
              <input
                type={show===val?.name?"text":val?.type}
                name={val?.name}
                onChange={handleChange}
                // placeholder={val?.place}
                className="input-field text-white"
              />
             {val?.name==="password"&&<span className="eye">{show!=="password"?<FaEyeSlash onClick={()=>setShow(val?.name)} size={20}/> :<FaEye onClick={()=>setShow('')} size={20}/>}</span>}
             {val?.name==="cnfPassword"&&<span className="eye">{show!=="cnfPassword"?<FaEyeSlash onClick={()=>setShow(val?.name)} size={20}/> :<FaEye onClick={()=>setShow('')} size={20}/>}</span>}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Account;

const fieldData = [
  { place: "alessandro@anyma.capital", type: "input", name: "email", label: " E-mail address (username)" },
  { place: "0033623587116", type: "input", name: "phone", label: "Phone number" },
  { place: "*******", type: "password", name: "password", label: "Password" },
  { place: "*******", type: "password", name: "cnfPassword", label: "Repeat password" },
 
];
