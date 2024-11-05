import { addDealRepo, deleteDealRepo, getAllDealByCompanyAndUsersRepo, getAllDealByCompanyRepo, getAllDealByInvestorRepo, getAllDealRepo, getByIdDealRepo, updateDealRepo } from ".";
import { showToast } from "../../utils/toasters";

export const  addDealService=async(val)=>{
    try {
        const {data}=await addDealRepo(val);
        if(data?.message){
            return showToast("error",data?.message);
        }
        showToast("success",data);
        return data;
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.messsage);
    }
    }
    
    export const  updateDealService=async(id,val)=>{
    try {
        const {data}=await updateDealRepo(id,val);
        if(data?.message){
            return showToast("error",data?.message);
        }
        showToast("success",data);
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.messsage);
    }
    }
    
    export const  deleteDealService=async(id)=>{
    try {
        const {data}=await deleteDealRepo(id);
        if(data?.message){
            return showToast("error",data?.message);
        }
        showToast("success",data);
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.messsage);
    }
    }
    
    export const  getByIdDealService=async(id)=>{
    try {
        const {data}=await getByIdDealRepo(id);
        if(data?.message){
            return showToast("error",data?.message);
        }
        return data;
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.messsage);
    }
    }
    
    export const  getByCompanyIdDealService=async(id)=>{
    try {
        const {data}=await getAllDealByCompanyRepo(id);
        if(data?.message){
            return showToast("error",data?.message);
        }
        return data;
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.messsage);
    }
    }
    
    export const  getAllDealService=async()=>{
    try {
        const {data}=await getAllDealRepo();
        if(data?.message){
            return showToast("error",data?.message);
        }
        return data;
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.messsage);
    }
    }
    export const  getAllDealByInvestorService=async(email)=>{
    try {
        const {data}=await getAllDealByInvestorRepo(email);
        if(data?.message){
            return showToast("error",data?.message);
        }
        return data;
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.messsage);
    }
    }

    export const  getAllDealByUserAndCompanyService=async(userId)=>{
    try {
        const {data}=await getAllDealByCompanyAndUsersRepo(userId);
        if(data?.message){
            return showToast("error",data?.message);
        }
        return data;
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.messsage);
    }
    }