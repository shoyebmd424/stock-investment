import React, { useEffect, useState } from "react";
import "./register.scss";
import img from "../../assets/all-img/auth.png";
import logo from "../../assets/all-img/Logo-02-removebg-preview.png";
import Personal from "../../components/auth/personal";
import Investment from "../../components/auth/investment";
import Account from "../../components/auth/account";
import {
  getUserByEmailService,
  registerService,
  resendTokenService,
  updateAuthService,
} from "../../service/auth/AuthService";
import { IoIosArrowRoundForward } from "react-icons/io";
import { showToast } from "../../utils/toasters";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Success from "../../components/auth/success";
import AgreementPop from "../../components/auth/agreement";

const Register = () => {
  const [step, setStep] = useState(0);
  const [subTask, setTask] = useState(0);
  const [personal, setPersonal] = useState(null);
  const [account, setAccount] = useState(null);
  const [investVal, setInvestVal] = useState({});
  const [isPop, setIspop] = useState(false);
  const [params] = useSearchParams();
  const emailToken = params.get("emailToken");
  const expiration = params.get("expiration");
  const comps = [
    { com: <Personal setPersonal={setPersonal} /> },
    {
      com: (
        <Investment
          invest={invest}
          investVal={investVal}
          step={subTask}
          setStep={setTask}
          setInvestVal={setInvestVal}
        />
      ),
    },
    { com: <Account setAccount={setAccount} /> },
  ];
  console.log(investVal);
  useEffect(() => {
    if (emailToken && expiration) {
      setStep(1);
    }
  }, [emailToken, expiration]);

  const handleStep = () => {
    if (step == comps.length - 1) {
      handleSubmit();
      return;
    }
    if (step === 1) {
      if (subTask >= invest.length - 1) {
        setStep(step + 1);
      } else {
        setTask(subTask + 1);
      }
    } else {
      setStep(step + 1);
    }
  };
 const validation=(password)=>{
    if(password.length < 8||!/[A-Z]/.test(password)||!/\d/.test(password)||!/[@$!%*?&]/.test(password)) return false;
    return true;
  }

  const handleSubmit = async () => {
    if(!account?.agreement) {
      showToast('error'," select agree,Our terms and conditions");
       return;
    }
    if(!validation(account?.password)){
      showToast('error',"Password criteria do not match");
      return;
    }
    // account.role='ADMIN'
    let data = {
      personal: personal,
      investmentInfo: investVal,
      account: account,
    };
    if (emailToken && expiration && account?.email) {
      const member = await getUserByEmailService(account?.email);
      if (!member) {
        return showToast(
          "error",
          "sorry this mail not added by admin please contact"
        );
      }
      data = {
        member: { ...member?.member, emailToken, expiration },
        account: { ...member?.account, ...account },
        personal: { ...member?.personal, ...personal },
        investmentInfo: { ...member?.investmentInfo, ...investVal },
      };
      const msg = await updateAuthService(member?._id, data);
      if (msg?.message) {
        return;
      }
      setStep(step + 1);
      return;
    }

    if (data?.account && data?.investmentInfo && data?.account) {
      const msg = await registerService(data);
      if (msg?.message) {
        return;
      }
      setStep(step + 1);
    } else {
      showToast("error", "field Required");
    }
  };

  const handleSend = () => {
    resendTokenService(account?.email);
  };

  return (
    <div>
      {/* {isPop&& <AgreementPop setIsNew={setIspop} setAccount={setAccount} />} */}
      <div className="register">
        <div className="register-left">
          <img src={img} className="w-100 h-100" alt="" />
        </div>
        <div className="register-right d-flex flex-column">
          {step === comps.length ? (
            <Success />
          ) : (
            <>
              <div className="row">
                <div className="col-10 ps-0 ms-auto d-flex justify-content-between align-items-center">
                  <h5 className="semibol">
                    Please complete your onboarding <br /> to access the 
                    Anyma Platform.
                  </h5>
                  <div className="d-flex flex-column">
                    <div className="logo">
                      <img className="w-100 h-100" src={logo} alt="" />
                    </div>
                    <small className="pres">Investor dashboard</small>
                  </div>
                </div>
                <div className="col-10 mx-auto">
                  <div className="col-md-10 px-0 mx-auto">
                    <div className="progress-comp my-4  ">
                      <ul className="px-0 mx-0">
                        {head?.map((val, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setStep(index);
                              setTask(0);
                            }}
                            className={index == step ? "active" : ""}
                          >
                            <span>{val}</span>
                            <div className="d-flex align-items-center">
                              <div className="w-100 empty"></div>
                              <div className="node ms-auto"></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {comps[step].com}
                    {step == 2 && emailToken && expiration && (
                      <button
                        onClick={handleSend}
                        className="btn text-white text-decoration-underline"
                      >
                        Resend Link
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-10 mx-auto pb-3 mt-auto">
                <div className="col-md-10 mx-auto pe-0">
                  {step === comps.length - 1 && (
                    <div className="mb-2 gap-2 cursor-pointer px-4 d-flex align-items-center">
                      <input
                        onChange={(e) =>{setAccount(pre=>({...pre,agreement:e.target.checked})) }}
                        type="checkbox"
                        name="agree"
                        style={{
                          width: "18px",
                          aspectRatio: 1 / 1,
                          cursor: "pointer",
                        }}
                        id=""
                      />
                      <label
                        style={{ cursor: "pointer" }}
                        htmlFor="agree"
                        className="my-auto"
                      >
                        Agree,Our terms and conditions
                      </label> <Link className="text-white fw-semibold" to="/terms">Link terms & Cond.</Link>
                    </div>
                  )}
                  <button
                    disabled={!personal && !emailToken && !expiration}
                    onClick={handleStep}
                    className={`${
                      step >= 2 ? "btn-red" : `btn-${!personal && "dark"}-gray `
                    } d-flex  py-2 rounded-5 w-100`}
                  >
                    <span className="mx-auto">
                      {step >= 2 ? " Confirm the registration" : "Next"}
                    </span>
                    <span className="text-dark pe-3">
                      <IoIosArrowRoundForward size={30} />
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;

const head = ["Personal info", "Investment info", "Account info"];

const invest = [
  {
    head: " which asset classe(s) are you most interest to invest in?",
    isSingle: false,
    isIcon: true,
    field: "interestedToInvest",
    option: [
      "Venture capital",
      "Private Equity",
      " Stock market",
      " Structured products",
      " Real estate",
      " Crypto",
      "Private debt",
      "Infrastructure",
      " Indifferent",
      "Other",
    ],
  },
  {
    head: " Which sectors are you most attracted to?",
    isSingle: false,
    isIcon: false,
    field: "sectors",
    option: [
      "Agritech / Foodtech",
      "AI / Data Science",
      "Dreamtech",
      " Biotech / Medtech",
      " Blockchain / Web 3.0",
      "E-commerce",
      " Consumer and Retail",
      " Cybersecurity",
      " Education",
      " Enterprise 2.0",
      "Fintech / Insurtech",
      "Gaming",
      " Health / Wellbeing",
      " Industry 4.0",
      " Logistics",
      "Mobility",
      "Software",
      "Smart Society / IoT",
      "Space",
      " Cloud / Edge",
      "Other",
    ],
  },
  {
    head: "Which geographical regions are you most inclined to invest in?",
    field: "region",
    isSingle: false,
    isIcon: true,
    option: [
      " North America",
      "Latin America",
      "Europe",
      "Asia",
      "Africa",
      "Middle East",
      " Indifferent",
      "Other",
    ],
  },
  {
    head: " What is your investor profile regarding VC investments ?",
    field: "investorType",
    isSingle: true,
    isIcon: false,
    option: [
      "Agressive : Several large tickets per year",
      " Concentrated: a few large tickets per year",
      "Balanced : medium ticket size for 3 to 5 investments per year",
      " Diversified : small tickets in over 5 companies per year",
      "Cautious : a few small tickets per year",
    ],
  },
  "fawknawek",
  {
    head: "What are you looking to get the most out of Anyma?",
    isSingle: false,
    isIcon: true,
    field: "anyma",
    option: [
      " Invest young companies with high potential",
      "Invest in mature tech champions",
      "Diversify my asset allocation",
      "Access to new geographies",
      " Learn about new fields",
      " Being able to monetize my expertise or network",
      "Create new professional connections",
      "Other",
    ],
  },
];
