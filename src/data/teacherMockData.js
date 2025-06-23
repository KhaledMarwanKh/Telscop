// Mock data for teacher system
import physics from './images/physics.png'
import science from './images/science.png'
import maths from './images/maths.png'
import chm from './images/chemistry.png'
import geo from './images/geography.png'
import hist from './images/history.png'
import ar from './images/books.png'
import en from './images/engllish.png'

export const mockTeacherProfile = {
  id: 1,
  name: 'أ. محمد أحمد السعيد',
  email: 'mohammed.ahmed@email.com',
  phone: '+963 944 123 456',
  birthDate: '1985-03-15',
  gender: 'male',
  address: 'حي الوعر، شارع الجامعة، حمص',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
  lat: 34.7342,
  lng: 36.7072,

  // Professional Information
  subject: 'الرياضيات',
  subjectKey: 'math',
  grades: [1, 2, 3, 4, 5, 6],
  experience: '8 سنوات',
  price: 25000,
  qualification: 'بكالوريوس رياضيات - جامعة دمشق',
  bio: 'معلم رياضيات مؤهل مع خبرة واسعة في تدريس المرحلة الابتدائية. متخصص في تبسيط المفاهيم الرياضية وجعلها مفهومة للطلاب.',
  status: 'activated', // activated, not_activated, suspended

  // Schedule
  availability: [
    { day: 'sunday', slots: ['10:00', '11:00', '14:00', '15:00'] },
    { day: 'monday', slots: ['10:00', '11:00', '12:00', '14:00', '15:00'] },
    { day: 'tuesday', slots: ['11:00', '14:00', '15:00', '16:00'] },
    { day: 'wednesday', slots: ['10:00', '11:00', '14:00', '15:00'] },
    { day: 'thursday', slots: ['10:00', '12:00', '14:00', '16:00'] },
    { day: 'saturday', slots: ['10:00', '11:00', '14:00'] }
  ],

  // Statistics
  stats: {
    totalStudents: 45,
    completedLessons: 152,
    cancelledLessons: 8,
    totalEarnings: 3800000,
    rating: 4.8
  }
};

export const mockTodayLessons = [
  {
    id: 1,
    studentName: 'أحمد محمد علي',
    studentImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    subject: 'الرياضيات',
    grade: '5',
    time: '10:00',
    duration: 60,
    price: 25000,
    status: 'confirmed',
    studentPhone: '+963 944 123 456',
    notes: 'درس في الكسور العشرية'
  },
  {
    id: 2,
    studentName: 'فاطمة أحمد خليل',
    studentImage: 'https://images.unsplash.com/photo-1494790108755-2616c96de2ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    subject: 'الرياضيات',
    grade: '3',
    time: '14:00',
    duration: 60,
    price: 25000,
    status: 'cancelled',
    studentPhone: '+963 944 234 567',
    notes: 'مراجعة جدول الضرب'
  },
  {
    id: 3,
    studentName: 'خالد يوسف النجار',
    studentImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    subject: 'الرياضيات',
    grade: '4',
    time: '15:00',
    duration: 60,
    price: 25000,
    status: 'completed',
    studentPhone: '+963 944 345 678',
    notes: 'درس في القسمة المطولة'
  }
];

export const mockUpcomingLessons = [
  {
    id: 4,
    studentName: 'سارة محمود الخطيب',
    studentImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    subject: 'الرياضيات',
    grade: '6',
    date: '2024-01-16',
    time: '11:00',
    duration: 60,
    price: 25000,
    status: 'confirmed',
    studentPhone: '+963 944 456 789',
    notes: 'درس في الهندسة'
  },
  {
    id: 5,
    studentName: 'علي حسن التركماني',
    studentImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    subject: 'الرياضيات',
    grade: '2',
    date: '2024-01-17',
    time: '10:00',
    duration: 60,
    price: 25000,
    status: 'confirmed',
    studentPhone: '+963 944 567 890',
    notes: 'درس في الجمع والطرح'
  },
  {
    id: 6,
    studentName: 'ليلى أحمد الشام',
    studentImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    subject: 'الرياضيات',
    grade: '5',
    date: '2024-01-18',
    time: '14:00',
    duration: 60,
    price: 25000,
    status: 'cancelled',
    studentPhone: '+963 944 678 901',
    notes: 'مراجعة شاملة'
  }
];

export const daysOfWeek = [
  { key: 'sunday', name: 'الأحد' },
  { key: 'monday', name: 'الاثنين' },
  { key: 'tuesday', name: 'الثلاثاء' },
  { key: 'wednesday', name: 'الأربعاء' },
  { key: 'thursday', name: 'الخميس' },
  { key: 'friday', name: 'الجمعة' },
  { key: 'saturday', name: 'السبت' }
];

export const teacherTimeSlots = [
  { value: '08:00', label: '8:00 ص' },
  { value: '09:00', label: '9:00 ص' },
  { value: '10:00', label: '10:00 ص' },
  { value: '11:00', label: '11:00 ص' },
  { value: '12:00', label: '12:00 م' },
  { value: '13:00', label: '1:00 م' },
  { value: '14:00', label: '2:00 م' },
  { value: '15:00', label: '3:00 م' },
  { value: '16:00', label: '4:00 م' },
  { value: '17:00', label: '5:00 م' },
  { value: '18:00', label: '6:00 م' },
  { value: '19:00', label: '7:00 م' }
];

export const teacherSubjects = [
  { key: 'arabic', name: 'اللغة العربية', icon: ar },
  { key: 'math', name: 'الرياضيات', icon: maths },
  { key: 'science', name: 'العلوم', icon: science },
  { key: 'english', name: 'اللغة الإنجليزية', icon: en },
  { key: 'history', name: 'التاريخ', icon: hist },
  { key: 'geography', name: 'الجغرافيا', icon: geo },
  { key: 'physics', name: 'الفيزياء', icon: physics },
  { key: 'chemistry', name: 'الكيمياء', icon: chm }
];

export const grades = [
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