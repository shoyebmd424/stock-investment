import React, { useEffect, useState } from "react";
import "./companies.scss";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import AddDealPop from "../../../components/admin/companies/createDealPop";
import { useNavigate } from "react-router-dom";
import {
  deleteCompanyService,
  getAllCompanyService,
} from "../../../service/company/companyService";
import { Server } from "../../../service/axios";
import { currencyFormatter } from "../../../utils/formater/dateTimeFormater";
import { getInvestmentsAndCurrent } from "../../../utils/totalInvestmentAndCurrenctByCompany";

const Companies = () => {
  const [isDeal, setIsDeal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const navigate = useNavigate();

  const handle = async () => {
    const data = await getAllCompanyService();
    setCompanies(data);
  };
  useEffect(() => {
    handle();
  }, []);

  const hanndleDelete = async (id) => {
    setCompanies((pre) => pre.filter((v) => v._id !== id));
    await deleteCompanyService(id);
  };
  const reFetch = () => {
    handle();
  };

  return (
    <div className="bg-white company h-100 ">
      <table>
        <thead className="thead-dark">
          <tr>
            <th className="border-0" scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">CUMULATED INVESTMENT</th>
            <th scope="col">CURRENT VALUATION </th>
            <th scope="col"></th>
            <th
              style={{  aspectRatio: "1/1" }}
              className="border-0"
            ></th>
          </tr>
        </thead>
        <tbody>
          {companies &&
            companies?.map((val, key) => (
              <tr key={key} className=" ">
                <td>
                  <div
                    style={{
                      aspectRatio: "1/1",
                    }}
                  >
                    <img
                      className="w-100 h-100 rounded-circle"
                      src={Server + val?.profile}
                      alt=""
                    />
                  </div>
                </td>

                <td className="text-uppercase ">{val?.name}</td>
                <Invest id={val?._id} />
                <td>
                  {currencyFormatter(val?.dealSummary?.currentValuation)}
                </td>
                <td className="">
                 <div className=" create-deal-btn"> <button
                    className="btn-red"
                    onClick={() => {
                      setIsDeal(!isDeal);
                      setCompanyId(val?._id);
                    }}
                  >
                    Create a deal
                  </button>
                  </div>
                </td>
                <td className="text-end ">
                <div className="d-flex gap-4" style={{width:"50px",aspectRatio:"1/1"}}>
                  <button
                    onClick={() => navigate("new-company", { state: val?._id })}
                    className="btn text-primary w-100 h-100 cursor-pointer bg-very-light-gray rounded-circle"
                  >
                    <FaEye size={20} />
                  </button>
                  </div>
                </td>
                <td>
                  <div className="d-flex gap-4" style={{width:"50px",aspectRatio:"1/1"}}>
                    <button
                      onClick={() => hanndleDelete(val?._id)}
                      className="btn text-danger bg-very-light-gray  w-100 h-100 rounded-circle"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isDeal && (
        <AddDealPop
          reFetch={reFetch}
          companyId={companyId}
          setIsNew={setIsDeal}
        />
      )}
    </div>
  );
};

export default Companies;

const Invest = ({ id }) => {
  const [totat, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const handle = async () => {
      const { totalInvestment, current } = await getInvestmentsAndCurrent(id);
      setTotal(totalInvestment);
      setCurrent(current);
    };
    handle();
  }, [id]);

  return (
    <>
      <td> {currencyFormatter(totat)}</td>
    </>
  );
};
