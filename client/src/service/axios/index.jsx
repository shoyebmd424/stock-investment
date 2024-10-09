import axios from "axios";

const Axios=axios.create({baseURL:"http://localhost:8000/api/v1/"});

export const Server='http://localhost:8000'
// const Axios=axios.create({baseURL:"https://inv-plt-j2i7.onrender.com/api/v1/"});
// export const Server='https://inv-plt-j2i7.onrender.com'
export default Axios;