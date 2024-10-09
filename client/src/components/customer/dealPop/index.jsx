import React, { useEffect, useState } from "react";
import "./dealPop.scss";
import { BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../../../utils/authenticationHelper";
import { Server } from "../../../service/axios";
import { currencyFormatter } from "../../../utils/formater/dateTimeFormater";
import { calculateIrrSingleInvestment } from "../../../utils/calculations/calculateIrrSingleInvestment";
import NetProfit from "./profitCal";

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
              <th scope="col text-uppercase " style={{ width: "60px", aspectRatio: "1/1" }}  className="border-0"> </th>
              <th scope="col text-uppercase "> COMPANY NAME</th>
              <th scope="col text-uppercase ">ASSET ClASS </th>
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
              <tr key={key} className="p-3 " >
                <td>
                <div onClick={()=>navigate("about",{state:company?._id})} className=' ms-3' style={{width:'50px',aspectRatio:"1/1"}}>  <img className='w-100 h-100 rounded-circle' src={Server+company?.profile||company?.img} alt="" /></div>
                </td>
                <td className="text-capitalize">{company?.name}</td>
                <td>{company?.dealSummary?.asset}</td>
                <td>{val?.investedDate}</td>
                <td> {currencyFormatter(val?.investors&&val?.investors?.find(v=>v.investerId===user?._id)?.amount||val?.investors&&val?.investors?.find(v=>v.investerId===userId)?.amount)}</td>
                <NetProfit deal={val} currentValuation={company?.dealSummary?.currentValuation} userId={userId||user?._id} sector={company?.dealSummary?.sector}/>
                <td><IrrVal initialInvestment={val?.investors&&val?.investors?.find(v=>v.investerId===(userId||user?._id))?.amount} investmentDate={val?.investedDate}  currentValue={val?.currentValue}/></td>
                <td>{val?.investors&&val?.investors?.find(v=>v.investerId===userId)?.shareholding}%</td>
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


const IrrVal = ({ initialInvestment, investmentDate, currentValue }) => {
  // console.log(initialInvestment, investmentDate, currentValue);
  const [irr, setirr] = useState(0);
  useEffect(() => {
    setirr(
      calculateIrrSingleInvestment(
        parseInt(initialInvestment || 0),
        new Date(investmentDate),
        parseInt(currentValue || 0),
        new Date()
      )
    );
  }, [initialInvestment, investmentDate, currentValue]);

  return <> {irr}</>;
};