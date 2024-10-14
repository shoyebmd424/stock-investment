import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import aferica from "../../../assets/icons continent/Africa.png"
import asia from "../../../assets/icons continent/Asia.png"
import  europe from "../../../assets/icons continent/Europe.png"
import latin from "../../../assets/icons continent/Latin america.png"
import map from "../../../assets/icons continent/Middle east.png"
import north from "../../../assets/icons continent/North America.png"
const Investment = ({ invest, step, setInvestVal,investVal }) => {
  const [active, setActive] = useState([]);
  const handleChange = (field, value, selectType) => {
    if (selectType) {
      setActive(value);
      setInvestVal((pre) => ({ ...pre, [field]: value }));
    } else {
      if (active?.includes(value)) {
        setActive((pre) => pre.filter((v) => v !== value));
        setInvestVal((pre) => ({
          ...pre,
          [field]: pre[field]?.includes(value)
            ? pre[field].filter((item) => item !== value)
            : [...(pre[field] || []), value,],
        }));
      } else {
        setActive([...active, value]);
        setInvestVal((pre) => ({
          ...pre,
          [field]: pre[field] ? [...pre[field], value] : [value],
        }));
      }
    }
  };

  const handleInput=(field,e,isSingle)=>{
    const {name,value}=e.target;
    if(!isSingle){
      setInvestVal((pre) => ({
        ...pre,
        [field]: pre[field].includes('Other') && !pre[field].some(v => Object.keys(v).includes(name))
          ? [...pre[field], { [name]: value }] 
          : pre[field].map((v, index) => {
              const indexToUpdate = pre[field].findIndex(obj => Object.keys(obj).includes(name));
              if (index === indexToUpdate) {
                return { ...v, [name]: value }; 
              }
              return v; 
            }),
      }));
    }else{
      setInvestVal((pre) => ({
        ...pre,
        [field]: pre[field] ? [...pre[field], value] : [value],
      }));
    }
  }

  const fieldChange = (e) => {
    const { name, value } = e.target;
    setInterval((pre) => ({ ...pre, [name]: value }));
  };

  

  return (
    <>
      <div>
        {invest?.map(
          (val, index) =>
            step === index && (
              <div>
                <h6>{val?.head}</h6>
                {index != 4 ? (
                  <>
                  <div
                    className={` ${
                      index === 1 || index === 5
                        ? "d-flex flex-wrap my-3 gap-3"
                        : `row  row-cols-${val?.field !== "investorType" && 2}`
                    } `}
                  >
                    {val?.option?.map((v, i) => (
                      <div
                        className={`${
                          index === 1 || index === 5 ? "" : "mb-4"
                        } `}
                      >
                        <div
                          onClick={() =>
                            handleChange(val?.field, v, val?.isSingle)
                          }
                          className={`bg-border cursor-pointer ${
                            active.includes(v) && "border"
                          } d-flex align-items-center gap-2 rounded-5 p-3 px-4 text-very-light-gray`}
                          key={index + " " + i}
                          style={{ width: "maxc-content" }}
                        >
                          {val?.isIcon && (
                            <div
                              className={`${val?.field!=='region'&&'bg-white'} ${val?.field==='region'&&i>=icons?.length&&'bg-white'} rounded-circle text-dark d-flex align-items-center justify-content-center`}
                              style={{width: (val?.field!=='region'||val?.field==='region'&&i>=icons?.length)&&"20px", aspectRatio: "1/1" }}
                            >
                              { val?.field==='region'&&i<icons?.length?<img style={{width:"30px"}} src={icons[i]} alt="" /> : active.includes(v) &&  <FaCheck />}
                            </div>
                          )}
                          <span >{v}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                {val.field&&investVal[val.field]?.includes('Other')&&  <div className="field mb-3" >   <input type="text" name="OtherValue" onChange={(e)=>handleInput(val?.field,e,val?.isSingle)}  className="input-field" /></div>}
                  </>
                ) : (
                  <div className="areas d-flex flex-column gap-3">
                    <div className="field">
                      <label htmlFor="">
                        What would you consider to be your field of expertise ?
                      </label>
                      <textarea
                        onChange={fieldChange}
                        rows={4}
                        className="input-field"
                        name="expertise"
                        id=""
                      ></textarea>
                    </div>
                    <div className="field">
                      <label htmlFor="">What are your main passions ?</label>
                      <textarea
                        onChange={fieldChange}
                        rows={4}
                        className="input-field"
                        name="expertise"
                        id=""
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </>
  );
};

export default Investment;


const icons =[north,latin,europe,asia,aferica,map]