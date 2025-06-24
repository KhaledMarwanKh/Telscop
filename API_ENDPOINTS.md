# نقاط النهاية API المطلوبة للـ Backend

## 1. التوثيق (Authentication)

### تسجيل الدخول والتسجيل

```
POST /api/auth/student/login
Body: { email, password, rememberMe? }
Response: { token, user, expiresIn }

POST /api/auth/student/register  
Body: { name, email, password, phone, grade, parentName, parentPhone, address }
Response: { message, user }

POST /api/auth/teacher/login
Body: { email, password, rememberMe? }
Response: { token, user, expiresIn }

POST /api/auth/teacher/register (multipart/form-data)
Body: FormData containing:
- personalInfo: { name, email, password, phone, birthDate, address }
- academicInfo: { subjects[], grades[], experience, education, bio }
- availableTimes: [{ day, timeSlots[] }]
- documents: File[]
Response: { message, applicationId }

POST /api/auth/admin/login
Body: { email, password }
Response: { token, user, expiresIn }

POST /api/auth/logout
Headers: Authorization: Bearer {token}
Response: { message }

GET /api/auth/verify
Headers: Authorization: Bearer {token}
Response: { user, valid }
```

## 2. خدمات المعلمين (Teacher Services)

### الملف الشخصي والإعدادات

```
GET /api/teacher/profile
Headers: Authorization: Bearer {token}
Response: { id, name, email, phone, subjects, grades, rating, bio, ... }

PUT /api/teacher/profile
Headers: Authorization: Bearer {token}
Body: { name?, phone?, bio?, subjects?, grades?, pricePerHour? }
Response: { message, user }

GET /api/teacher/stats
Headers: Authorization: Bearer {token}
Response: { 
  totalLessons, 
  thisMonthLessons, 
  totalEarnings, 
  thisMonthEarnings,
  averageRating,
  studentsCount
}
```

### إدارة الدروس والحجوزات

```
GET /api/teacher/lessons/upcoming
Headers: Authorization: Bearer {token}
Query: limit?, offset?
Response: { lessons[], total }

GET /api/teacher/lessons
Headers: Authorization: Bearer {token}
Query: status?, from?, to?, limit?, offset?
Response: { lessons[], total, pagination }

PATCH /api/teacher/lessons/{lessonId}/status
Headers: Authorization: Bearer {token}
Body: { status: 'confirmed' | 'completed' | 'cancelled', notes? }
Response: { message, lesson }

POST /api/teacher/bookings/{bookingId}/accept
Headers: Authorization: Bearer {token}
Response: { message, booking }

POST /api/teacher/bookings/{bookingId}/reject
Headers: Authorization: Bearer {token}
Body: { reason? }
Response: { message, booking }
```

### الوثائق والمستندات

```
POST /api/teacher/documents (multipart/form-data)
Headers: Authorization: Bearer {token}
Body: FormData with files
Response: { message, documents[] }

GET /api/teacher/documents
Headers: Authorization: Bearer {token}
Response: { documents[] }
```

### الأوقات المتاحة

```
PUT /api/teacher/availability
Headers: Authorization: Bearer {token}
Body: { availableTimes: [{ day, timeSlots[] }] }
Response: { message, availability }

GET /api/teacher/availability
Headers: Authorization: Bearer {token}
Response: { availableTimes[] }
```

### التقييمات والأرباح

```
GET /api/teacher/reviews
Headers: Authorization: Bearer {token}
Query: limit?, offset?
Response: { reviews[], averageRating, total }

GET /api/teacher/earnings
Headers: Authorization: Bearer {token}
Query: period? (monthly, quarterly, yearly)
Response: { 
  totalEarnings, 
  periodEarnings, 
  pendingPayments,
  paidPayments,
  chartData[]
}

POST /api/teacher/withdrawal
Headers: Authorization: Bearer {token}
Body: { amount, bankDetails: { accountNumber, bankName, accountName, branchName } }
Response: { message, withdrawalId }
```

## 3. خدمات الطلاب (Student Services)

### البحث والتصفح

```
GET /api/students/teachers
Query: subject?, grade?, location?, minRating?, maxPrice?, availability?, limit?, offset?
Response: { teachers[], total, filters: { subjects[], grades[], locations[] } }

GET /api/students/teachers/search
Query: q, subject?, grade?, location?, limit?, offset?
Response: { teachers[], total, suggestions[] }

GET /api/students/teachers/{teacherId}
Response: { teacher, reviews[], availability[], relatedTeachers[] }

GET /api/students/teachers/{teacherId}/availability
Query: date
Response: { date, availableSlots[] }
```

### الحجوزات

```
POST /api/students/bookings
Headers: Authorization: Bearer {token}
Body: { 
  teacherId, 
  date, 
  time, 
  duration, 
  subject, 
  grade,
  notes?,
  paymentMethod 
}
Response: { message, booking, paymentUrl? }

GET /api/students/bookings
Headers: Authorization: Bearer {token}
Query: status?, from?, to?, limit?, offset?
Response: { bookings[], total }

DELETE /api/students/bookings/{bookingId}
Headers: Authorization: Bearer {token}
Body: { reason? }
Response: { message, refundAmount? }
```

### الملف الشخصي

```
GET /api/students/profile
Headers: Authorization: Bearer {token}
Response: { id, name, email, phone, grade, parentInfo, address, ... }

PUT /api/students/profile
Headers: Authorization: Bearer {token}
Body: { name?, phone?, grade?, parentName?, parentPhone?, address? }
Response: { message, user }

GET /api/students/stats
Headers: Authorization: Bearer {token}
Response: { 
  totalLessons, 
  completedLessons, 
  upcomingLessons,
  totalSpent,
  favoriteSubjects[]
}
```

### التقييمات والشكاوى

```
POST /api/students/teachers/{teacherId}/review
Headers: Authorization: Bearer {token}
Body: { rating, comment, bookingId }
Response: { message, review }

POST /api/students/complaints
Headers: Authorization: Bearer {token}
Body: { 
  type: 'complaint' | 'inquiry',
  subject,
  message,
  category,
  priority: 'low' | 'normal' | 'high'
}
Response: { message, complaintId }
```

### البيانات المرجعية

```
GET /api/students/subjects-grades
Response: { 
  subjects: [{ id, name, grades[] }],
  grades: [{ id, name }],
  locations: [{ id, name }]
}
```

## 4. خدمات الإدارة (Admin Services)

### لوحة التحكم والإحصائيات

```
GET /api/admin/dashboard/stats
Headers: Authorization: Bearer {token}
Response: { 
  totalStudents,
  totalTeachers, 
  totalLessons,
  totalRevenue,
  monthlyGrowth: { students, teachers, lessons, revenue },
  recentActivity[]
}

GET /api/admin/charts/{type}
Headers: Authorization: Bearer {token}
Query: from?, to?, subject?, grade?
Types: students-by-grade, lessons-by-subject, teachers-by-grade, monthly-stats
Response: { labels[], datasets[] }
```

### إدارة الطلاب

```
GET /api/admin/students
Headers: Authorization: Bearer {token}
Query: search?, grade?, status?, limit?, offset?, sortBy?, sortOrder?
Response: { students[], total, pagination }

DELETE /api/admin/students/{studentId}
Headers: Authorization: Bearer {token}
Response: { message }

POST /api/admin/students/{studentId}/suspend
Headers: Authorization: Bearer {token}
Body: { reason }
Response: { message }

POST /api/admin/students/{studentId}/activate
Headers: Authorization: Bearer {token}
Response: { message }
```

### إدارة المعلمين

```
GET /api/admin/teachers/active
Headers: Authorization: Bearer {token}
Query: search?, subject?, status?, limit?, offset?, sortBy?, sortOrder?
Response: { teachers[], total, pagination }

GET /api/admin/teachers/pending
Headers: Authorization: Bearer {token}
Response: { teachers[], total }

POST /api/admin/teachers/{teacherId}/approve
Headers: Authorization: Bearer {token}
Body: { notes? }
Response: { message }

POST /api/admin/teachers/{teacherId}/reject
Headers: Authorization: Bearer {token}
Body: { reason }
Response: { message }

GET /api/admin/teachers/{teacherId}/documents/{documentType}
Headers: Authorization: Bearer {token}
Response: File download

POST /api/admin/teachers/{teacherId}/suspend
Headers: Authorization: Bearer {token}
Body: { reason }
Response: { message }

POST /api/admin/teachers/{teacherId}/activate
Headers: Authorization: Bearer {token}
Response: { message }
```

### إدارة الحجوزات

```
GET /api/admin/bookings
Headers: Authorization: Bearer {token}
Query: status?, from?, to?, studentId?, teacherId?, subject?, limit?, offset?
Response: { bookings[], total, stats }

POST /api/admin/bookings/{bookingId}/cancel
Headers: Authorization: Bearer {token}
Body: { reason }
Response: { message, refundAmount? }

POST /api/admin/bookings/{bookingId}/confirm
Headers: Authorization: Bearer {token}
Response: { message }
```

### إدارة الشكاوى والاستفسارات

```
GET /api/admin/complaints
Headers: Authorization: Bearer {token}
Query: status?, type?, priority?, from?, to?, limit?, offset?
Response: { complaints[], total, stats }

POST /api/admin/complaints/{complaintId}/respond
Headers: Authorization: Bearer {token}
Body: { response }
Response: { message }

PATCH /api/admin/complaints/{complaintId}/status
Headers: Authorization: Bearer {token}
Body: { status: 'pending' | 'in_progress' | 'resolved' }
Response: { message }
```

### التقارير والتحليلات

```
GET /api/admin/reports/financial
Headers: Authorization: Bearer {token}
Query: period? (daily, weekly, monthly, yearly), from?, to?
Response: { 
  totalRevenue,
  totalCommission,
  teacherPayouts,
  platformRevenue,
  chartData[],
  breakdown: { bySubject[], byGrade[], byTeacher[] }
}

GET /api/admin/reports/performance
Headers: Authorization: Bearer {token}
Query: from?, to?, teacherId?, subject?
Response: {
  lessonsCompleted,
  averageRating,
  studentRetention,
  teacherPerformance[],
  subjectPopularity[]
}
```

### إعدادات النظام

```
GET /api/admin/settings
Headers: Authorization: Bearer {token}
Response: { 
  general: { siteName, contactEmail, supportPhone },
  payment: { commissionRate, minWithdrawal },
  booking: { cancellationPolicy, refundPolicy },
  notification: { emailSettings, smsSettings }
}

PUT /api/admin/settings
Headers: Authorization: Bearer {token}
Body: { settings object }
Response: { message }

POST /api/admin/notifications
Headers: Authorization: Bearer {token}
Body: { 
  type: 'email' | 'sms' | 'push',
  recipients: 'all' | 'students' | 'teachers' | 'custom',
  recipientIds?: [],
  subject,
  message,
  sendAt?: datetime
}
Response: { message, notificationId }
```

## 5. الملفات والوسائط

```
POST /api/upload/profile-image (multipart/form-data)
Headers: Authorization: Bearer {token}
Body: FormData with image file
Response: { imageUrl }

POST /api/upload/documents (multipart/form-data)
Headers: Authorization: Bearer {token}
Body: FormData with document files
Response: { documents: [{ url, type, name }] }

GET /api/files/{fileId}
Query: download? (boolean)
Response: File content or download
```

## 6. الإشعارات والرسائل

```
GET /api/notifications
Headers: Authorization: Bearer {token}
Query: unread?, limit?, offset?
Response: { notifications[], unreadCount, total }

PATCH /api/notifications/{notificationId}/read
Headers: Authorization: Bearer {token}
Response: { message }

POST /api/notifications/mark-all-read
Headers: Authorization: Bearer {token}
Response: { message }
```

## أنواع البيانات الأساسية

### User Types
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
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  totalLessons: number;
}

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  image?: string;
  subjects: string[];
  grades: number[];
  experience: number;
  education: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  location: string;
  pricePerHour: number;
  status: 'activated' | 'not_activated' | 'suspended';
  joinDate: string;
  totalLessons: number;
  totalEarnings: number;
  studentsCount: number;
  availableTimes: AvailableTime[];
}

interface AvailableTime {
  day: string; // 'monday', 'tuesday', etc.
  timeSlots: { start: string; end: string }[];
}
```

### Booking Types
```typescript
interface Booking {
  id: number;
  studentId: number;
  teacherId: number;
  student: Student;
  teacher: Teacher;
  subject: string;
  grade: number;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Complaint Types
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
  senderId: number;
  priority: 'low' | 'normal' | 'high';
  status: 'pending' | 'in_progress' | 'resolved';
  category: string;
  response?: string;
  adminId?: number;
  createdAt: string;
  updatedAt: string;
}
```

### Response Formats
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
```

## متطلبات الأمان والتوثيق

1. **JWT Token**: يجب أن تكون صالحة لمدة 24 ساعة للطلاب والمعلمين، 8 ساعات للإدارة
2. **Rate Limiting**: حد أقصى 100 طلب في الدقيقة لكل IP
3. **File Upload**: حد أقصى 5MB لكل ملف، أنواع مسموحة: PDF, JPG, PNG, DOC, DOCX
4. **Data Validation**: التحقق من صحة جميع البيانات المدخلة
5. **CORS**: السماح للنطاقات المحددة فقط
6. **HTTPS**: مطلوب في البيئة الإنتاجية

## متغيرات البيئة المطلوبة

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/telescope

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=24h

# File Storage
UPLOAD_PATH=/uploads
MAX_FILE_SIZE=5MB

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# SMS (Optional)
SMS_API_KEY=your-sms-api-key
SMS_SENDER=TeleScope

# Payment (Optional)
PAYMENT_GATEWAY_URL=https://payment-gateway.com
PAYMENT_API_KEY=your-payment-api-key
```