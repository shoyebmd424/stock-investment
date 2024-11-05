import { addCompanyRepo, addDocRepo, addInvestDocRepo, addNewsRepo, deleteCompanyRepo, deleteDocRepo, deleteInvestDocRepo, deleteNewsRepo, downloadFileRepo, getAllCompanyRepo, getByIdCompanyRepo, updateCompanyRepo, updateCompanyWitoutRepo } from ".";
import { showToast } from "../../utils/toasters";

export const  addCompanyService=async(val)=>{
try {
    const {data}=await addCompanyRepo(val);
    if(data?.message){
        return showToast("error",data?.message);
    }
    showToast("success",data);
} catch (error) {
    console.log(error);
    showToast("error",error?.response?.data?.messsage);
}
}

export const  updateCompanyService=async(id,val)=>{
try {
    const {data}=await updateCompanyRepo(id,val);
    if(data?.message){
        return showToast("error",data?.message);
    }
    showToast("success",data);
} catch (error) {
    console.log(error);
    showToast("error",error?.response?.data?.messsage);
}
}

export const  updateCompanyWithoutService=async(id,val)=>{
try {
    const {data}=await updateCompanyWitoutRepo(id,val);
    if(data?.message){
        return showToast("error",data?.message);
    }
    showToast("success",data);
} catch (error) {
    console.log(error);
    showToast("error",error?.response?.data?.messsage);
}
}

export const  deleteCompanyService=async(id)=>{
try {
    const {data}=await deleteCompanyRepo(id);
    if(data?.message){
        return showToast("error",data?.message);
    }
    showToast("success",data);
} catch (error) {
    console.log(error);
    showToast("error",error?.response?.data?.messsage);
}
}

export const  getByIdCompanyService=async(id)=>{
try {
    if(!id){
        return;
    }
    const {data}=await getByIdCompanyRepo(id);
    if(data?.message){
        // return showToast("error",data?.message);
        return;
    }
    return data;
} catch (error) {
    console.log(error?.response?.data?.messsage);
    // showToast("error",error?.response?.data?.messsage);
}
}

export const  getByCreatorCompanyService=async(id)=>{
try {
    const {data}=await getByIdCompanyRepo(id);
    if(data?.message){
        return showToast("error",data?.message);
    }
    return data;
} catch (error) {
    console.log(error);
    showToast("error",error?.response?.data?.messsage);
}
}

export const  getAllCompanyService=async(id)=>{
try {
    const {data}=await getAllCompanyRepo(id);
    if(data?.message){
        return showToast("error",data?.message);
    }
    return data;
} catch (error) {
    console.log(error);
    showToast("error",error?.response?.data?.messsage);
}
}

export const  addNewsService=async(val,companyId)=>{
try {
    const {data}=await addNewsRepo(companyId,val);
    if(data?.message){
        return showToast("error",data?.message);
    }
    showToast("error",data);
} catch (error) {
    console.log(error);
    showToast("error",error?.response?.data?.messsage);
}
}

export const  deleteNewsService=async(companyId,id)=>{
try {
    const {data}=await deleteNewsRepo(companyId,id);
    if(data?.message){
        return showToast("error",data?.message);
    }
    showToast("error",data);
} catch (error) {
    console.log(error);
    showToast("error",error?.response?.data?.messsage);
}
}

export const  addDocService=async(companyId,val)=>{
try {
    const {data}=await addDocRepo(companyId,val);
    if(data?.message){
        return showToast("error",data?.message);
    }
    showToast("error",data);
} catch (error) {
    console.log(error);
    showToast("error",error?.response?.data?.messsage);
}
}

export const  deleteDocService=async(companyId,id)=>{
try {
    const {data}=await deleteDocRepo(companyId,id);
    if(data?.message){
        return showToast("error",data?.message);
    }
    showToast("error",data);
} catch (error) {
    console.log(error);
    showToast("error",error?.response?.data?.messsage);
}
}


export const  addInvestDocService=async(companyId,val)=>{
try {
    const {data}=await addInvestDocRepo(companyId,val);
    if(data?.message){
        return showToast("error",data?.message);
    }
    showToast("error",data);
} catch (error) {
    console.log(error);
    showToast("error",error?.response?.data?.messsage);
}
}

export const  deleteInvestDocService=async(companyId,id)=>{
try {
    const {data}=await deleteInvestDocRepo(companyId,id);
    if(data?.message){
        return showToast("error",data?.message);
    }
    showToast("error",data);
} catch (error) {
    console.log(error);
    showToast("error",error?.response?.data?.messsage);
}
}

export const  downloadFileService=async(file)=>{
try {
          const response = await downloadFileRepo(file);
          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = file;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
} catch (error) {
    console.log(error);
    showToast("error",error?.response?.data?.messsage);
}
}