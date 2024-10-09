import { deleteUserRepo, getAllUserByRoleRepo, getAllUsersRepo, getAuthByEmailRepo, getAuthByIdRepo, loginRepo, registerRepo, resendTokenRepo, updateAuthRepo } from ".";
import { setAuth } from "../../utils/authenticationHelper";
import { showToast } from "../../utils/toasters";

export  const registerService=async(val)=>{
    try {
        const {data}=await registerRepo(val);
        if(data?.message){
            showToast("error",data?.message);
            return data;
        }
        showToast("success",data);
        return data;
    } catch (error) {
        showToast("error",error?.response?.data?.message);
        return error?.response?.data;
    }
}

export  const resendTokenService=async(val)=>{
    try {
        const {data}=await resendTokenRepo(val);
        if(data?.message){
            showToast("error",data?.message);
            return data;
        }
        showToast("success",data);
    } catch (error) {
        showToast("error",error?.response?.data?.message);
    }
}

export  const loginService=async(val)=>{
    try {
        const {data}=await loginRepo(val);
        if(data?.message){
            showToast("error",data?.message);
            return;
        }
       setAuth(data);
        showToast("success",data);
        return data;
    } catch (error) {
        showToast("error",error?.response?.data?.message);
        return ;
    }
}

export  const getUsersByRolesService=async(val)=>{
    try {
        const {data}=await getAllUserByRoleRepo(val);
        if(data?.message){
            showToast("error",data?.message);
            return;
        }
        return data;
    } catch (error) {
        showToast("error",error?.response?.data?.message);
        return error?.response?.data;
    }
}

export  const getUserByIdService=async(id)=>{
    try {
        const {data}=await getAuthByIdRepo(id);
        if(data?.message){
            showToast("error",data?.message);
            return;
        }
        return data;
    } catch (error) {
        console.log(error)
        // showToast("error",error?.response?.data?.message);
    }
}
export  const getUserByEmailService=async(email)=>{
    try {
        const {data}=await getAuthByEmailRepo(email);
        if(data?.message){
            showToast("error",data?.message);
            return;
        }
        return data;
    } catch (error) {
        showToast("error",error?.response?.data?.message);
    }
}
export  const getAllUsersService=async(id)=>{
    try {
        const {data}=await getAllUsersRepo(id);
        if(data?.message){
            showToast("error",data?.message);
            return;
        }
        return data;
    } catch (error) {
        showToast("error",error?.response?.data?.message);
    }
}

export  const updateAuthService=async(id,val)=>{
    try {
        const {data}=await updateAuthRepo(id,val);
        if(data?.message){
            showToast("error",data?.message);
            return;
        }
        showToast("success",data);
        return data;
    } catch (error) {
        console.log(error)
        showToast("error",error?.response?.data?.message);
        return ;
    }
}

export  const deleteAuthService=async(id)=>{
    try {
        const {data}=await deleteUserRepo(id);
        if(data?.message){
            showToast("error",data?.message);
            return;
        }
        showToast("success",data);
        return data;
    } catch (error) {
        showToast("error",error?.response?.data?.message);
    }
}