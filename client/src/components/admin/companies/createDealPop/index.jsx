import React, { useEffect, useState } from "react";
import "./pop.scss";
import { BsX, BsPlus } from "react-icons/bs";
import { addDealService } from "../../../../service/deal/dealService";
import { getUsersByRolesService } from "../../../../service/auth/AuthService";
import { getByIdCompanyService,    updateCompanyWithoutService } from "../../../../service/company/companyService";
import axios from "axios";
import { exChangeByDate, netMoic, netProfit } from "../../../../utils/calculations/investorGrossTotal";
import { currencyFormatter } from "../../../../utils/formater/dateTimeFormater";
import { calculateXIRRSingleInvestment } from "../../../../utils/calculations/calculateIrrSingleInvestment";

const AddDealPop = ({ setIsNew, companyId,reFetch }) => {

  const [deal, setDeal] = useState({});
  const [fields, setFields] = useState([]);
  const [investors,setInvestor]=useState([]);
  const [currency,setCurrency]=useState({currency:'EUR'});
  const [company,setComapany]=useState('');
  const [rate,setRate]=useState(0.94);
  const [current,setCurrent]=useState(0);

  useEffect(()=>{
    const handle=async()=>{
      const data=await getByIdCompanyService(companyId);
      setComapany(data);
    }
    handle();
  },[companyId]);
  
  useEffect(()=>{
    const handle=async()=>{
      const {data}=await axios.get(`https://api.frankfurter.app/latest?from=${currency?.currency}`);
      const rates=await exChangeByDate(currency?.currency,deal?.investedDate);
      setCurrent(data?.rates?.EUR||1)
      setRate(rates||1)
    }
    handle();
  },[currency?.currency,deal?.investedDate])


  useEffect(()=>{
    const getUsers=async()=>{
      const data=await getUsersByRolesService("CUSTOMER")
      setInvestor(data);
    }
    getUsers();
  },[]);

  const handleAddField = () => {
    setFields([...fields, { name: '', amount: '', entryFee: '', carried: '' }]);
  };

  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleChange = async (index, event) => {
    const { name, value } = event.target;
    
    const newFields = await Promise.all(
      fields.map(async (field, i) => {
        if (i === index) {
          // First, update the field with the new value
          const updatedField = {
            ...field,
            [name]: value
          };

          const amount = parseInt(updatedField['amount'] || 0);
          const entryFee = parseFloat(updatedField['entryFee'] || 0);
          const carried = parseFloat(updatedField['carried'] || 0);
          const shareholding = parseFloat(updatedField['shareholding'] || 0);
          const paid=(amount + ((amount * entryFee) / 100))*rate;
          updatedField.fees = (amount * entryFee) / 100;
          updatedField.profit = await netProfit((amount + ((amount * entryFee) / 100))*rate, shareholding, deal?.currentValue, currency?.currency, carried/100);
          updatedField.moic = await netMoic((amount + ((amount * entryFee) / 100))*rate, shareholding, deal?.currentValue, currency?.currency, carried/100);
           updatedField.irr = calculateXIRRSingleInvestment(
            -1 * paid,
            deal?.investedDate,
            paid + updatedField.profit,
            new Date().toLocaleDateString()
          );
          return updatedField;
        }
        return field;
      })
    );

    setFields(newFields);
};


  const handleDeal = async (e) => {
    e.preventDefault();
   const newFields= fields?.map((val,i)=>({...val, amount:parseInt(val?.amount||0)*rate,invest:parseInt(val?.amount||0),fees:parseFloat(val?.fees||0)*rate}));
    const newDeal = { ...deal,currency:currency?.currency, investors: newFields, companyId };
    let investDate;
    if(!company.dealSummary||!company.dealSummary.investDate){
     investDate= deal?.investedDate;
    }else{
      investDate=company?.dealSummary.investDate;
    }
    await updateCompanyWithoutService(companyId,{investDate:investDate,currentValuation:deal?.currentValue});
    const data=    await addDealService(newDeal);
    if(data){
        reFetch();
        setIsNew(false);
    }
  };
  return (
    <div className="pop">
      <div className="pop-body col-10 pb-5">
        <div className="text-end">
          <BsX
            onClick={() => setIsNew((prev) => !prev)}
            className="cursor-pointer"
            size={30}
          />
        </div>
        <h5 className="text-center mb-4 fs-3 fw-bold">Add a deal</h5>
        <form onSubmit={handleDeal}>
          <div className="d-flex flex-column gap-4 col-md-10 mx-auto">
            <div className="d-flex gap-3 justify-content-end">
              <div>
                <div> old Rate </div>
                <div className="text-center text-red">{rate} €</div>
              </div>
              <div>
                <div> Current Rate </div>
                <div className="text-center text-success">{current} €</div>
              </div>
            </div>
            <div className="d-flex gap-4 align-items-center">
              <div className="field">
                <label htmlFor="valuation">Current valuation</label>
                <input
                  type="text"
                  name="valuation"
                  value={deal?.currentValue}
                  onChange={(e) =>{
                    setDeal({
                      ...deal,
                      currentValue: e.target.value,
                    });
                  }
                  }
                  className="input-field"
                />
              </div>
              <div className="field">
                <label htmlFor="date">Investment date</label>
                <input
                  type="date"
                  name="date"
                  onChange={(e) =>
                    setDeal({ ...deal, investedDate: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div className="field">
                <label htmlFor="date">Currency</label>
                <select
                  onChange={(e) => setCurrency(JSON.parse(e.target.value))}
                  name=""
                  id=""
                  className="input-field"
                >
                  <option value={JSON.stringify({ currency: "EUR" })}>
                    Euro
                  </option>
                  <option value={JSON.stringify({ currency: "USD" })}>
                    US Dollar
                  </option>
                </select>
              </div>
            </div>
            {fields.map((field, index) => (
              <>
              <div className="border border-3 p-3 rounded-5 border-secondary position-relative">
                <div className="d-flex gap-4 align-items-center" key={index}>
                  <div className="field w-50">
                    <label htmlFor={`name-${index}`}>Select Investors</label>
                    <div className="input-field w-100">
                      <select
                        name="investerId"
                        value={field.investerId}
                        onChange={(event) => handleChange(index, event)}
                        style={{ outline: "none" }}
                        className="border-0 bg-transparent w-100"
                      >
                        <option value="">Select Investor</option>
                        {investors?.length > 0 &&
                          investors.map((val, index) => (
                            <option key={index} value={val?._id}>
                              {val?.personal?.firstName}{" "}
                              {val?.personal?.lastName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor={`amount-${index}`}>Amount invested</label>
                    <input
                      type="text"
                      name="amount"
                      value={field.amount}
                      className="input-field"
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor={`entryFee-${index}`}> Entry Fee (%)</label>
                    <input
                      type="text"
                      name="entryFee"
                      value={field.entryFee}
                      className="input-field"
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor={`carried-${index}`}>Carried (%)</label>
                    <input
                      type="text"
                      name="carried"
                      value={field.carried}
                      className="input-field"
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor={`share-${index}`}> Shareholding (%)</label>
                    <input
                      type="text"
                      name="shareholding"
                      value={field.shareholding}
                      className="input-field"
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  <div className="d-flex gap-2 mt-auto align-items-center">
                    <button
                      type="button"
                      style={{ width: "50px", aspectRatio: "1/1" }}
                      onClick={() => handleRemoveField(index)}
                      className="btn-gray p-0 rounded-circle position-absolute close-investor"
                    >
                      <BsX size={20} />
                    </button>
                  </div>
                </div>
                <div className="d-flex gap-4 mt-3">
                  <div className="field">
                    <label htmlFor="">Amount paid in euro</label>
                    <input
                      type="text"
                      value={currencyFormatter(
                        (parseInt(field?.amount || 0) +
                          parseFloat(field?.fees || 0)) *
                          rate
                      )}
                      className="input-field bg-white border border-2"
                      disabled
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="">Net Profit </label>
                    <input
                      type="text"
                      value={currencyFormatter(field?.profit)}
                      className="input-field bg-white border border-2"
                      disabled
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="">Net MOIC</label>
                    <input
                      type="text"
                      value={ field?.moic&&field?.moic?.toString()?.substring(0,4)}
                      className="input-field bg-white border border-2"
                      disabled
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="">Net IRR</label>
                    <input
                      type="text"
                      value={field?.irr?.toFixed(2)+"%"}
                      className="input-field bg-white border border-2"
                      disabled
                    />
                  </div>
                </div>
                </div>
              </>
            ))}
            {/* {fields.length <= 0 && ( */}
              <div className="text-center">
                <button
                  type="button"
                  className={`btn-${
                    fields.length <= 0 ? "red" : "gray"
                  } rounded-5 col-5`}
                  onClick={handleAddField}
                >
                  Add an investor
                </button>
              </div>
            {/* )} */}
            <div className="text-center">
              <button
                type="submit"
                className={`btn-${
                  fields.length <= 0 ? "gray" : "red"
                } rounded-5 col-5`}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDealPop;
