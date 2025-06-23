// Mock data for admin dashboard

export const adminProfile = {
  id: 1,
  name: 'أحمد محمد الإدارة',
  email: 'admin@telescope.sy',
  role: 'مدير النظام',
  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150'
};

// Students data by grade
export const studentsByGrade = {
  labels: ['الصف الأول', 'الصف الثاني', 'الصف الثالث', 'الصف الرابع', 'الصف الخامس', 'الصف السادس', 'الصف السابع', 'الصف الثامن', 'الصف التاسع'],
  data: [45, 52, 38, 61, 48, 55, 42, 39, 35]
};

// Completed lessons by subject
export const lessonsBySubject = {
  labels: ['الرياضيات', 'اللغة العربية', 'العلوم', 'اللغة الإنجليزية', 'التاريخ', 'الجغرافيا'],
  data: [245, 189, 156, 198, 87, 92]
};

// Teachers by grade
export const teachersByGrade = {
  labels: ['الصف الأول', 'الصف الثاني', 'الصف الثالث', 'الصف الرابع', 'الصف الخامس', 'الصف السادس', 'الصف السابع', 'الصف الثامن', 'الصف التاسع'],
  data: [12, 15, 18, 22, 25, 28, 24, 20, 18]
};

// Monthly statistics
export const monthlyStats = {
  labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
  students: [120, 145, 168, 195, 230, 265],
  teachers: [25, 32, 38, 45, 52, 58],
  lessons: [580, 720, 890, 1050, 1280, 1520]
};

// Active teachers data
export const activeTeachers = [
  {
    id: 1,
    name: 'أ. محمد أحمد السعيد',
    email: 'mohammed@email.com',
    phone: '+963 944 123 456',
    subject: 'الرياضيات',
    subjectKey: 'math',
    grades: [1, 2, 3, 4, 5],
    totalLessons: 152,
    totalEarnings: 3800000,
    studentsCount: 45,
    rating: 4.8,
    joinDate: '2024-01-15',
    status: 'activated',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80'
  },
  {
    id: 2,
    name: 'أ. فاطمة خالد النور',
    email: 'fatima@email.com',
    phone: '+963 944 234 567',
    subject: 'اللغة العربية',
    subjectKey: 'arabic',
    grades: [6, 7, 8, 9],
    totalLessons: 128,
    totalEarnings: 3200000,
    studentsCount: 38,
    rating: 4.9,
    joinDate: '2024-01-20',
    status: 'activated',
    image: 'https://images.unsplash.com/photo-1494790108755-2616c96de2ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80'
  },
  {
    id: 3,
    name: 'أ. أحمد علي الشام',
    email: 'ahmed@email.com',
    phone: '+963 944 345 678',
    subject: 'العلوم',
    subjectKey: 'science',
    grades: [4, 5, 6, 7],
    totalLessons: 94,
    totalEarnings: 2350000,
    studentsCount: 29,
    rating: 4.6,
    joinDate: '2024-02-01',
    status: 'activated',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80'
  },
  {
    id: 4,
    name: 'أ. سارة محمود القادري',
    email: 'sara@email.com',
    phone: '+963 944 456 789',
    subject: 'اللغة الإنجليزية',
    subjectKey: 'english',
    grades: [7, 8, 9],
    totalLessons: 116,
    totalEarnings: 2900000,
    studentsCount: 33,
    rating: 4.7,
    joinDate: '2024-01-28',
    status: 'activated',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80'
  }
];

// Pending teachers (not activated)
export const pendingTeachers = [
  {
    id: 5,
    name: 'أ. خالد يوسف المحمد',
    email: 'khaled@email.com',
    phone: '+963 944 567 890',
    subject: 'التاريخ',
    subjectKey: 'history',
    grades: [8, 9],
    applicationDate: '2024-06-10',
    status: 'not_activated',
    documents: ['الشهادة الجامعية', 'الهوية الشخصية', 'السيرة الذاتية'],
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80'
  },
  {
    id: 6,
    name: 'أ. ليلى أحمد الخطيب',
    email: 'layla@email.com',
    phone: '+963 944 678 901',
    subject: 'الجغرافيا',
    subjectKey: 'geography',
    grades: [6, 7, 8],
    applicationDate: '2024-06-12',
    status: 'not_activated',
    documents: ['الشهادة الجامعية', 'الهوية الشخصية'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80'
  },
  {
    id: 7,
    name: 'أ. علي حسن التركماني',
    email: 'ali@email.com',
    phone: '+963 944 789 012',
    subject: 'الرياضيات',
    subjectKey: 'math',
    grades: [1, 2, 3],
    applicationDate: '2024-06-14',
    status: 'not_activated',
    documents: ['الشهادة الجامعية', 'الهوية الشخصية', 'شهادة خبرة'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80'
  }
];

// All students data
export const allStudents = [
  {
    id: 1,
    name: 'أحمد محمد علي',
    email: 'ahmed.student@email.com',
    phone: '+963 944 123 456',
    grade: 5,
    parentName: 'محمد علي',
    parentPhone: '+963 944 123 457',
    address: 'حي الوعر، حمص',
    joinDate: '2024-01-10',
    totalLessons: 24,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80'
  },
  {
    id: 2,
    name: 'فاطمة أحمد خليل',
    email: 'fatima.student@email.com',
    phone: '+963 944 234 567',
    grade: 3,
    parentName: 'أحمد خليل',
    parentPhone: '+963 944 234 568',
    address: 'حي الخالدية، حمص',
    joinDate: '2024-01-15',
    totalLessons: 18,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1494790108755-2616c96de2ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80'
  },
  {
    id: 3,
    name: 'خالد يوسف النجار',
    email: 'khaled.student@email.com',
    phone: '+963 944 345 678',
    grade: 7,
    parentName: 'يوسف النجار',
    parentPhone: '+963 944 345 679',
    address: 'حي النزهة، حمص',
    joinDate: '2024-02-01',
    totalLessons: 31,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80'
  },
  {
    id: 4,
    name: 'سارة محمود الخطيب',
    email: 'sara.student@email.com',
    phone: '+963 944 456 789',
    grade: 9,
    parentName: 'محمود الخطيب',
    parentPhone: '+963 944 456 790',
    address: 'حي الإنشاءات، حمص',
    joinDate: '2024-01-25',
    totalLessons: 42,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80'
  },
  {
    id: 5,
    name: 'علي حسن التركماني',
    email: 'ali.student@email.com',
    phone: '+963 944 567 890',
    grade: 2,
    parentName: 'حسن التركماني',
    parentPhone: '+963 944 567 891',
    address: 'حي باب السباع، حمص',
    joinDate: '2024-02-10',
    totalLessons: 15,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80'
  }
];

// All bookings data
export const allBookings = [
  {
    id: 1,
    studentName: 'أحمد محمد علي',
    studentImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    teacherName: 'أ. محمد أحمد السعيد',
    teacherImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    subject: 'الرياضيات',
    grade: 5,
    date: '2024-06-20',
    time: '10:00',
    duration: 60,
    price: 25000,
    status: 'confirmed',
    bookingDate: '2024-06-18'
  },
  {
    id: 2,
    studentName: 'فاطمة أحمد خليل',
    studentImage: 'https://images.unsplash.com/photo-1494790108755-2616c96de2ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    teacherName: 'أ. فاطمة خالد النور',
    teacherImage: 'https://images.unsplash.com/photo-1494790108755-2616c96de2ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    subject: 'اللغة العربية',
    grade: 3,
    date: '2024-06-21',
    time: '14:00',
    duration: 60,
    price: 22000,
    status: 'cancelled',
    bookingDate: '2024-06-19'
  },
  {
    id: 3,
    studentName: 'خالد يوسف النجار',
    studentImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    teacherName: 'أ. أحمد علي الشام',
    teacherImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    subject: 'العلوم',
    grade: 7,
    date: '2024-06-22',
    time: '16:00',
    duration: 90,
    price: 30000,
    status: 'confirmed',
    bookingDate: '2024-06-19'
  },
  {
    id: 4,
    studentName: 'سارة محمود الخطيب',
    studentImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    teacherName: 'أ. سارة محمود القادري',
    teacherImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    subject: 'اللغة الإنجليزية',
    grade: 9,
    date: '2024-06-23',
    time: '11:00',
    duration: 60,
    price: 28000,
    status: 'completed',
    bookingDate: '2024-06-17'
  }
];

export const subjects = [
  { key: 'all', name: 'جميع المواد' },
  { key: 'math', name: 'الرياضيات' },
  { key: 'arabic', name: 'اللغة العربية' },
  { key: 'science', name: 'العلوم' },
  { key: 'english', name: 'اللغة الإنجليزية' },
  { key: 'history', name: 'التاريخ' },
  { key: 'geography', name: 'الجغرافيا' }
];

export const grades = [
  { value: 'all', name: 'جميع الصفوف' },
  { value: '1', name: 'الصف الأول' },
  { value: '2', name: 'الصف الثاني' },
  { value: '3', name: 'الصف الثالث' },
  { value: '4', name: 'الصف الرابع' },
  { value: '5', name: 'الصف الخامس' },
  { value: '6', name: 'الصف السادس' },
  { value: '7', name: 'الصف السابع' },
  { value: '8', name: 'الصف الثامن' },
  { value: '9', name: 'الصف التاسع' }
];