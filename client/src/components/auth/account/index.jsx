import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Account = ({ setAccount }) => {
  const [show, setShow] = useState("");
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      validatePassword(value);
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
    setAccount((pre) => ({ ...pre, [name]: value }));
  };
  const validatePassword = (password) => {
    let newErrors = {};
    if (password.length < 8) {
      newErrors.length = "Password must be at least 8 characters long.";
    }else{
      newErrors.length="";
    }
    if (!/[A-Z]/.test(password)) {
      newErrors.uppercase =
        "Password must contain at least one uppercase letter.";
    }else{
      newErrors.uppercase="";
    }

    if (!/\d/.test(password)) {
      newErrors.digit = "Password must contain at least one number.";
    } else {
      newErrors.digit = "";
    }

    if (!/[@$!%*?&]/.test(password)) {
      newErrors.special = "Password must contain at least one special character.";
    } else {
      newErrors.special = "";
    }

    setErrors((prevErrors) => ({ ...prevErrors, password: newErrors }));
  };
  

  return (
    <div className="row row-cols-md-2">
      {fieldData?.map((val, index) => (
        <div key={index}>
          <div className="px-0 mb-4  d-flex flex-column gap-2 field position-relative">
            <label className="ms-3" htmlFor="">
              {val?.label}
            </label>
            {val?.type === "select" ? (
              <select
                name={val?.name}
                onChange={handleChange}
                id=""
                className="input-field "
              >
                {val?.option?.map((v, i) => (
                  <option key={v + "" + i} value="">
                    {v}
                  </option>
                ))}
              </select>
            ) : (
              <>
                <input
                  type={show === val?.name ? "text" : val?.type}
                  name={val?.name}
                  onChange={handleChange}
                  // placeholder={val?.place}
                  className="input-field text-white"
                />
                {val?.name === "password" && (
                  <span className="eye">
                    {show !== "password" ? (
                      <FaEyeSlash
                        onClick={() => setShow(val?.name)}
                        size={20}
                      />
                    ) : (
                      <FaEye onClick={() => setShow("")} size={20} />
                    )}
                  </span>
                )}
                {val?.name === "cnfPassword" && (
                  <span className="eye">
                    {show !== "cnfPassword" ? (
                      <FaEyeSlash
                        onClick={() => setShow(val?.name)}
                        size={20}
                      />
                    ) : (
                      <FaEye onClick={() => setShow("")} size={20} />
                    )}
                  </span>
                )}
              </>
            )}
          </div>
          {val?.name==="password"&&errors.password && (
            <div className="text-danger">
              {errors.password.length && <p>{errors.password.length}</p>}
              {errors.password.uppercase && <p>{errors.password.uppercase}</p>}
              {errors.password.digit && <p>{errors.password.digit}</p>}
              {errors.password.special && <p>{errors.password.special}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Account;

const fieldData = [
  {
    place: "alessandro@anyma.capital",
    type: "input",
    name: "email",
    label: " E-mail address (username)",
  },
  {
    place: "0033623587116",
    type: "input",
    name: "phone",
    label: "Phone number",
  },
  { place: "*******", type: "password", name: "password", label: "Password" },
  {
    place: "*******",
    type: "password",
    name: "cnfPassword",
    label: "Repeat password",
  },
];
