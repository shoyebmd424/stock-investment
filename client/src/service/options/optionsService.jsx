import { getCompanyRepo, getIndustryRepo, getUsersRepo } from ".";
import { showToast } from "../../utils/toasters";


export const  getAllIndustryService=async()=>{
    try {
        const {data}=await getIndustryRepo();
        return data;
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.message);
    }
}
export const  getAllCompanyService=async()=>{
    try {
        const {data}=await getCompanyRepo();
        return data;
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.message);
    }
}

export const  getAllUsersService=async()=>{
    try {
        const {data}=await getUsersRepo();
        return data;
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.message);
    }
}