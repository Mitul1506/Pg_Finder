import axios from "axios";
import { toast } from "react-toastify";

// Create axios instance with base URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Your backend URL
  timeout: 10000,
});

// ✅ Request interceptor - automatically add token to every request (FRONTEND)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response interceptor - handle token errors (FRONTEND)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.error("Session expired. Please login again.");
      
      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;