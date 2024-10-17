import React, { useEffect, useState } from 'react'
import "./aboutDeal.scss"
import img from "../../../../assets/all-img/Logo-02.jpg"
import pro from "../../../../assets/profile/comment_2.png"
import { FaRegFileLines } from 'react-icons/fa6'
import { useLocation } from 'react-router-dom'
import { getByIdCompanyService } from '../../../../service/company/companyService'
import { Server } from '../../../../service/axios'
import { currencyFormatter, formatTimeFromNow } from '../../../../utils/formater/dateTimeFormater'
import { getByCompanyIdDealService } from '../../../../service/deal/dealService'
import { netMoic, netProfit } from '../../../../utils/calculations/investorGrossTotal'
import { getAuth } from '../../../../utils/authenticationHelper'
import { calculatePortfolioIrr } from '../../../../utils/calculations/portfolioIrr'
import { portfolioIrrParameter } from '../../../../utils/calculationConversion'

const AboutDeal = () => {
    const {state}=useLocation();
    const [company,setCompany]=useState(null);
    const userId=getAuth()?.user?._id;
    
    useEffect(() => {
        const getCompanyById = async () => {
          let totalProfit = 0;
          let totalMoic = 0;
          let pay = 0;
          let total = 0;
          let irr=0;
          
          const comp = await getByIdCompanyService(state);
          const data = await getByCompanyIdDealService(state);
          
          for (const item of data) {
            const investor = item?.investors?.find(v => v.investerId === userId);
            if (investor) {
              total+=1;
              const paid = parseFloat(investor?.amount || 0);
              const carried = parseFloat(investor?.carried || 0);
              const shareholding = parseFloat(investor?.shareholding || 0);
              const profitResult = await netProfit(
                paid,
                shareholding,
                parseFloat(comp?.dealSummary?.currentValuation || 0),
                item.currency,
                carried / 100
              );
              const moicResult = await netMoic(
                paid,
                shareholding,
                parseFloat(comp?.dealSummary?.currentValuation || 0),
                item.currency,
                carried / 100
              );
              
              totalProfit += profitResult;
              totalMoic += moicResult;
              pay += paid;
            }
          }
          
          const { totalCurrentValue, currentDate, investments } = portfolioIrrParameter([{ deals: data }], userId);
          if (totalCurrentValue && currentDate && investments) {
             irr = calculatePortfolioIrr(investments, currentDate, totalCurrentValue);
          }
          setCompany({
            ...comp,
            dealSummary: {
              ...comp?.dealSummary,
              totalInvestment: pay,
              profitLoss: totalProfit.toFixed(2),
              moic: totalMoic.toFixed(2),
              irr,
              investments: total,
            }
          });
        };
      
        getCompanyById();
      }, [state]); 
      

  

    return (
      <div className='new-company'>
       <div className="container">
          <div className="row">
              <div className="col-9 ps-0 h-100">
                  <div className='d-flex flex-column'>
                      <div className='cover-profile d-flex flex-column'>
                          <img src={Server+company?.cover||img} className='position-absolute rounded-3 inset-0 w-100 h-100' alt="cover" />
                          <div className="mt-auto">
                          <div className="profile  ">
                              <img src={Server+company?.profile||pro} className='position-absolute rounded-circle w-100 h-100' style={{inset:"0"}} alt="" />
                          </div>
                          </div>
                      </div>
  
                    <div className='mt-auto'>
                      <div className="about w-100 d-flex me-4 bg-dark text-white my-3 py-2 border border-2 rounded px-3 justify-content-between align-items-center">
                          <div className='fw-semibold text-uppercase'>ABOUT {company?.name}</div>
                      </div>
                      <div className=' '>
                         <textarea
                    value={company?.about}
                    style={{height:"203px"}}
                    disabled
                    className="w-100 border pb-0 bg-white rounded p-3"
                    rows={7}
                    id=""
                  ></textarea>
                      </div>
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
    { name: "sector", label: "SECTOR" ,type:"input"},
    { name: "investments", label: "NUMBER OF INVESTMENTS" ,type:"input"},
    { name: "totalInvestment", label: "TOTAL INVESTMENT",type:"input" },
    { name: "profitLoss", label: "NET PROFIT (LOSS)",type:"input" },
    { name: "moic", label: "NET MOIC",type:"input" },
    { name: "irr", label: "NET IRR",type:"input" },
  ];
  
  
  const money = ["totalInvestment", "currentValuation", "profitLoss"];