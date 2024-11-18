import axios from "axios";
import { API_TIMEOUT, API_URL } from "../constants/config";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  withCredentials: true, // Allow cookies to be sent with requests
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add additional headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data; // Return the response data
  },
  (error) => {
    if (error.response) {
      console.log(error.response.status);

      if (error.response.status === 401) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
