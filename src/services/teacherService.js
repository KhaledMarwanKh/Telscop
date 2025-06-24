import apiClient, { handleApiError } from '../lib/api';

export const teacherService = {
  // جلب ملف المعلم الشخصي
  // العلامة: TEACHER_API_CALL_GET_PROFILE
  getProfile: async () => {
    try {
      const response = await apiClient.get('/teacher/profile');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // تحديث الملف الشخصي
  // العلامة: TEACHER_API_CALL_UPDATE_PROFILE
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/teacher/profile', profileData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب إحصائيات المعلم
  // العلامة: TEACHER_API_CALL_GET_STATS
  getStats: async () => {
    try {
      const response = await apiClient.get('/teacher/stats');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب الدروس القادمة
  // العلامة: TEACHER_API_CALL_GET_UPCOMING_LESSONS
  getUpcomingLessons: async () => {
    try {
      const response = await apiClient.get('/teacher/lessons/upcoming');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب جميع الدروس
  // العلامة: TEACHER_API_CALL_GET_LESSONS
  getLessons: async (filters = {}) => {
    try {
      const response = await apiClient.get('/teacher/lessons', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // تحديث حالة الدرس
  // العلامة: TEACHER_API_CALL_UPDATE_LESSON_STATUS
  updateLessonStatus: async (lessonId, status, notes = '') => {
    try {
      const response = await apiClient.patch(`/teacher/lessons/${lessonId}/status`, { 
        status, 
        notes 
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // قبول طلب حجز
  // العلامة: TEACHER_API_CALL_ACCEPT_BOOKING
  acceptBooking: async (bookingId) => {
    try {
      const response = await apiClient.post(`/teacher/bookings/${bookingId}/accept`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // رفض طلب حجز
  // العلامة: TEACHER_API_CALL_REJECT_BOOKING
  rejectBooking: async (bookingId, reason = '') => {
    try {
      const response = await apiClient.post(`/teacher/bookings/${bookingId}/reject`, { reason });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // رفع الوثائق
  // العلامة: TEACHER_API_CALL_UPLOAD_DOCUMENTS
  uploadDocuments: async (documents) => {
    try {
      const formData = new FormData();
      documents.forEach((doc, index) => {
        formData.append(`document_${index}`, doc);
      });
      
      const response = await apiClient.post('/teacher/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // تحديث الأوقات المتاحة
  // العلامة: TEACHER_API_CALL_UPDATE_AVAILABILITY
  updateAvailability: async (availableTimes) => {
    try {
      const response = await apiClient.put('/teacher/availability', { availableTimes });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب تقييمات المعلم
  // العلامة: TEACHER_API_CALL_GET_REVIEWS
  getReviews: async () => {
    try {
      const response = await apiClient.get('/teacher/reviews');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب الأرباح والمدفوعات
  // العلامة: TEACHER_API_CALL_GET_EARNINGS
  getEarnings: async (period = 'monthly') => {
    try {
      const response = await apiClient.get('/teacher/earnings', { 
        params: { period } 
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // طلب سحب الأرباح
  // العلامة: TEACHER_API_CALL_REQUEST_WITHDRAWAL
  requestWithdrawal: async (amount, bankDetails) => {
    try {
      const response = await apiClient.post('/teacher/withdrawal', { 
        amount, 
        bankDetails 
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};