import Axios from "../axios";

export const addDealRepo=async(data)=>await Axios.post("/deal/",data);
export const updateDealRepo=async(id,data)=> await Axios.put(`/deal/${id}`,data);
export const deleteDealRepo=async(id)=>await Axios.delete(`/deal/${id}`);
export const getByIdDealRepo=async(id)=>await Axios.get(`/deal/${id}`);
export const getAllDealByCompanyRepo=async(id)=>await Axios.get(`/deal/company/${id}`);
export const  getAllDealByInvestorRepo=async(investorEMail)=>await Axios.get(`/deal/investor/${investorEMail}`);
export const getAllDealRepo=async()=>await Axios.get(`/deal/`);
export const getAllDealByCompanyAndUsersRepo=async(userId)=>await Axios.get(`/deal/investor/company/${userId}`);