import Axios from "../axios";

export const addCompanyRepo=async(data)=>await Axios.post("/company/",data);
export const updateCompanyRepo=async(id,data)=> await Axios.put(`/company/${id}`,data);
export const updateCompanyWitoutRepo=async(id,data)=> await Axios.put(`/company/without-file/${id}`,data);
export const deleteCompanyRepo=async(id)=>await Axios.delete(`/company/${id}`);
export const getByIdCompanyRepo=async(id)=>await Axios.get(`/company/${id}`);
export const getAllCompanyByCreatorIdRepo=async(id)=>await Axios.get(`/company/${id}`);
export const getAllCompanyRepo=async()=>await Axios.get(`/company/`);
export const downloadFileRepo=async(file)=>await Axios.get(`/company/file/download/${file}`,{responseType: 'blob'});
// news
export const addNewsRepo=async(companyId,data)=>await Axios.post(`/company/news/${companyId}`,data)
export const deleteNewsRepo=async(companyId,id)=>await Axios.delete(`/company/news/${companyId}/${id}`);
// doc
export const addDocRepo=async(companyId,data)=>await Axios.post(`/company/doc/${companyId}/`,data);
export const deleteDocRepo=async(companyId,id)=>await Axios.delete(`/company/doc/${companyId}/${id}`);
// invest
export const addInvestDocRepo=async(companyId,data)=>await Axios.post(`/company/invest/${companyId}`,data);
export const deleteInvestDocRepo=async(companyId,id)=>await Axios.delete(`/company/invest/${companyId}/${id}`,data);
