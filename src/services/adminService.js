import apiClient, { handleApiError } from '../lib/api';

export const adminService = {
  // إحصائيات لوحة التحكم
  // العلامة: ADMIN_API_CALL_GET_DASHBOARD_STATS
  getDashboardStats: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard/stats');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب إحصائيات الرسوم البيانية
  // العلامة: ADMIN_API_CALL_GET_CHART_DATA
  getChartData: async (type, filters = {}) => {
    try {
      const response = await apiClient.get(`/admin/charts/${type}`, { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب جميع الطلاب
  // العلامة: ADMIN_API_CALL_GET_STUDENTS
  getStudents: async (filters = {}) => {
    try {
      const response = await apiClient.get('/admin/students', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // حذف طالب
  // العلامة: ADMIN_API_CALL_DELETE_STUDENT
  deleteStudent: async (studentId) => {
    try {
      const response = await apiClient.delete(`/admin/students/${studentId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // تعليق حساب طالب
  // العلامة: ADMIN_API_CALL_SUSPEND_STUDENT
  suspendStudent: async (studentId, reason) => {
    try {
      const response = await apiClient.post(`/admin/students/${studentId}/suspend`, { reason });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // تفعيل حساب طالب
  // العلامة: ADMIN_API_CALL_ACTIVATE_STUDENT
  activateStudent: async (studentId) => {
    try {
      const response = await apiClient.post(`/admin/students/${studentId}/activate`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب المعلمين النشطين
  // العلامة: ADMIN_API_CALL_GET_ACTIVE_TEACHERS
  getActiveTeachers: async (filters = {}) => {
    try {
      const response = await apiClient.get('/admin/teachers/active', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // تعليق معلم
  // العلامة: ADMIN_API_CALL_SUSPEND_TEACHER
  suspendTeacher: async (teacherId, reason) => {
    try {
      const response = await apiClient.post(`/admin/teachers/${teacherId}/suspend`, { reason });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // تفعيل معلم
  // العلامة: ADMIN_API_CALL_ACTIVATE_TEACHER
  activateTeacher: async (teacherId) => {
    try {
      const response = await apiClient.post(`/admin/teachers/${teacherId}/activate`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب طلبات المعلمين المعلقة
  // العلامة: ADMIN_API_CALL_GET_PENDING_TEACHERS
  getPendingTeachers: async () => {
    try {
      const response = await apiClient.get('/admin/teachers/pending');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // الموافقة على معلم
  // العلامة: ADMIN_API_CALL_APPROVE_TEACHER
  approveTeacher: async (teacherId, notes = '') => {
    try {
      const response = await apiClient.post(`/admin/teachers/${teacherId}/approve`, { notes });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // رفض معلم
  // العلامة: ADMIN_API_CALL_REJECT_TEACHER
  rejectTeacher: async (teacherId, reason) => {
    try {
      const response = await apiClient.post(`/admin/teachers/${teacherId}/reject`, { reason });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // تحميل وثيقة معلم
  // العلامة: ADMIN_API_CALL_DOWNLOAD_TEACHER_DOCUMENT
  downloadTeacherDocument: async (teacherId, documentType) => {
    try {
      const response = await apiClient.get(`/admin/teachers/${teacherId}/documents/${documentType}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب جميع الحجوزات
  // العلامة: ADMIN_API_CALL_GET_BOOKINGS
  getBookings: async (filters = {}) => {
    try {
      const response = await apiClient.get('/admin/bookings', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // إلغاء حجز من الإدارة
  // العلامة: ADMIN_API_CALL_CANCEL_BOOKING
  cancelBooking: async (bookingId, reason) => {
    try {
      const response = await apiClient.post(`/admin/bookings/${bookingId}/cancel`, { reason });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // تأكيد حجز من الإدارة
  // العلامة: ADMIN_API_CALL_CONFIRM_BOOKING
  confirmBooking: async (bookingId) => {
    try {
      const response = await apiClient.post(`/admin/bookings/${bookingId}/confirm`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب الشكاوى والاستفسارات
  // العلامة: ADMIN_API_CALL_GET_COMPLAINTS
  getComplaints: async (filters = {}) => {
    try {
      const response = await apiClient.get('/admin/complaints', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // الرد على شكوى
  // العلامة: ADMIN_API_CALL_RESPOND_TO_COMPLAINT
  respondToComplaint: async (complaintId, response) => {
    try {
      const result = await apiClient.post(`/admin/complaints/${complaintId}/respond`, { response });
      return result.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // تحديث حالة شكوى
  // العلامة: ADMIN_API_CALL_UPDATE_COMPLAINT_STATUS
  updateComplaintStatus: async (complaintId, status) => {
    try {
      const response = await apiClient.patch(`/admin/complaints/${complaintId}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب تقارير مالية
  // العلامة: ADMIN_API_CALL_GET_FINANCIAL_REPORTS
  getFinancialReports: async (period = 'monthly') => {
    try {
      const response = await apiClient.get('/admin/reports/financial', { 
        params: { period } 
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // جلب تقارير الأداء
  // العلامة: ADMIN_API_CALL_GET_PERFORMANCE_REPORTS
  getPerformanceReports: async (filters = {}) => {
    try {
      const response = await apiClient.get('/admin/reports/performance', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // إعدادات النظام
  // العلامة: ADMIN_API_CALL_GET_SYSTEM_SETTINGS
  getSystemSettings: async () => {
    try {
      const response = await apiClient.get('/admin/settings');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // تحديث إعدادات النظام
  // العلامة: ADMIN_API_CALL_UPDATE_SYSTEM_SETTINGS
  updateSystemSettings: async (settings) => {
    try {
      const response = await apiClient.put('/admin/settings', settings);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // إرسال إشعار جماعي
  // العلامة: ADMIN_API_CALL_SEND_NOTIFICATION
  sendNotification: async (notificationData) => {
    try {
      const response = await apiClient.post('/admin/notifications', notificationData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};