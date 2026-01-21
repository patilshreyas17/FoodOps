import axios from 'axios';

// Change this from "/" to "/proxy"
// http://localhost:5454 for non docker
export const API_URL = "/proxy"; 

export const api = axios.create({
  
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    
    return config;
  },
  (error) => Promise.reject(error)
);