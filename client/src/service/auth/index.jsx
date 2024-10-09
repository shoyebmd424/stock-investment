import Axios from "../axios";

export const registerRepo=async(data)=>await Axios.post("/auth/register",data);
export const loginRepo=async(data)=>await Axios.post("/auth/login",data);
export const getAllUserByRoleRepo=async(role)=>await Axios.get(`/auth/users/role/${role}`);
export const updateAuthRepo=async(id,data)=>await Axios.put(`/auth//update/${id}`,data);
export const getAuthByIdRepo=async(id)=>await Axios.get(`/auth/users/${id}`);
export const getAuthByEmailRepo=async(email)=>await Axios.get(`/auth/users/email/${email}`);
export const resendTokenRepo=async(email)=>await Axios.post(`/auth/users/email/`,{email});
export const getAllUsersRepo=async()=>await Axios.get(`/auth/users`);
export const deleteUserRepo=async(id)=>await Axios.delete(`/auth/delete/${id}`);