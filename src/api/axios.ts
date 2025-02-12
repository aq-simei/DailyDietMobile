import axios from 'axios';
import { Platform } from 'react-native';

const baseURL = Platform.select({
  android: 'http://10.0.2.2:8080/v1', // Remove trailing slash
  ios: 'http://localhost:8080/v1', // Remove trailing slash
  default: 'http://localhost:8080/v1',
});

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  validateStatus: (status) => {
    return (status >= 200 && status < 300) || status === 302; // Accept 302 (found) as valid
  },
  withCredentials: false, // Important for CORS
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Full Request URL:', `${config.baseURL}${config.url}`);
    console.log('Request Headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('Request Error Details:', {
      message: error.message,
      config: error.config,
    });
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response Error Data:', error.response.data);
      console.error('Response Error Status:', error.response.status);
      console.error('Response Error Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No Response Received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error Message:', error.message);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
