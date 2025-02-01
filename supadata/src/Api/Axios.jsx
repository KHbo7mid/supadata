import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
    headers: {
      
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  export const setAuthToken = (token) => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  };
 
  
  export default axiosInstance;