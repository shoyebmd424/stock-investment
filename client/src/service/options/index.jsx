import Axios from "../axios";

export const getIndustryRepo=async()=>Axios.get("/options/industry");
export const getCompanyRepo=async()=>Axios.get("/options/company");
export const getUsersRepo=async()=>Axios.get("/options/users");