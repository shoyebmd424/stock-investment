import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  deleteAuthService,
  getUsersByRolesService,
} from "../../../service/auth/AuthService";
import {
  currencyFormatter,
  deformateCurrency,
} from "../../../utils/formater/dateTimeFormater";
import { getAllDealByInvestorService } from "../../../service/deal/dealService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  const handle = async () => {
    const mem = await getUsersByRolesService("CUSTOMER");
    setMembers(mem);
  };
  useEffect(() => {
    handle();
  }, []);
  console.log(members);
  const handleDelete = async (id) => {
    await deleteAuthService(id);
    handle();
  };

  return (
    <div className="bg-white admin-dashboard h-100 ">
      <table>
        <thead className="thead-dark">
          <tr>
            <th className="border-0"></th>
            <th scope="col" className="border-0 ">
              Member's Name
            </th>
            <th></th>
            <th scope="col">Email</th>
            <th></th>
            <th scope="col">TOTAL INVESTMENT</th>
            <th></th>
            <th scope="col"> TOTAL AMOUNT </th>
            <th></th>
            <th scope="col" className="border-0"></th>
          </tr>
        </thead>
        <tbody>
          {members &&
            members?.map((val, key) => (
              <tr key={key}>
                <td></td>
                <td>
                  {" "}
                  <div className="aspect-">
                    {" "}
                    {val?.personal?.firstName} {val?.personal?.lastName}
                  </div>
                </td>
                <td></td>
                <td>{val?.account?.email}</td>
                <td></td>
                <Deals userId={val._id} />
                {/* <td ></td> */}
                <td className=" text-end">
                  <div className="d-flex gap-3">
                    <button
                      onClick={() =>
                        navigate("personal-details", { state: val?._id })
                      }
                      className="btn text-primary bg-very-light-gray rounded-circle"
                    >
                      <FaEye size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(val?._id)}
                      className="btn bg-gray bg-very-light-gray rounded-circle text-gray"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* <Demo/> */}
    </div>
  );
};

export default Dashboard;

const data = [
  { img: "", name: "THOMAS DOMINGUE", email: "domimaaw@gmail.com" },
  { img: "", name: "THOMAS DOMINGUE", email: "domimaaw@gmail.com" },
  { img: "", name: "THOMAS DOMINGUE", email: "domimaaw@gmail.com" },
  { img: "", name: "THOMAS DOMINGUE", email: "domimaaw@gmail.com" },
];

const Deals = ({ userId }) => {
  const [investment, setInvestment] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const handle = async () => {
      try {
        const data = await getAllDealByInvestorService(userId);
        let totalInvestment = 0;
        let totalAmount = 0;
        data?.forEach((val) => {
          val?.investors?.forEach((v) => {
            if (v?.investerId === userId) {
              console.log(v);
              totalAmount += parseInt(v?.amount) || 0;
              totalInvestment += 1;
            }
          });
        });
        setInvestment(totalInvestment);
        setAmount(totalAmount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    handle();
  }, [userId]);

  return (
    <>
      <td>
        {" "}
        <div style={{ fontSize: "15px" }} className="d-flex gap-2">
          {investment} Investments
        </div>
      </td>
      <td></td>
      <td>{currencyFormatter(amount)}</td>
    </>
  );
};
