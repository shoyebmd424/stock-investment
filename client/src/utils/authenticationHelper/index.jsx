import { Navigate } from "react-router-dom";

export const getAuth=()=>{
    try {
        return JSON.parse(localStorage.getItem('auth')||'');
    } catch (error) {
        console.log(error)
        return;
    }
}

export const setAuth=(data)=>{
    try {
        localStorage.setItem("auth",JSON.stringify(data));
        return
    } catch (error) {
        console.log(error)
    }
}

export const logout=()=>{
    try {
        localStorage.removeItem("auth");
    } catch (error) {
      console.log(error)  
    }
}