import apiClient, { handleApiError } from '../lib/api';

export const studentService = {
  // جلب قائمة المعلمين
  // العلامة: STUDENT_API_CALL_GET_TEACHERS
  getTeachers: async (filters = {}) => {
    try {
      const response = await apiClient.get('/students/teachers', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب تفاصيل معلم محدد
  // العلامة: STUDENT_API_CALL_GET_TEACHER_DETAILS
  getTeacherDetails: async (teacherId) => {
    try {
      const response = await apiClient.get(`/students/teachers/${teacherId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // حجز درس
  // العلامة: STUDENT_API_CALL_BOOK_LESSON
  bookLesson: async (bookingData) => {
    try {
      const response = await apiClient.post('/students/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب حجوزات الطالب
  // العلامة: STUDENT_API_CALL_GET_BOOKINGS
  getBookings: async (status = 'all') => {
    try {
      const response = await apiClient.get('/students/bookings', { 
        params: { status } 
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // إلغاء حجز
  // العلامة: STUDENT_API_CALL_CANCEL_BOOKING
  cancelBooking: async (bookingId, reason = '') => {
    try {
      const response = await apiClient.delete(`/students/bookings/${bookingId}`, {
        data: { reason }
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب ملف الطالب الشخصي
  // العلامة: STUDENT_API_CALL_GET_PROFILE
  getProfile: async () => {
    try {
      const response = await apiClient.get('/students/profile');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // تحديث الملف الشخصي
  // العلامة: STUDENT_API_CALL_UPDATE_PROFILE
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/students/profile', profileData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // البحث عن المعلمين
  // العلامة: STUDENT_API_CALL_SEARCH_TEACHERS
  searchTeachers: async (searchQuery, filters = {}) => {
    try {
      const params = {
        q: searchQuery,
        ...filters
      };
      const response = await apiClient.get('/students/teachers/search', { params });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب الأوقات المتاحة لمعلم
  // العلامة: STUDENT_API_CALL_GET_TEACHER_AVAILABILITY
  getTeacherAvailability: async (teacherId, date) => {
    try {
      const response = await apiClient.get(`/students/teachers/${teacherId}/availability`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // إضافة تقييم للمعلم
  // العلامة: STUDENT_API_CALL_ADD_REVIEW
  addReview: async (teacherId, rating, comment) => {
    try {
      const response = await apiClient.post(`/students/teachers/${teacherId}/review`, {
        rating,
        comment
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // إرسال استفسار أو شكوى
  // العلامة: STUDENT_API_CALL_SUBMIT_COMPLAINT
  submitComplaint: async (complaintData) => {
    try {
      const response = await apiClient.post('/students/complaints', complaintData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب المواد والصفوف المتاحة
  // العلامة: STUDENT_API_CALL_GET_SUBJECTS_GRADES
  getSubjectsAndGrades: async () => {
    try {
      const response = await apiClient.get('/students/subjects-grades');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب إحصائيات الطالب
  // العلامة: STUDENT_API_CALL_GET_STATS
  getStats: async () => {
    try {
      const response = await apiClient.get('/students/stats');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};