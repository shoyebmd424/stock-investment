import Axios from "../axios";

export const addMemberRepo=async(data)=>await Axios.post("/member/",data);
export const updateMemberRepo=async(data,id)=> await Axios.put(`/member/${id}`,data);
export const deleteMemberRepo=async(id)=>await Axios.delete(`/member/${id}`);
export const getByIdMemberRepo=async(id)=>await Axios.get(`/member/${id}`);
export const getAllMemberByCreatorIdRepo=async(id)=>await Axios.get(`/member/${id}`);
export const getAllMemberRepo=async()=>await Axios.get(`/member/`);