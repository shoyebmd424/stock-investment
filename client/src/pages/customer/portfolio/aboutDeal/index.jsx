import React, { useEffect, useState } from 'react'
import "./aboutDeal.scss"
import img from "../../../../assets/all-img/Logo-02.jpg"
import pro from "../../../../assets/profile/comment_2.png"
import { FaRegFileLines } from 'react-icons/fa6'
import { useLocation } from 'react-router-dom'
import { getByIdCompanyService } from '../../../../service/company/companyService'
import { Server } from '../../../../service/axios'
import { currencyFormatter, formatTimeFromNow } from '../../../../utils/formater/dateTimeFormater'
import { getInvestmentsAndCurrent } from '../../../../utils/totalInvestmentAndCurrenctByCompany'
import { companyProfit } from '../../../../utils/calculations/companyProfit'

const AboutDeal = () => {
    const {state}=useLocation();
    const [company,setCompany]=useState(null);

    useEffect(()=>{
        const getCompanyById=async()=>{
            const data=await getByIdCompanyService(state);
            const {totalInvestment,current}=await getInvestmentsAndCurrent(state);
            const pro= await companyProfit(state,data?.dealSummary?.currentValuation||0)
            setCompany({...data,dealSummary:{...data?.dealSummary,cumulatedInvest:totalInvestment,profitLoss:pro}});
        }
        getCompanyById();
    },[state]);
    return (
      <div className='new-company'>
       <div className="container">
          <div className="row">
              <div className="col-9 ps-0">
                  <div>
                      <div className='cover-profile d-flex flex-column'>
                          <img src={Server+company?.cover||img} className='position-absolute rounded-3 inset-0 w-100 h-100' alt="cover" />
                          <div className="mt-auto">
                          <div className="profile  ">
                              <img src={Server+company?.profile||pro} className='position-absolute rounded-circle w-100 h-100' style={{inset:"0"}} alt="" />
                          </div>
                          </div>
                      </div>
  
                      <div className="about w-100 d-flex me-4 bg-dark text-white my-3 py-2 border border-2 rounded px-3 justify-content-between align-items-center">
                          <div className='fw-semibold text-uppercase'>ABOUT {company?.name}</div>
                      </div>
                      <div className=' '>
                         <textarea
                    value={company?.about}
                    disabled
                    className="w-100 border pb-0 bg-white rounded p-3"
                    rows={6}
                    id=""
                  ></textarea>
                      </div>
                  </div>
              </div>
              <div className="col-3 h-100 pe-0 d-flex flex-column">
                  <div className="deal d-flex flex-column h-100">
                  <div className="about d-flex bg-black  text-white mb-3 py-2 border border-2 rounded px-2 justify-content-between align-items-center">
                          <div className='fw-semibold'>DEAL SUMMARY</div>
                      </div>
                      <div className="deal-list px-4 h-100 py-3 pb-2  rounded bg-white border border-2 d-flex flex-column gap-3 h-100">
                         {data?.map((val,index)=>( <div  key={index}>
                              <label htmlFor="" className='text-muted'>{val?.label}</label>
                              <div className='fw-bold'>{(company?.dealSummary&&money?.includes(val?.name)?currencyFormatter(company?.dealSummary[val?.name]):company?.dealSummary[val?.name])||"-"}</div>
                          </div>))}
                      </div>
                  </div>
  
              </div>
          </div>
          <div className="row pb-3 pe-0">
              <div className="col-md-6 ps-0 ">
              <div className=" d-flex bg-black text-white my-3 py-2 border border-2 rounded px-3 justify-content-between align-items-center">
                          <div className='fw-semibold'>Latest News</div>
                      </div>
                      <div className="details bg-white rounded d-flex flex-column gap-3 p-3">
                        {company?.news&&company?.news.map((val,i)=>(
                        <div className='d-flex  flex-column gap-2' key={i}>  <div className="d-flex justify-content-between"><a href={val?.link} className='text-red' target="_blank" rel="noopener noreferrer"> {val?.name}</a></div>
                       <small className='text-muted tracking-normal'>{formatTimeFromNow(val?.date)}</small>
                        </div>
                        ))}
  
                      </div>
              </div>
              <div className="col-md-6 m-0 row pe-0">
                  <div className="col-6 ps-0 ">
                      <div>   <div className=" d-flex bg-black text-white my-3 py-2 border border-2 rounded px-3 justify-content-between align-items-center">
                          <div className='fw-semibold text-uppercase'>Business Updates                          </div>
                      </div>
                      <div className="details bg-white rounded d-flex flex-column gap-3 py-3 ">
                      {company?.update&&company?.update.map((val,i)=>(
                                   <div key={i} className="d-flex  mx-2 ms-3 gap-2">
                                   <div><FaRegFileLines className='text-muted' size={20}/></div> <div className="d-flex flex-column gap-1">
                                       <small className='text-muted'> CONTRACT UPDATE</small>
                                       <small className='fw-bold'>{val?.date}</small>
                                   </div>
                               </div>
                      ))}
                      </div></div>
                  </div>
                  <div className="col-6 pe-0 ps-3">
                      <div>   <div className=" d-flex bg-black text-white my-3 py-2 border border-2 rounded px-3 justify-content-between align-items-center">
                          <div className='fw-semibold'> INVESTMENT DOCS
                          </div>
                      </div>
                      <div className="details bg-white rounded d-flex flex-column gap-3 py-3">
                      {company?.update&&company?.update.map((val,i)=>(
                                     <div key={i} className="d-flex  mx-2 ms-3 gap-2">
                                     <div><FaRegFileLines className='text-muted' size={25}/></div> <div className="d-flex flex-column gap-1">
                                         <small className='text-muted'> CONTRACT UPDATE</small>
                                         <small className='fw-bold'>{val?.date}</small>
                                     </div>
                                 </div>
                      ))}
  
                      </div></div>
                  </div>
              </div>
          </div>
       </div>
      </div>
  )
}

export default AboutDeal;

const data = [
    { name: "asset", label: "ASSET CLASS" ,type:"input"},
    { name: "investDate", label: "INVESTMENT DATE",type:"input" },
    { name: "sector", label: "SECTOR",type:"input" },
    { name: "cumulatedInvest", label: "CUMULATED INVESTMENTS", },
    { name: "currentValuation", label: "CURRENT VALUATION" },
    { name: "profitLoss", label: "TOTAL PROFIT (LOSS)" },
  ];
  
  
  const money = ["cumulatedInvest", "currentValuation", "profitLoss"];