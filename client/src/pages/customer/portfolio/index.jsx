import React, { useEffect, useState } from "react";
import "./portfolio.scss";
import invest from "../../../assets/all-img/investment.png";
import valuation from "../../../assets/all-img/examination.png";
import amount from "../../../assets/all-img/receive-money.png";
import moicp from "../../../assets/all-img/distribution-of-wealth.png";
import pro from "../../../assets/all-img/increase.png";
import irr from "../../../assets/all-img/return-on-investment.png";
import DealListpop from "../../../components/customer/dealPop";
import {
  getAllCompanyService,
  getByIdCompanyService,
} from "../../../service/company/companyService";
import {
  getAllDealByUserAndCompanyService,
  getByCompanyIdDealService,
} from "../../../service/deal/dealService";
import { Server } from "../../../service/axios";
import { getAuth } from "../../../utils/authenticationHelper";
import { currencyFormatter } from "../../../utils/formater/dateTimeFormater";
import { portfolioIrrParameter } from "../../../utils/calculationConversion";
import {
  calculatePortfolioIrr,
  calculateXIRRPortfolio,
} from "../../../utils/calculations/portfolioIrr";
import NetProfit from "../../admin/members/createMamber/investments/values/netProfit";
import {
  exchange,
  netMoic,
  netProfit,
} from "../../../utils/calculations/investorGrossTotal";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const [company, setCompany] = useState([]);
  const [totalInvestments, setTotalInvestment] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [TotalCurrenctValuation, setTotalCurrentValuation] = useState(0);
  const [rate, setRate] = useState(1);
  const [profit, setprofit] = useState(0);
  const [moic, setMoic] = useState(0);
  const [irrVal, setIrr] = useState(0);
  const userId = getAuth()?.user?._id;

  const fieldData = [
    { name: " TOTAL INVESTMENTS", qty: totalInvestments, icon: invest },
    {
      name: "   AMOUNT INVESTED (INCL. FEES)",
      qty:  currencyFormatter(totalInvested),
      icon: amount,
    },
    {
      name: "CURRENT VALUE OF INVESTMENT",
      qty: currencyFormatter(TotalCurrenctValuation),
      icon: valuation,
    },
    { name: " NET PROFIT (LOSS)", qty: (profit<0?"(-) ":"")+currencyFormatter(Math.abs(profit)), icon: pro },
    {
      name: "  NET MOIC",
      qty: (moic && moic?.toString()?.substring(0, 4) + "x") || 0,
      icon: moicp,
    },
    { name: "  NET IRR", qty: irrVal+"%", icon: irr },
  ];
  useEffect(() => {
    const getCompany = async () => {
      const data = await getAllDealByUserAndCompanyService(userId);
      let totalProfit = 0;
      let totalMoic = 0;
      let pay = 0;
      let total = 0;
     let investment=[]
      for (const it of data) {
        for (const item of it?.deals) {
          const rat = await exchange(item?.currency);
          setRate(rat);
          const company = await getByIdCompanyService(item?.companyId);
          const investor = item?.investors?.find(
            (v) => v.investerId === userId
          );
          if (investor) {
            total += 1;
            const paid =
              parseFloat(investor?.amount || 0) +
              parseFloat(investor?.fees || 0);
            const carried = parseFloat(investor?.carried || 0);
            const shareholding = parseFloat(investor?.shareholding || 0);
            const profitResult = await netProfit(
              paid,
              shareholding,
              parseInt(company?.dealSummary?.currentValuation || 0),
              item.currency,
              carried / 100
            );
            const moicResult = await netMoic(
              paid,
              shareholding,
              parseInt(company?.dealSummary?.currentValuation || 0),
              item.currency,
              carried / 100
            );
            totalProfit += profitResult;
            totalMoic += moicResult;
            pay += paid;
            investment = [...investment, [-1 * paid, item?.investedDate]];
          }
        }
      }
        if(pay!==0){
      investment = [...investment, [pay + totalProfit, new Date()]];
      const netIrr = calculateXIRRPortfolio(investment);
      setIrr(netIrr?.toFixed(2));
        }
      
      setprofit(totalProfit);
      setMoic(totalMoic / total);
      setTotalInvested(pay);
      setTotalCurrentValuation(pay + totalProfit);
      setCompany(data);
      setTotalInvestment(total);
    };

    getCompany();
  }, [userId]);

  return (
    <>
      {/* overview */}
      <div className="">
        <div className="container w-100 pe-0">
          <div className="row">
            <div className="row row-cols-3 pe-0">
              {fieldData?.map((val, index) => (
                <div key={index} className="px-0">
                  <div
                    className={`d-flex px-4 py-3 border border-2 mb-3 ${
                      index % 3 !== 0 && "mx-3 me-0"
                    } rounded-1 border-dark bg-white  justify-content-between`}
                  >
                    <div className="d-flex flex-column gap-2 justify-content-between">
                      <span className="text-muted small fw-bold">{val?.name}</span>
                      <span className="fw-bold p-txt fs-5 ">{val?.qty}</span>
                    </div>
                    <div
                      className="my-auto  rounded-circle bg-very-light-red"
                      style={{ width: "50px", aspectRatio: "1/1" }}
                    >
                      <img className="w-100 h-100 p-2" src={val?.icon} alt="" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* investment */}
      <div className="h-50">
        <div className="my-3">
          <div className="bg-dark py-3 px-4 rounded d-flex justify-content-between">
            <h5 className="text-white mb-0 fw-bold text-capitalize">
              Investments
            </h5>
          </div>
        </div>
        <div className="bg-white h-50">
          <table className="px-3">
            <thead className="thead-dark">
              <tr>
                <th
                  scope="col "
                  className="border-0"
                >
                </th>
                <th scope="col "> COMPANY</th>
                <th scope="col">ASSET CLASS</th>
                <th scope="col ">TOTAL INVESTMENT</th>
                <th scope="col ">NET PROFIT(Loss)</th>
                <th scope="col ">SECTOR</th>
            <th scope="col ">NET MOIC</th>
                <th scope="col ">NET IRR </th>
                <th scope="col ">
                  NUMBER OF INVESTMENTS{" "}
                </th>
                <th
                  className="border-0"
                ></th>
              </tr>
            </thead>
            <tbody>
              {company &&
                company.length > 0 &&
                company?.map((val, key) => (
                  <Company
                    list={company}
                    index={key}
                    companyId={val?._id}
                    userId={userId}
                    deals={val?.deals}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Portfolio;

const Company = ({ companyId, list, index, deals, userId }) => {
  const [company, setCompany] = useState(null);
  const [isDealList, setisDealList] = useState(false);
  const [totalIvestMents, setTotalInvestMent] = useState(0);
  const [irr, setIrr] = useState(0);
  const navigate = useNavigate();
  // console.log(companyId)

  useEffect(() => {
    const getCompanyById = async () => {
      const data = await getByIdCompanyService(companyId);
      setCompany(data);
      setTotalInvestMent(() => {
        const totalDeals = deals.reduce((sum, item) => {
          const investor = item?.investors?.find(
            (v) => v.investerId === userId
          );
          return sum + parseFloat(investor?.amount || 0);
        }, 0);
        return totalDeals;
      });

      const filteredList = list?.filter((v) => v._id === companyId);
      const { totalCurrentValue, currentDate, investments } =
        portfolioIrrParameter(filteredList, userId);
      if (totalCurrentValue && currentDate && investments) {
        setIrr(
          calculatePortfolioIrr(investments, currentDate, totalCurrentValue)
        );
      }
    };
    getCompanyById();
  }, [companyId]);

  return (
    <>
      <tr key={index} className="p-3 ">
        <td>
          <div
            onClick={() =>
              navigate("/customer/overview/about", { state: companyId })
            }
            className=" ms-2"
            style={{ aspectRatio: "1/1" }}
          >
            <img
              className="w-100 h-100 cursor-pointer rounded-circle"
              src={Server + company?.profile || company?.img}
              alt=""
            />
          </div>
        </td>
        <td className="text-capitalize cursor-pointer"   onClick={() =>
              navigate("/customer/overview/about", { state: companyId })
            }>{company?.name}</td>
        <td>{company?.dealSummary?.asset}</td>
        <td>{currencyFormatter(totalIvestMents)}</td>
        <NetProfit
          deals={deals}
          userId={userId}
          currentValuation={company?.dealSummary?.currentValuation}
          sector={company?.dealSummary?.sector}
        />
        {/* <td>{irr}</td> */}
        <td>
          <div className="d-flex">
            <button
              onClick={() => setisDealList(true)}
              className="btn-dark d-flex justify-content-center gap-2 align-items-center"
            >
              {deals && deals?.length}
              <div
                style={{ width: "25px", aspectRatio: "1/1" }}
                className=" rounded-circle bg-dark-orange"
              >
                <IoIosArrowForward size={10} />
              </div>
            </button>
          </div>
        </td>
        {/* <td style={{ width: "50px", aspectRatio: "1/1" }}></td> */}
      </tr>
      {isDealList && (
        <DealListpop
          userId={userId}
          company={company}
          deals={deals}
          setIsNew={setisDealList}
        />
      )}
    </>
  );
};
