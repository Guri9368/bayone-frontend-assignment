import axios from 'axios';
import { getToken, removeToken } from '../utils/auth';

// Create axios instance with environment-based configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://reqres.in/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => {
    // Successfully received response
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      const status = error.response.status;
      
      // Handle 401 Unauthorized - token invalid or expired
      if (status === 401) {
        console.error('Unauthorized: Token expired or invalid');
        removeToken();
        window.location.href = '/login';
      }
      
      // Handle 403 Forbidden
      if (status === 403) {
        console.error('Forbidden: Access denied');
      }
      
      // Handle 404 Not Found
      if (status === 404) {
        console.error('Not Found: Resource does not exist');
      }
      
      // Handle 500 Server Error
      if (status >= 500) {
        console.error('Server Error: Please try again later');
      }
      
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error: No response from server');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Create separate axios instance for external APIs (like JSONPlaceholder)
export const externalApi = axios.create({
  baseURL: import.meta.env.VITE_USERS_API_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

export default api;
