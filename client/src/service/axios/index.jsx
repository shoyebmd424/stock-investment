import axios from "axios";

// export const Server='http://localhost:8000'
export const Server='http://93.127.163.214:8000'

const Axios=axios.create({baseURL:`${Server}/api/v1/`});
// check
// const Axios=axios.create({baseURL:"https://inv-plt-j2i7.onrender.com/api/v1/"});
// export const Server='https://inv-plt-j2i7.onrender.com'
export default Axios;