import React, { useEffect, useState } from "react";

const Personal = ({setPersonal}) => {
  const [industry,setIndustry]=useState('');
  
  const handleChange=(e)=>{
    const {name,value}=e.target;
    if(name==="industry"&&value==="Other"){
      setIndustry(value)
      setPersonal(pre=>({...pre,[name]:industry}));
    }else{
    setPersonal(pre=>({...pre,[name]:value}))
    }
  }
  



  return (<>
    <div className="row row-cols-md-2">
      {fieldData?.map((val, index) => (
        <div key={index}>
          <div className="px-0 mb-4  d-flex flex-column gap-2 field">
            <label className="ms-3" htmlFor="">
              {val?.label}
            </label>
            {val?.type === "select" ? (
              <select name={val?.name} onChange={handleChange} id="" className="input-field ">
                  <option value="">Select {val?.name}</option>
                {val?.option?.map((v, i) => (<>
                  <option key={index + "" + i} value={v?.name}>
                    {v?.name}
                  </option>
                  </>
                ))}
              {val?.name==="industry"&&<option value="Other">Other</option>}
              </select>
            ) : (
              <input
                type={val?.name==="dob"?"date":"text"}
                name={val?.name}
                onChange={handleChange}
                // placeholder={val?.place}
                className="input-field text-white"
              />
            )}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Personal;



const fieldData = [
  { place: "Alessandro ", type: "input", name: "firstName", label: "First name" },
  { place: "Santero", type: "input", name: "lastName", label: "Last name" },
  {
    place: "Paris, France",
    type: "input",
    name: "city",
    label: "City of residence",
  },
  { place: " 10-05-1993", type: "date", name: "dob", label: "Date Of birth" },
  { place: "Blue Nest", type: "input", name: "company", label: "Company name" },
  {
    place: " Tech and E-commerce ",
    type: "input",
    name: "industry",
    label: " Industry",
  },
];