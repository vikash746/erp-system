import axios from 'axios';

const API_URL = 'https://erp-system-kyup.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
