import axios from 'axios';
import { toast } from 'react-toastify';

// إعداد Base URL للـ API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// إنشاء instance من Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor لإضافة التوثيق
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor للتعامل مع الأخطاء
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // إزالة Token المنتهي الصلاحية
      localStorage.removeItem('authToken');
      localStorage.removeItem('userType');
      toast.error('انتهت صلاحية جلسة العمل، يرجى تسجيل الدخول مرة أخرى');
      
      // توجيه المستخدم لصفحة تسجيل الدخول حسب نوعه
      const userType = localStorage.getItem('userType');
      if (userType === 'teacher') {
        window.location.href = '/teacher/login';
      } else if (userType === 'admin') {
        window.location.href = '/admin/login';
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// مساعد للتعامل مع الأخطاء
export const handleApiError = (error) => {
  console.error('API Error:', error);

  if (error.response) {
    // الخادم رد بكود خطأ
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return data.message || 'بيانات غير صحيحة';
      case 401:
        return 'غير مصرح لك بالوصول';
      case 403:
        return 'ممنوع الوصول';
      case 404:
        return 'المورد غير موجود';
      case 422:
        return data.errors || 'بيانات غير صالحة';
      case 500:
        return 'خطأ في الخادم';
      default:
        return data.message || 'حدث خطأ غير متوقع';
    }
  } else if (error.request) {
    // تم إرسال الطلب لكن لم يرد الخادم
    return 'لا يمكن الاتصال بالخادم';
  } else {
    // خطأ في إعداد الطلب
    return 'خطأ في الطلب';
  }
};

export default apiClient;