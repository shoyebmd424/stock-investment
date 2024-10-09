import React, { useEffect, useState } from 'react'
import "../createMamber.scss"
import { getAllDealByUserAndCompanyService } from '../../../../../service/deal/dealService';
import { getByIdCompanyService } from '../../../../../service/company/companyService';
import { portfolioIrrParameter } from '../../../../../utils/calculationConversion';
import { calculatePortfolioIrr } from '../../../../../utils/calculations/portfolioIrr';
import DealListpop from '../../../../../components/customer/dealPop';
import { Server } from '../../../../../service/axios';
import { IoIosArrowForward } from "react-icons/io";
import { currencyFormatter } from '../../../../../utils/formater/dateTimeFormater';
import NetProfit from './values/netProfit';

const Investments = ({userId}) => {
  const [company,setCompany]=useState([]);

  useEffect(()=>{
    const getCompany=async()=>{
        const data=await getAllDealByUserAndCompanyService(userId);
        setCompany(data);
    }
    getCompany();
  },[]);
  return (
    <>
       <div className="bg-white h-50">
            <table >
              <thead className="thead-dark">
                <tr>
                  <th scope="col text-uppercase "style={{ width: "60px", aspectRatio: "1/1" }}  className="border-0" > </th>
                  <th scope="col text-uppercase "> COMPANY</th>
                  <th scope="col text-uppercase ">ASSET CLASS</th>
                  <th scope="col text-uppercase ">NET PROFIT(LOSS)</th>
                  <th scope="col text-uppercase ">SECTOR</th>
                  <th scope="col text-uppercase ">NET MOIC</th>
                  <th scope="col text-uppercase ">TOTAL INVESTMENT</th>
                  <th scope="col text-uppercase ">NET IRR </th>
                  <th scope="col text-uppercase " className='text-end'>NUMBER OF INVESTMENTS </th>
                  <th style={{ width: "60px", aspectRatio: "1/1" }}  className="border-0"></th>
                </tr>
              </thead>
              <tbody>
              {company.length==0&& <h5 className='text-center text-muted'>No Any Investment  </h5>}
                {company.length > 0 &&
                  company?.map((val, key) => (
                    <Company list={company} index={key} companyId={val?._id} userId={userId} deals={val?.deals}/>
                  ))}
              </tbody>
            </table>
          </div>
    </>
  )
}

export default Investments;

  
const Company = ({ companyId,list, index, deals,userId }) => {
  const [company, setCompany] = useState({});
  const [isDealList, setisDealList] = useState(false);
  const [totalIvestMents,setTotalInvestMent]=useState(0);
  const [currentValuation,setCurrentValuation]=useState(0);
  const [irr,setIrr]=useState(0);

  useEffect(() => {
    const getCompanyById = async () => {
      const data = await getByIdCompanyService(companyId);
      setCompany(data);
      setCurrentValuation(data?.dealSummary?.currentValuation);
      setTotalInvestMent(() => {
        const totalDeals = deals.reduce((sum, item) => {
          const investor=item?.investors?.find(v=>v.investerId===userId);
          return sum + ( parseInt(investor?.amount || 0));
        }, 0);
        return totalDeals;
      });
      
      const filteredList=list?.filter(v=>v._id===companyId);
      const {totalCurrentValue, currentDate, investments}=portfolioIrrParameter(filteredList,userId);
      if(totalCurrentValue&&currentDate&&investments){
        setIrr(calculatePortfolioIrr(investments,currentDate,totalCurrentValue));
      }

    };
    getCompanyById();
  }, [companyId,deals]);
  return (
    <>
      <tr key={index} className="p-3 ">
        <td>
        <div className='ms-2 ' style={{width:'50px',aspectRatio:"1/1"}}>  <img className='w-100 h-100 rounded-circle' src={Server+company?.profile||company?.img} alt="" /></div>
        </td>
        <td className='text-capitalize'>{company?.name}</td>
        <td>{company?.dealSummary?.asset}</td>
        <NetProfit deals={deals} userId={userId} currentValuation={currentValuation} sector={company?.dealSummary?.sector} />
        <td>{currencyFormatter(totalIvestMents)}</td>
        <td>{irr}</td>
        <td className='text-end'>
          <div className="d-flex justify-content-end">
          <button onClick={() => setisDealList(true)} className="btn-dark d-flex justify-content-center gap-2 align-items-center">
            {deals && deals?.length} <div style={{width:"25px",aspectRatio:"1/1"}} className=' rounded-circle bg-dark-orange'> <IoIosArrowForward size={10} /></div>
          </button>
          </div>
        </td>
        <td style={{ width: "60px", aspectRatio: "1/1" }}>
              </td>
      </tr>
      {isDealList && <DealListpop userId={userId} company={company} deals={deals} setIsNew={setisDealList} />}
    </>
  );
};
  
