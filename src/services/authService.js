import apiClient, { handleApiError } from '../lib/api';

export const authService = {
  // تسجيل دخول الطالب
  // العلامة: AUTH_API_CALL_STUDENT_LOGIN
  loginStudent: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/student/login', credentials);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userType', 'student');
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  // تسجيل طالب جديد
  // العلامة: AUTH_API_CALL_STUDENT_REGISTER
  registerStudent: async (studentData) => {
    try {
      const response = await apiClient.post('/auth/student/register', studentData);
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  // تسجيل دخول المعلم
  // العلامة: AUTH_API_CALL_TEACHER_LOGIN
  loginTeacher: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/teacher/login', credentials);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userType', 'teacher');
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  // تسجيل معلم جديد
  // العلامة: AUTH_API_CALL_TEACHER_REGISTER
  registerTeacher: async (teacherData) => {
    try {
      // إعداد FormData لرفع الملفات
      const formData = new FormData();
      
      // إضافة البيانات الأساسية
      Object.keys(teacherData).forEach(key => {
        if (key === 'documents') {
          // إضافة الملفات
          teacherData.documents.forEach((file, index) => {
            formData.append(`document_${index}`, file);
          });
        } else if (key === 'availableTimes' || key === 'subjects' || key === 'grades') {
          // تحويل المصفوفات إلى JSON
          formData.append(key, JSON.stringify(teacherData[key]));
        } else {
          formData.append(key, teacherData[key]);
        }
      });

      const response = await apiClient.post('/auth/teacher/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  // تسجيل دخول الإدارة
  // العلامة: AUTH_API_CALL_ADMIN_LOGIN
  loginAdmin: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/admin/login', credentials);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userType', 'admin');
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  // تسجيل الخروج
  // العلامة: AUTH_API_CALL_LOGOUT
  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userType');
    }
  },

  // التحقق من صحة Token
  verifyToken: async () => {
    try {
      const response = await apiClient.get('/auth/verify');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};