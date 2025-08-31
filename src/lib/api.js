import axios from 'axios';

// إعداد Base URL للـ API
const API_BASE_URL = 'https://backen-telscop.onrender.com/';

// إنشاء instance من Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
});

export default api;