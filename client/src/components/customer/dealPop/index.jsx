import React, { useEffect, useState } from "react";
import "./dealPop.scss";
import { BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../../../utils/authenticationHelper";
import { Server } from "../../../service/axios";
import { currencyFormatter } from "../../../utils/formater/dateTimeFormater";
import NetProfit from "./profitCal";
import { getWeight } from "../../../utils/calculations/weightCalculate";

const DealListpop = ({ setIsNew,company, deals,userId }) => {
  const navigate=useNavigate();
  const user= getAuth()?.user;  
  return (
    <div className="pop">
      <div className="pop-body col-md-10">
        <div className="text-end">
          <BsX
            onClick={() => setIsNew((pre) => !pre)}
            className="cursor-pointer"
            size={30}
          />
        </div>
        <div className="">
        <table>
          <thead className="thead-dark">
            <tr>
              <th scope="col text-uppercase " style={{  aspectRatio: "1/1" }}  className="border-0"> </th>
              <th scope="col text-uppercase "> COMPANY <br /> NAME</th>
              <th scope="col text-uppercase "> INVESTMENT DATE</th>
              <th scope="col text-uppercase "> INVESTMENT</th>
              <th scope="col text-uppercase ">NET PROFIT(LOSS)</th>
              <th scope="col text-uppercase ">SECTOR</th>
              <th scope="col text-uppercase ">NET MOIC</th>
              <th scope="col text-uppercase ">NET IRR </th>
              <th scope="col text-uppercase ">WEIGHT </th>
              <th style={{ width: "60px", aspectRatio: "1/1" }}  className="border-0"></th>
            </tr>
          </thead>
          <tbody>
            {deals?.map((val, key) => (
              <tr key={key} className="" >
                <td>
                <div onClick={()=>navigate("about",{state:company?._id})} className='' style={{aspectRatio:"1/1"}}>  <img className='w-100 h-100 rounded-circle cursor-pointer' src={Server+company?.profile||company?.img} alt="" /></div>
                </td>
                <td onClick={()=>navigate("about",{state:company?._id})} className="text-capitalize  cursor-pointer">{company?.name}</td>
                <td>{val?.investedDate}</td>
                <td> {currencyFormatter(val?.investors&&val?.investors?.find(v=>v.investerId===user?._id)?.amount||val?.investors&&val?.investors?.find(v=>v.investerId===userId)?.amount)}</td>
                <NetProfit deal={val} currentValuation={company?.dealSummary?.currentValuation} userId={userId||user?._id} sector={company?.dealSummary?.sector}/>
                <td> <GetWeight userId={userId} amount={val?.investors&&val?.investors?.find(v=>v.investerId===userId)?.amount} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       
      </div>
    </div>
  );
};

export default DealListpop;


const GetWeight=({userId,amount})=>{
  const [weight,setWeight]=useState(0);
  useEffect(()=>{
    const handle=async()=>{
      const wt=await getWeight(userId,parseFloat(amount||0));
      console.log(userId,amount,wt);
      setWeight(wt);
    }
    handle();
  },[userId,amount])
  return<>{weight}% </>
}
