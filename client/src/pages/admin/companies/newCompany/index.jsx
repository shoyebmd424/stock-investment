import React, { useEffect, useState } from "react";
import "./newCompany.scss";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { FaPencil, FaRegFileLines } from "react-icons/fa6";
import AddNewsPop from "../../../../components/admin/companies/addNewsPop";
import {
  addCompanyService,
  downloadFileService,
  getByIdCompanyService,
  updateCompanyService,
} from "../../../../service/company/companyService";
import { useLocation, useNavigate } from "react-router-dom";
import { Server } from "../../../../service/axios";
import {
  currencyFormatter,
  formatTimeFromNow,
} from "../../../../utils/formater/dateTimeFormater";
import { getInvestmentsAndCurrent } from "../../../../utils/totalInvestmentAndCurrenctByCompany";
import { companyProfit } from "../../../../utils/calculations/companyProfit";
const NewCompany = () => {
  const { state } = useLocation();
  const [isNews, setIsNew] = useState(false);
  const [isDealEdit, setIsDealEdit] = useState(false);
  const [isAbout, setisAbout] = useState(false);
  const [company, setComapany] = useState(null);
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [deal, setDeal] = useState(null);
  const [news, setNews] = useState([]);
  const [updateDoc, setUpdateDoc] = useState([]);
  const [investDoc, setInvestDoc] = useState([]);
  const [updateFileName, setUpdateFileName] = useState([]);
  const [investFileName, setInvestFileName] = useState([]);

  // const [updateFileList,setUpdateFile]=useState([])
  // const [investFileList,setInvestFile]=useState([])
  const navigate = useNavigate();



  useEffect(() => {
    const handle = async () => {
      const data = await getByIdCompanyService(state);
      setComapany(data);
      setNews(data?.news);
      setInvestDoc(data?.investDoc);
      setUpdateDoc(data?.update);
      setDeal(data?.dealSummary);
    };
    if (state) {
      handle();
    }
  }, [state]);

  useEffect(()=>{
    const handle=async()=>{
      if(company?._id){
    const {totalInvestment,current}=await getInvestmentsAndCurrent(company?._id);
    const pro= await companyProfit(state,deal?.currentValuation||0)
    setDeal({...deal,cumulatedInvest:totalInvestment,profitLoss:pro})
    }
  }
    handle();
  },[company?._id])
console.log(deal)
  const handleChange = (e) => {
    try {
      const { name, value, files } = e.target;
      setComapany({ ...company, [name]: files ? files[0] : value });
      const file = files ? files[0] : null;
      if (name === "cover") {
        setCover(file ? URL.createObjectURL(file) : null);
      }
      if (name === "profile") {
        setProfile(file ? URL.createObjectURL(file) : null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeal = (e) => {
    const { name, value } = e.target;
    setDeal({ ...deal, [name]: value });
  };

  const handlepdateDoc = (e) => {
    try {
      const { name, files } = e.target;
      setUpdateFileName([
        ...updateFileName,
        { name: files[0]?.name, id: updateDoc.length },
      ]);
      setUpdateDoc([
        ...updateDoc,
        {
          [name]: files[0],
          id: updateDoc.length,
          date: new Date().toLocaleDateString(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInvestDoc = (e) => {
    try {
      const { name, files } = e.target;
      setInvestFileName([
        ...investFileName,
        { id: investDoc.length, name: files[0]?.name },
      ]);
      setInvestDoc([
        ...investDoc,
        {
          [name]: files[0],
          id: investDoc.length,
          date: new Date().toLocaleDateString(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  const removeInvestDoc = (id) => {
    setInvestDoc((pre) => pre.filter((v) => v.id !== id));
  };

  const removenews = (val) => {
    setNews((pre) => pre.filter((v) => v.name !== val));
  };

  const removeupdateDoc = (id) => {
    setUpdateDoc((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const [key, val] of Object.entries(company)) {
      if (["dealSummary", "news", "update", "investDoc"].includes(key)) {
        continue;
      }
      formData.append(key, val);
    }
    formData.append("dealSummary", JSON.stringify(deal));
    formData.append("news", JSON.stringify(news));
    updateDoc.forEach((doc) => {
      formData.append("update", doc['updatedoc']); 
    });
  
    investDoc.forEach((doc) => {
      formData.append("investDoc", doc['investDoc']);
    });
    if (state) {
      await updateCompanyService(state, formData);
      navigate(-1);
      return;
    }
    await addCompanyService(formData);
    navigate(-1);
  };

  const downloadFile=(file)=>{
    downloadFileService(file);
  }


  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="new-company">
        <div className="container">
          <div className="row">
            <div className="col-9 ps-0">
              <div>
                <div className="cover-profile d-flex flex-column">
                  <img
                    src={cover || Server + company?.cover}
                    className="position-absolute rounded-3 inset-0 w-100 h-100"
                    alt="cover"
                  />
                  <input
                    onChange={handleChange}
                    name="cover"
                    id="cover"
                    type="file"
                  />
                  <label
                    htmlFor="cover"
                    className="p-1 px-2 cover-label rounded bg-green text-white"
                  >
                    <FaPlus size={20} />
                  </label>
                  <div className="mt-auto">
                    <div className="profile  ">
                      <img
                        src={profile || Server + company?.profile}
                        className="position-absolute w-100 h-100 rounded-circle"
                        style={{ inset: "0" }}
                        alt=""
                      />
                      <input
                        name="profile"
                        onChange={handleChange}
                        type="file"
                        id="profile"
                      />
                      <label
                        htmlFor="profile"
                        className="p-1 px-2 pro-label rounded bg-green text-white"
                      >
                        <FaPlus size={20} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="about col-md-12 d-flex bg-white my-3 py-1  border border-2 rounded px-3 justify-content-between align-items-center">
                  <h5 className=" my-auto">
                 <span className="fw-semibold">  ABOUT</span> 
                    {isAbout ? (
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={company?.name}
                        className="py-2 rounded ms-3"
                      />
                    ) : (
                      <span className="text-uppercase ps-2 fw-bold">{company?.name}</span>
                    )}
                  </h5>
                  <div
                    onClick={() => setisAbout(!isAbout)}
                    style={{ width: "35px", aspectRatio: "1/1" }}
                    className="d-flex align-items-center justify-content-center bg-pink text-white cursor-pointer rounded-circle"
                  >
                    <FaPencil size={20} />
                  </div>
                </div>
                <div>
                  <textarea
                    name="about"
                    value={company?.about}
                    style={{ cursor: isAbout ? "auto" : "not-allowed" }}
                    disabled={!isAbout}
                    onChange={handleChange}
                    placeholder={`${
                      isAbout ? "" : "click on edit button."
                    }  `}
                    className="w-100 border pb-0 bg-white rounded p-3"
                    rows={7}
                    id=""
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="col-3 pe-0 h-inherit d-flex flex-column mb-2">
              <div className="deal d-flex flex-column h-100">
                <div className="about d-flex bg-white mb-3 py-1 border border-2 rounded px-2 justify-content-between align-items-center">
                  <div className="fw-semibold">DEAL SUMMARY</div>
                  <div
                    onClick={() => setIsDealEdit(!isDealEdit)}
                    style={{ width: "35px", aspectRatio: "1/1" }}
                    className="d-flex  align-items-center justify-content-center bg-pink text-white cursor-pointer rounded-circle"
                  >
                    <FaPencil size={20} />
                  </div>
                </div>
                <div className="deal-list px-4  h-100 py-4  rounded bg-white border border-2 d-flex flex-column gap-3 h-100">
                  {dealData?.map((val, index) => (
                    <div key={index}>
                      <label htmlFor={val?.name} className="text-muted small">
                        {val?.label}
                      </label>
                      <br />
                      <div>
                        {isDealEdit ? (
                          val?.type==='input'&&<input
                            name={val?.name}
                            onChange={handleDeal}
                            type={val?.name === "investDate" ? "date" : "text"}
                            placeholder="-"
                            className=" rounded px-2 w-100"
                          />
                        ) : (deal && deal[val?.name]) ? (
                          <span className="fw-semibold">
                            {money.includes(val?.name) ?
                              currencyFormatter(deal[val?.name]||0):deal[val?.name]}
                          </span>
                        ) : (
                          "-"
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="row pb-4">
            <div className="col-md-6 ps-0">
              <div className=" d-flex bg-white my-3 py-2 border border-2 rounded px-3 justify-content-between align-items-center">
                <div className="fw-semibold">Latest News</div>
                <div
                  style={{ width: "30px", aspectRatio: "1/1" }}
                  className="d-flex align-items-center justify-content-center bg-green text-white cursor-pointer rounded-2"
                >
                  <FaPlus onClick={() => setIsNew(!isNews)} size={20} />
                </div>
              </div>
              <div className="details bg-white rounded p-3 d-flex flex-column gap-3 ">
                {news.length > 0 &&
                  news?.map((val, i) => (
                    <div className="d-flex  flex-column gap-2" key={i}>
                      
                      <div className="d-flex justify-content-between">
                        <a
                          href={val?.link}
                          className="text-dark"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          
                          {val?.name}
                        </a>
                        <div
                          onClick={() => removenews(val?.name)}
                          className="ps-3 text-muted"
                        >
                          <FaTrashAlt className="cursor-pointer" size={20} />
                        </div>
                      </div>
                      <small className="text-muted tracking-normal">
                        {formatTimeFromNow(val?.date)}
                      </small>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-md-6 mx-auto row pe-0">
              <div className="col-6 ps-0">
                <div>
                  
                  <div className=" position-relative d-flex bg-white my-3 py-2 border border-2 rounded px-3 justify-content-between align-items-center">
                    <div className="fw-semibold text-uppercase">Business Updates</div>
                    <input
                      type="file"
                      name="updatedoc"
                      onChange={handlepdateDoc}
                      style={{ opacity: "0" }}
                      className="position-absolute"
                    />
                    <label htmlFor="updatedoc">
                      
                      <div
                        style={{ width: "30px", aspectRatio: "1/1" }}
                        className="d-flex align-items-center justify-content-center bg-green text-white cursor-pointer rounded-2"
                      >
                        <FaPlus size={20} />
                      </div>
                    </label>
                  </div>
                  <div className="details bg-white rounded d-flex flex-column gap-3 py-3 ">
                    {updateDoc.length > 0 &&
                      updateDoc.map((val, i) => (
                        <div className="d-flex  mx-2 ms-3 gap-2">
                          <div>
                            <FaRegFileLines className="text-muted" size={20} />
                          </div>
                          <div className="d-flex flex-column gap-1">
                            <small  onClick={()=>downloadFile(val?.originalname)} className="text-muted cursor-pointer">
                              
                              {
                               val?.originalname|| updateFileName.find((v) => v?.id === val?.id)
                                  ?.name||'CONTRACT UPDATE'
                              }
                            </small>
                            <small className="fw-bold">{val?.date}</small>
                          </div>
                          <div
                            onClick={() => removeupdateDoc(val?.id)}
                            className="ps-3 text-muted"
                          >
                            <FaTrashAlt className="cursor-pointer" size={20} />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="col-6 pe-0 ps-3">
                <div>
                  
                  <div className=" position-relative d-flex bg-white my-3 py-2 border border-2 rounded px-3 justify-content-between align-items-center">
                    <div className="fw-semibold">INVESTMENT DOCS</div>
                    <input
                      type="file"
                      name="investDoc"
                      onChange={handleInvestDoc}
                      style={{ opacity: "0" }}
                      className="position-absolute"
                    />
                    <label htmlFor="updatedoc">
                      
                      <div
                        style={{ width: "30px", aspectRatio: "1/1" }}
                        className="d-flex align-items-center justify-content-center bg-green text-white cursor-pointer rounded-2"
                      >
                        <FaPlus size={20} />
                      </div>
                    </label>
                  </div>
                  <div className="details bg-white rounded d-flex flex-column gap-3 py-3 ">
                    {investDoc.length > 0 &&
                      investDoc.map((val, i) => (
                        <div className="d-flex  mx-2 ms-3 gap-2">
                          <div>
                            <FaRegFileLines className="text-muted" size={25} />
                          </div>
                          <div className="d-flex flex-column gap-1">
                            <small onClick={()=>downloadFile(val?.originalname)} className="text-muted cursor-pointer">
                              {
                              val?.originalname ||  investFileName.find((v) => v?.id === val?.id)
                                  ?.name||'CONTRACT UPDATE'
                              }
                            </small>
                            <small className="fw-bold">{val?.date}</small>
                          </div>
                          <div
                            onClick={() => removeInvestDoc(val?.id)}
                            className="ps-3 text-muted"
                          >
                            <FaTrashAlt className="cursor-pointer" size={20} />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isNews && <AddNewsPop setIsNew={setIsNew} setNews={setNews} />}
      </div>
      {company && (
        <div className="text-center pb-4 ">
          <button className="btn-red w-50">Save</button>
        </div>
      )}
    </form>
  );
};

export default NewCompany;


const dealData = [
  { name: "asset", label: "ASSET CLASS" ,type:"input"},
  { name: "investDate", label: "INVESTMENT DATE" },
  { name: "sector", label: "SECTOR",type:"input" },
  { name: "cumulatedInvest", label: "CUMULATED INVESTMENTS", },
  { name: "currentValuation", label: "CURRENT VALUATION" ,type:'input'},
  { name: "profitLoss", label: "TOTAL PROFIT (LOSS)" },
];


const money = ["cumulatedInvest", "currentValuation", "profitLoss"];
