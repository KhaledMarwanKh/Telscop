# دليل دمج Axios مع Backend API

## نظرة عامة
هذا الدليل يوضح كيفية ربط تطبيق تلسكوب مع Backend API باستخدام مكتبة Axios.

## المتطلبات الأساسية

### 1. تثبيت Axios
```bash
npm install axios
```

### 2. إعداد Axios Client
إنشاء ملف `client/src/lib/api.js`:

```javascript
import axios from 'axios';

// إعداد Base URL للـ API
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

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
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

## التوثيق المفصل للـ APIs

### 1. APIs التوثيق (Authentication)

#### تسجيل الدخول للطلاب
```javascript
// client/src/services/authService.js
import apiClient from '../lib/api';

export const authService = {
  // تسجيل دخول الطالب
  loginStudent: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/student/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // تسجيل طالب جديد
  registerStudent: async (studentData) => {
    try {
      const response = await apiClient.post('/auth/student/register', studentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // تسجيل دخول المعلم
  loginTeacher: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/teacher/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // تسجيل معلم جديد
  registerTeacher: async (teacherData) => {
    try {
      const response = await apiClient.post('/auth/teacher/register', teacherData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // تسجيل دخول الإدارة
  loginAdmin: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/admin/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // تسجيل الخروج
  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
};
```

### 2. APIs المعلمين (Teachers)

```javascript
// client/src/services/teacherService.js
import apiClient from '../lib/api';

export const teacherService = {
  // جلب ملف المعلم الشخصي
  getProfile: async () => {
    try {
      const response = await apiClient.get('/teacher/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // تحديث الملف الشخصي
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/teacher/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // جلب إحصائيات المعلم
  getStats: async () => {
    try {
      const response = await apiClient.get('/teacher/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // جلب الدروس القادمة
  getUpcomingLessons: async () => {
    try {
      const response = await apiClient.get('/teacher/lessons/upcoming');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // جلب جميع الدروس
  getLessons: async (filters) => {
    try {
      const response = await apiClient.get('/teacher/lessons', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // تحديث حالة الدرس
  updateLessonStatus: async (lessonId, status) => {
    try {
      const response = await apiClient.patch(`/teacher/lessons/${lessonId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // رفع الوثائق
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
      throw error.response?.data || error.message;
    }
  }
};
```

### 3. APIs الطلاب (Students)

```javascript
// client/src/services/studentService.js
import apiClient from '../lib/api';

export const studentService = {
  // جلب قائمة المعلمين
  getTeachers: async (filters) => {
    try {
      const response = await apiClient.get('/students/teachers', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // جلب تفاصيل معلم محدد
  getTeacherDetails: async (teacherId) => {
    try {
      const response = await apiClient.get(`/students/teachers/${teacherId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // حجز درس
  bookLesson: async (bookingData) => {
    try {
      const response = await apiClient.post('/students/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // جلب حجوزات الطالب
  getBookings: async () => {
    try {
      const response = await apiClient.get('/students/bookings');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // إلغاء حجز
  cancelBooking: async (bookingId) => {
    try {
      const response = await apiClient.delete(`/students/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // جلب ملف الطالب الشخصي
  getProfile: async () => {
    try {
      const response = await apiClient.get('/students/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // تحديث الملف الشخصي
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/students/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
```

### 4. APIs الإدارة (Admin)

```javascript
// client/src/services/adminService.js
import apiClient from '../lib/api';

export const adminService = {
  // إحصائيات لوحة التحكم
  getDashboardStats: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // جلب جميع الطلاب
  getStudents: async (filters) => {
    try {
      const response = await apiClient.get('/admin/students', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // جلب المعلمين النشطين
  getActiveTeachers: async (filters) => {
    try {
      const response = await apiClient.get('/admin/teachers/active', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // جلب طلبات المعلمين المعلقة
  getPendingTeachers: async () => {
    try {
      const response = await apiClient.get('/admin/teachers/pending');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // الموافقة على معلم
  approveTeacher: async (teacherId) => {
    try {
      const response = await apiClient.post(`/admin/teachers/${teacherId}/approve`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // رفض معلم
  rejectTeacher: async (teacherId, reason) => {
    try {
      const response = await apiClient.post(`/admin/teachers/${teacherId}/reject`, { reason });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // جلب جميع الحجوزات
  getBookings: async (filters) => {
    try {
      const response = await apiClient.get('/admin/bookings', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // إلغاء حجز من الإدارة
  cancelBooking: async (bookingId, reason) => {
    try {
      const response = await apiClient.post(`/admin/bookings/${bookingId}/cancel`, { reason });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // جلب الشكاوى والاستفسارات
  getComplaints: async (filters) => {
    try {
      const response = await apiClient.get('/admin/complaints', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // الرد على شكوى
  respondToComplaint: async (complaintId, response) => {
    try {
      const result = await apiClient.post(`/admin/complaints/${complaintId}/respond`, { response });
      return result.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // تحديث حالة شكوى
  updateComplaintStatus: async (complaintId, status) => {
    try {
      const response = await apiClient.patch(`/admin/complaints/${complaintId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
```

## علامات الاستدعاء في المشروع

### 1. في صفحة تسجيل الدخول للطلاب
```javascript
// client/src/pages/Login.jsx
// العلامة: AUTH_API_CALL_STUDENT_LOGIN
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    // استبدال هذا الكود بـ:
    const response = await authService.loginStudent(formData);
    localStorage.setItem('authToken', response.token);
    toast.success('تم تسجيل الدخول بنجاح!');
    navigate('/profile');
  } catch (error) {
    toast.error(error.message || 'حدث خطأ في تسجيل الدخول');
  } finally {
    setIsLoading(false);
  }
};
```

### 2. في صفحة تسجيل معلم جديد
```javascript
// client/src/pages/teacher/TeacherRegister.jsx
// العلامة: AUTH_API_CALL_TEACHER_REGISTER
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // جمع البيانات من جميع الخطوات
    const completeData = {
      ...personalInfo,
      ...academicInfo,
      availableTimes,
      documents: uploadedDocuments
    };

    const response = await authService.registerTeacher(completeData);
    toast.success('تم التسجيل بنجاح! في انتظار مراجعة الإدارة');
    navigate('/teacher/login');
  } catch (error) {
    toast.error(error.message || 'حدث خطأ في التسجيل');
  } finally {
    setIsLoading(false);
  }
};
```

### 3. في لوحة تحكم المعلم
```javascript
// client/src/pages/teacher/TeacherDashboard.jsx
// العلامة: TEACHER_API_CALL_DASHBOARD_DATA
useEffect(() => {
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [profile, stats, upcomingLessons] = await Promise.all([
        teacherService.getProfile(),
        teacherService.getStats(),
        teacherService.getUpcomingLessons()
      ]);

      setTeacherProfile(profile);
      setStats(stats);
      setUpcomingLessons(upcomingLessons);
    } catch (error) {
      toast.error('حدث خطأ في تحميل البيانات');
    } finally {
      setIsLoading(false);
    }
  };

  fetchDashboardData();
}, []);
```

### 4. في صفحة المعلمين للطلاب
```javascript
// client/src/pages/Teachers.jsx
// العلامة: STUDENT_API_CALL_TEACHERS_LIST
useEffect(() => {
  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const filters = {
        subject: selectedSubject,
        grade: selectedGrade,
        location: selectedLocation
      };
      
      const response = await studentService.getTeachers(filters);
      setTeachers(response.teachers);
    } catch (error) {
      toast.error('حدث خطأ في تحميل قائمة المعلمين');
    } finally {
      setIsLoading(false);
    }
  };

  fetchTeachers();
}, [selectedSubject, selectedGrade, selectedLocation]);
```

### 5. في صفحة الحجز
```javascript
// client/src/pages/Booking.jsx
// العلامة: STUDENT_API_CALL_BOOK_LESSON
const handleBooking = async () => {
  setIsLoading(true);
  try {
    const bookingData = {
      teacherId: teacher.id,
      date: selectedDate,
      time: selectedTime,
      duration: selectedDuration,
      subject: selectedSubject,
      notes: notes
    };

    const response = await studentService.bookLesson(bookingData);
    toast.success('تم حجز الدرس بنجاح!');
    navigate('/bookings');
  } catch (error) {
    toast.error(error.message || 'حدث خطأ في الحجز');
  } finally {
    setIsLoading(false);
  }
};
```

### 6. في لوحة تحكم الإدارة
```javascript
// client/src/pages/admin/AdminDashboard.jsx
// العلامة: ADMIN_API_CALL_DASHBOARD_STATS
useEffect(() => {
  const fetchDashboardStats = async () => {
    setIsLoading(true);
    try {
      const stats = await adminService.getDashboardStats();
      setDashboardStats(stats);
    } catch (error) {
      toast.error('حدث خطأ في تحميل الإحصائيات');
    } finally {
      setIsLoading(false);
    }
  };

  fetchDashboardStats();
}, []);
```

### 7. في صفحة إدارة الطلاب
```javascript
// client/src/pages/admin/AdminStudents.jsx
// العلامة: ADMIN_API_CALL_STUDENTS_LIST
useEffect(() => {
  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const filters = {
        search: searchTerm,
        grade: gradeFilter,
        status: statusFilter
      };
      
      const response = await adminService.getStudents(filters);
      setStudents(response.students);
    } catch (error) {
      toast.error('حدث خطأ في تحميل قائمة الطلاب');
    } finally {
      setIsLoading(false);
    }
  };

  fetchStudents();
}, [searchTerm, gradeFilter, statusFilter]);
```

### 8. في صفحة طلبات المعلمين
```javascript
// client/src/pages/admin/AdminPendingTeachers.jsx
// العلامة: ADMIN_API_CALL_PENDING_TEACHERS
const handleApproveTeacher = async (teacherId) => {
  try {
    await adminService.approveTeacher(teacherId);
    // إزالة المعلم من القائمة المحلية
    setTeachers(prev => prev.filter(t => t.id !== teacherId));
    toast.success('تم قبول المعلم وتفعيل حسابه بنجاح');
  } catch (error) {
    toast.error('حدث خطأ في الموافقة على المعلم');
  }
};
```

### 9. في صفحة الشكاوى والاستفسارات
```javascript
// client/src/pages/admin/AdminComplaints.jsx
// العلامة: ADMIN_API_CALL_COMPLAINTS
const handleResolveComplaint = async (complaintId) => {
  try {
    await adminService.respondToComplaint(complaintId, responseText);
    await adminService.updateComplaintStatus(complaintId, 'resolved');
    
    // تحديث الحالة المحلية
    setComplaints(prev => prev.map(c => 
      c.id === complaintId 
        ? { ...c, status: 'resolved', response: responseText }
        : c
    ));
    
    toast.success('تم حل الاستفسار بنجاح');
  } catch (error) {
    toast.error('حدث خطأ في حل الاستفسار');
  }
};
```

## متغيرات البيئة المطلوبة

إنشاء ملف `.env` في جذر المشروع:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:8000/api

# Upload limits
VITE_MAX_FILE_SIZE=5MB
VITE_ALLOWED_FILE_TYPES=pdf,jpg,jpeg,png,doc,docx

# Map API (if using maps)
VITE_MAP_API_KEY=your_map_api_key
```

## أنواع البيانات المتوقعة من Backend

### 1. بيانات المعلم
```typescript
interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  image?: string;
  subjects: string[];
  grades: number[];
  experience: number;
  rating: number;
  reviewsCount: number;
  location: string;
  pricePerHour: number;
  availableTimes: TimeSlot[];
  bio: string;
  education: string;
  status: 'activated' | 'not_activated' | 'suspended';
  joinDate: string;
}
```

### 2. بيانات الطالب
```typescript
interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  grade: number;
  parentName: string;
  parentPhone: string;
  address: string;
  image?: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
}
```

### 3. بيانات الحجز
```typescript
interface Booking {
  id: number;
  studentId: number;
  teacherId: number;
  subject: string;
  grade: number;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}
```

### 4. بيانات الشكوى/الاستفسار
```typescript
interface Complaint {
  id: number;
  type: 'complaint' | 'inquiry';
  subject: string;
  message: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderType: 'student' | 'teacher';
  priority: 'low' | 'normal' | 'high';
  status: 'pending' | 'in_progress' | 'resolved';
  category: string;
  response?: string;
  date: string;
}
```

## مصائد الأخطاء والتعامل معها

### 1. مصيدة أخطاء شاملة
```javascript
// client/src/utils/errorHandler.js
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
```

### 2. استخدام مصيدة الأخطاء
```javascript
import { handleApiError } from '../utils/errorHandler';

try {
  const response = await apiClient.get('/endpoint');
  return response.data;
} catch (error) {
  const errorMessage = handleApiError(error);
  toast.error(errorMessage);
  throw error;
}
```

## إرشادات الأمان

### 1. حماية التوثيق
- تخزين Token في localStorage مع انتهاء صلاحية
- استخدام HTTPS في الإنتاج
- التحقق من صحة Token في كل طلب

### 2. التحقق من البيانات
- التحقق من صحة البيانات في Frontend قبل الإرسال
- استخدام Validation schemas مع Zod
- تنظيف البيانات قبل عرضها

### 3. معالجة الملفات
- التحقق من نوع وحجم الملفات
- استخدام FormData لرفع الملفات
- عرض progress للرفع

هذا الدليل يوفر إطار عمل شامل لدمج Backend API مع تطبيق تلسكوب باستخدام Axios.