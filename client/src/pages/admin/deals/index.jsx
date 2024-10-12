import React, { useEffect, useRef, useState } from "react";
import "./deals.scss";
import { useNavigate } from "react-router-dom";
import {
  getAllDealService,
  updateDealService,
} from "../../../service/deal/dealService";
import { Server } from "../../../service/axios";
import { currencyFormatter } from "../../../utils/formater/dateTimeFormater";
import { calculateIrrSingleInvestment } from "../../../utils/calculations/calculateIrrSingleInvestment";
import { getByIdCompanyService } from "../../../service/company/companyService";
import { getUserByIdService } from "../../../service/auth/AuthService";
import {
  netMoic,
  netProfit,
} from "../../../utils/calculations/investorGrossTotal";
import {
  MdArrowDropUp,
  MdOutlineArrowDropDown,
  MdOutlineModeEdit,
} from "react-icons/md";
const Deals = () => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [sort, setSort] = useState("desc");
  useEffect(() => {
    const handle = async () => {
      const deals = await getAllDealService();
      const dealsWithCompanyNames = await Promise.all(
        deals.map(async (deal) => {
          const company = await getCompanyById(deal.companyId);
          return {
            ...deal,
            companyName: company?.name,
            profile: company?.profile,
          };
        })
      );

      setDeals(dealsWithCompanyNames);
    };

    handle();
  }, []);

  const getCompanyById = async (companyId) => {
    return await getByIdCompanyService(companyId);
  };

  const handleSortByCompanyName = () => {
    setSort((pre) => (pre == "asc" ? "desc" : "asc"));
    const sortedDeals = [...deals]?.sort((a, b) => {
      if (sort === "asc") {
        return a?.companyName?.localeCompare(b?.companyName);
      } else if (sort === "desc") {
        return b?.companyName?.localeCompare(a?.companyName);
      }
      return 0;
    });
    setDeals(sortedDeals);
  };

  return (
    <div className="deals">
      <table className="ps-5 table">
        <thead className="thead-dark">
          <tr>
            <th
              scope="col text-uppercase "
              style={{ width: "60px", aspectRatio: "1/1" }}
              className="border-0"
            >
              
            </th>
            <th
              scope="col text-uppercase "
              onClick={() => handleSortByCompanyName()}
            >
              
              COMPANY
              {sort === "asc" ? (
                <MdArrowDropUp size={30} />
              ) : (
                <MdOutlineArrowDropDown size={30} />
              )}
            </th>
            <th scope="col text-uppercase ">Investor </th>
            <th scope="col text-uppercase "> INVESTMENT DATE</th>
            <th scope="col text-uppercase "> INVESTMENT</th>
            <th scope="col text-uppercase ">NET PROFIT(LOSS)</th>
            <th scope="col text-uppercase ">NET MOIC</th>
            <th scope="col text-uppercase ">NET IRR </th>
            <th scope="col text-uppercase ">Current Shareholding(%) </th>
            <th
              style={{ width: "60px", aspectRatio: "1/1" }}
              className="border-0"
            ></th>
          </tr>
        </thead>
        <tbody>
          {deals?.map((val, key) =>
            val?.investors?.map((v, i) => (
              <tr key={key} className="p-3 ">
                {/* <GetCompany id={val?.companyId}/> */}
                <td>
                  <div
                    onClick={() => navigate("about", { state: val?.companyId })}
                    className=" ms-3"
                    style={{ width: "50px", aspectRatio: "1/1" }}
                  >
                    <img
                      className="w-100 h-100 rounded-circle"
                      src={Server + val?.profile || val?.img}
                      alt=""
                    />
                  </div>
                </td>
                <td className="text-capitalize">{val?.companyName}</td>
                <GetInvest
                  deal={val}
                  investor={v}
                  investDate={val?.investedDate}
                  currentValuation={val?.currentValue}
                />
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Deals;
const GetCompany = ({ id }) => {
  const [company, setCompany] = useState(null);
  useEffect(() => {
    const handle = async () => {
      const data = await getByIdCompanyService(id);
      setCompany(data);
    };
    if (id) {
      handle();
    }
  }, [id]);
  return (
    <>
      <td>
        <div
          onClick={() => navigate("about", { state: company?._id })}
          className=" ms-3"
          style={{ width: "50px", aspectRatio: "1/1" }}
        >
          <img
            className="w-100 h-100 rounded-circle"
            src={Server + company?.profile || company?.img}
            alt=""
          />
        </div>
      </td>
      <td className="text-capitalize">{company?.name}</td>
    </>
  );
};

const GetInvest = ({ deal, investor, investDate, currentValuation }) => {
  const [profit, setprofit] = useState(0);
  const [moic, setMoic] = useState(0);
  const [shareholding, setShare] = useState(investor?.shareholding);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    const handle = async () => {
      const paid =
        parseFloat(investor?.amount || 0) + parseFloat(investor?.fees || 0);
      const carried = parseFloat(investor?.carried || 0);
      const shareholding = parseFloat(investor?.shareholding || 0);
      const profitResult = await netProfit(
        paid,
        shareholding,
        currentValuation,
        deal.currency,
        carried / 100
      );
      const moicResult = await netMoic(
        paid,
        shareholding,
        currentValuation,
        deal.currency,
        carried / 100
      );
      setprofit(profitResult?.toFixed(2));
      setMoic(moicResult);
    };
    handle();
  }, [deal, investor, investDate, currentValuation]);

  const editRef = useRef();

  useEffect(() => {
    const handle = (e) => {
      if (editRef?.current && !editRef?.current.contains(e.target)) {
        setIsEdit(false);
      }
    };

    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  }, []);
  const handleChange = async (e) => {
    // const { value } = e.target;
    let val=e.target.value.replace("%", "");
    deal.investors.find(
      (v) =>
        v?.investerId === investor?.investerId && v?.profit === investor?.profit
    ).shareholding = parseFloat(val || 0);
    setShare(val);
    await updateDealService(deal?._id, deal);
  };

  return (
    <>
      <td>
        <InvestorName id={investor?.investerId} />
      </td>
      <td>{investDate}</td>
      <td> {currencyFormatter(investor?.invest, deal?.currency)}</td>
      <td>{profit}</td>
      <td> {moic && moic?.toString()?.substring(0, 4)}</td>
      <td>
        <IrrVal
          initialInvestment={investor?.amount}
          investmentDate={investDate}
          currentValue={currentValuation}
        />
      </td>
      <td style={{ width: "60px", aspectRatio: "1/1" }}>
        
        <div className="d-flex field " ref={editRef}>
          
          {/* {!isEdit ? (
            <>
              <div className="d-flex gap-3">
                <span>{shareholding}%</span>
                <MdOutlineModeEdit
                  className="text-danger"
                  onClick={() => setIsEdit(true)}
                  style={{ cursor: "pointer" }}
                  size={20}
                />
              </div>
            </>
          ) : ( */}
            <input
              type="text"
              className="input-field py-2 me-3"
              value={shareholding !== "" ? `${shareholding}%` : ""}
              onChange={handleChange}
            />
          {/* )} */}
        </div>
      </td>
    </>
  );
};

const InvestorName = ({ id }) => {
  const [user, setuser] = useState(null);
  useEffect(() => {
    const handle = async () => {
      const data = await getUserByIdService(id);
      setuser(data);
    };
    if (id) {
      handle();
    }
  }, [id]);
  return (
    <>
      
      {user?.personal?.firstName} {user?.personal?.lastName}
    </>
  );
};

const IrrVal = ({ initialInvestment, investmentDate, currentValue }) => {
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
