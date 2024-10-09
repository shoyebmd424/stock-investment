import { addMemberRepo, deleteMemberRepo, getAllMemberByCreatorIdRepo, getAllMemberRepo, getByIdMemberRepo, updateMemberRepo } from ".";
import { showToast } from "../../utils/toasters";

export const  addMemberService=async(val)=>{
    try {
        const {data}=await addMemberRepo(val);
        if(data?.message){
            return showToast("error",data?.message);
        }
        showToast("success",data);
    } catch (error) {
        console.log(error?.response?.data?.message)
        showToast("error",error?.response?.data?.message);
    }
    }
    
    export const  updateMemberService=async(val,id)=>{

    try {
        const {data}=await updateMemberRepo(val,id);
        if(data?.message){
            return showToast("error",data?.message);
        }
        showToast("success",data);
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.messsage);
    }
    }
    
    export const  deleteMemberService=async(id)=>{
    try {
        const {data}=await deleteMemberRepo(id);
        if(data?.message){
            return showToast("error",data?.message);
        }
        showToast("success",data);
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.messsage);
    }
    }
    
    export const  getByIdMemberService=async(id)=>{
    try {
        const {data}=await getByIdMemberRepo(id);
        if(data?.message){
            return showToast("error",data?.message);
        }
        return data;
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.messsage);
    }
    }
    
    export const  getByCreatorMemberService=async(id)=>{
    try {
        const {data}=await getAllMemberByCreatorIdRepo(id);
        if(data?.message){
            return showToast("error",data?.message);
        }
        return data;
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.messsage);
    }
    }
    
    export const  getAllMemberService=async(id)=>{
    try {
        const {data}=await getAllMemberRepo(id);
        if(data?.message){
            return showToast("error",data?.message);
        }
        return data;
    } catch (error) {
        console.log(error);
        showToast("error",error?.response?.data?.messsage);
    }
    }