import React, { useState } from 'react'
import "./pop.scss";
import { loginService } from '../../service/auth/AuthService';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar';

const Login = () => {
    const [val,setVal]=useState(null);
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const {value,name}=e.target;
        setVal({...val,[name]:value});
    }

    const handleSubmit=async(e)=>{
      e.preventDefault();
      const data=await loginService(val);
      if(!data){
        return;
      }
      if(data&&data?.user?.account?.role==="ADMIN"){
        navigate("/admin/member");
      }else{
        navigate("/customer/overview");
      }
    }
  return (
    <div className='login-pop'>
      <Navbar/>
      <div className="login">
        <div className="login-body col-4">
        <form onSubmit={handleSubmit}>
            <h5 className='text-center  fs-4 mb-5 fw-bold'>Member's Login</h5>
            <div className='d-flex flex-column gap-4 mt-5 '>
                <div className="field">
                    {/* <label htmlFor="">Username</label> */}
                    <input type="text" placeholder='Username' name='email' onChange={handleChange} className='input-field' />
                </div>
                <div className="field">
                    {/* <label htmlFor="">Password</label> */}
                    <input type="password" name='password'placeholder='Password' onChange={handleChange} className='input-field' />
                </div>
                <div className="text-center w-100">
                    <button type='submit'  className="btn-red w-100 rounded">Login</button>
                </div>
            </div>
        </form>
        </div>
        </div>
      
    </div>
  )
}

export default Login
