import physics from './images/physics.png'
import science from './images/science.png'
import maths from './images/maths.png'
import chm from './images/chemistry.png'
import geo from './images/geography.png'
import hist from './images/history.png'
import ar from './images/books.png'
import en from './images/engllish.png'

export const mockTeachers = [
  {
    id: 1,
    name: 'أ. محمد أحمد السعيد',
    subject: 'الرياضيات',
    subjectKey: 'math',
    grades: [1, 2, 3, 4, 5, 6],
    experience: '8 سنوات',
    price: 25000,
    qualification: 'بكالوريوس رياضيات - جامعة دمشق',
    lat: 34.7342,
    lng: 36.7072,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
    phone: '+963 944 123 456',
    address: 'حي الوعر، حمص',
    bio: 'معلم رياضيات مؤهل مع خبرة واسعة في تدريس المرحلة الابتدائية. متخصص في تبسيط المفاهيم الرياضية وجعلها مفهومة للطلاب.',
    rating: 4.8,
    totalSessions: 150
  },
  {
    id: 2,
    name: 'أ. فاطمة محمود الخطيب',
    subject: 'اللغة العربية',
    subjectKey: 'arabic',
    grades: [3, 4, 5, 6, 7, 8],
    experience: '6 سنوات',
    price: 20000,
    qualification: 'بكالوريوس آداب لغة عربية - جامعة حمص',
    lat: 34.7289,
    lng: 36.7125,
    image: 'https://images.unsplash.com/photo-1494790108755-2616c96de2ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
    phone: '+963 944 234 567',
    address: 'حي الخالدية، حمص',
    bio: 'معلمة لغة عربية متميزة تركز على تطوير مهارات القراءة والكتابة والتعبير لدى الطلاب. لديها أسلوب تدريس تفاعلي وممتع.',
    rating: 4.9,
    totalSessions: 120
  },
  {
    id: 3,
    name: 'أ. يوسف خليل النجار',
    subject: 'العلوم',
    subjectKey: 'science',
    grades: [4, 5, 6, 7, 8, 9],
    experience: '10 سنوات',
    price: 22000,
    qualification: 'بكالوريوس كيمياء - جامعة تشرين',
    lat: 34.7298,
    lng: 36.7043,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
    phone: '+963 944 345 678',
    address: 'حي الحميدية، حمص',
    bio: 'معلم علوم خبير يستخدم التجارب العملية والوسائل التعليمية الحديثة لتوضيح المفاهيم العلمية وجعل التعلم أكثر متعة.',
    rating: 4.7,
    totalSessions: 200
  },
  {
    id: 4,
    name: 'أ. سارة أحمد القاسم',
    subject: 'اللغة الإنجليزية',
    subjectKey: 'english',
    grades: [1, 2, 3, 4, 5],
    experience: '5 سنوات',
    price: 18000,
    qualification: 'بكالوريوس آداب إنجليزي - جامعة حلب',
    lat: 34.7356,
    lng: 36.7089,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
    phone: '+963 944 456 789',
    address: 'حي الزهراء، حمص',
    bio: 'معلمة لغة إنجليزية شابة ومتحمسة تستخدم الألعاب والأنشطة التفاعلية لتعليم اللغة الإنجليزية بطريقة ممتعة وفعالة.',
    rating: 4.6,
    totalSessions: 85
  },
  {
    id: 5,
    name: 'أ. عمر حسن التركماني',
    subject: 'التاريخ',
    subjectKey: 'history',
    grades: [6, 7, 8, 9],
    experience: '12 سنوات',
    price: 19000,
    qualification: 'ماجستير تاريخ - جامعة دمشق',
    lat: 34.7325,
    lng: 36.7156,
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
    phone: '+963 944 567 890',
    address: 'حي القصور، حمص',
    bio: 'معلم تاريخ ذو خبرة طويلة يجعل التاريخ حياً من خلال القصص والحكايات المشوقة. يركز على ربط الأحداث التاريخية بالواقع المعاصر.',
    rating: 4.8,
    totalSessions: 180
  },
  {
    id: 6,
    name: 'أ. ليلى محمد الشام',
    subject: 'الجغرافيا',
    subjectKey: 'geography',
    grades: [5, 6, 7, 8, 9],
    experience: '7 سنوات',
    price: 17000,
    qualification: 'بكالوريوس جغرافيا - جامعة حمص',
    lat: 34.7371,
    lng: 36.7021,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
    phone: '+963 944 678 901',
    address: 'حي الإنشاءات، حمص',
    bio: 'معلمة جغرافيا متخصصة تستخدم الخرائط والوسائل البصرية لتعليم الجغرافيا. تركز على الجغرافيا التطبيقية والبيئية.',
    rating: 4.5,
    totalSessions: 110
  }
];

export const availableDays = [
  { date: "2025-06-11", day: 'الاربعاء' },
  { date: "2025-06-12", day: 'الخميس' },
  { date: "2025-06-13", day: 'الجمعة' },
  { date: "2025-06-14", day: 'السبت' },
  { date: "2025-06-15", day: 'الاحد' },
  { date: "2025-06-16", day: 'الاثنين' },
  { date: "2025-06-17", day: 'الثلاثاء' },
];

export const subjects = [
  { key: 'arabic', name: 'اللغة العربية', icon: ar },
  { key: 'math', name: 'الرياضيات', icon: maths },
  { key: 'science', name: 'العلوم', icon: science },
  { key: 'english', name: 'اللغة الإنجليزية', icon: en },
  { key: 'history', name: 'التاريخ', icon:hist },
  { key: 'geography', name: 'الجغرافيا', icon:geo },
  { key: 'physics', name: 'الفيزياء', icon: physics },
  { key: 'chemistry', name: 'الكيمياء', icon:chm }
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

export const timeSlots = [
  { value: '10:00', label: '10:00 ص' },
  { value: '11:00', label: '11:00 ص' },
  { value: '12:00', label: '12:00 م' },
  { value: '13:00', label: '1:00 م' },
  { value: '14:00', label: '2:00 م' },
  { value: '15:00', label: '3:00 م' },
  { value: '16:00', label: '4:00 م' },
  { value: '17:00', label: '5:00 م' }
];

export const mockStudent = {
  id: 1,
  name: 'سارة العباس',
  email: 'sara.abaath@email.com',
  phone: '+963 944 123 456',
  birthDate: '2010-05-15',
  gender: 'female',
  grade: '5',
  address: 'حي الوعر، شارع الجامعة، حمص',
  image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
  lat: 34.7312,
  lng: 36.7098
};

export const mockBookings = [
  {
    id: 1,
    teacherId: 1,
    teacherName: 'أ. محمد أحمد السعيد',
    teacherImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    subject: 'الرياضيات',
    date: '2025-06-11',
    time: '14:00',
    price: 25000,
    status: 'upcoming',
    notes: 'درس في الكسور العشرية'
  },
  {
    id: 2,
    teacherId: 2,
    teacherName: 'أ. فاطمة محمود الخطيب',
    teacherImage: 'https://images.unsplash.com/photo-1494790108755-2616c96de2ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    subject: 'اللغة العربية',
    date: '2025-06-12',
    time: '16:00',
    price: 20000,
    status: 'upcoming',
    notes: 'مراجعة قواعد النحو'
  },
  {
    id: 3,
    teacherId: 3,
    teacherName: 'أ. يوسف خليل النجار',
    teacherImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    subject: 'العلوم',
    date: '2025-06-13',
    time: '10:00',
    price: 22000,
    status: 'completed',
    notes: 'تجارب في الكيمياء'
  },
  {
    id: 4,
    teacherId: 4,
    teacherName: 'أ. سارة أحمد القاسم',
    teacherImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80',
    subject: 'اللغة الإنجليزية',
    date: '2025-06-14',
    time: '15:00',
    price: 18000,
    status: 'cancelled',
    notes: 'درس في الأفعال'
  }
];
