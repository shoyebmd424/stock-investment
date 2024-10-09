import React, { useState } from 'react'
import "./pop.scss";
import { BsX } from 'react-icons/bs';

const AddNewsPop = ({setIsNew,setNews}) => {
    const [val,setVal]=useState(null);
    const handleChange=(e)=>{
        const {value,name}=e.target;
        setVal({...val,[name]:name==="date"?new Date(new Date(value).setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())).toISOString():value});
    }

    const handleAdd=()=>{
        setNews(pre=>([...pre,val]));
        setIsNew(false);
    }
  return (
    <div className='pop'>
        <div className="pop-body col-6">
            <div className='text-end'> <BsX onClick={()=>setIsNew(pre=>!pre)} className='cursor-pointer' size={30}/></div>
            <h5 className='text-center mb-4 fs-4'>Add a news</h5>
            <div className='d-flex flex-column gap-4'>
                <div className="field">
                    <label htmlFor="">News Title</label>
                    <input type="text" name='name' onChange={handleChange} className='input-field'  />
                </div>
                <div className="field">
                    <label htmlFor="">News Link</label>
                    <input type="text" name='link' onChange={handleChange} className='input-field'  />
                </div>
                <div className="field">
                    <label htmlFor="">News Date</label>
                    <input type="date" name='date' onChange={handleChange} className='input-field' />
                </div>
                <div className="text-center">
                    <button type='button' onClick={handleAdd} className="btn-red col-3 rounded-5">Save</button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default AddNewsPop
