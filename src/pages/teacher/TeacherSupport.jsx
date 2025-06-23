import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMessageSquare, FiPhone, FiMail, FiBookOpen, FiHelpCircle, 
  FiHome, FiLogOut, FiSend, FiChevronDown, FiChevronRight,
  FiVideo, FiFileText, FiUsers, FiDollarSign, FiSettings,
  FiAlertCircle, FiCheckCircle, FiClock
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const TeacherSupport = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [contactForm, setContactForm] = useState({
    subject: '',
    category: '',
    message: '',
    priority: 'normal'
  });
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast.success('تم إرسال رسالتك بنجاح! سنرد عليك خلال 24 ساعة');
    setContactForm({ subject: '', category: '', message: '', priority: 'normal' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const faqData = [
    {
      id: 1,
      category: 'الحساب والتسجيل',
      question: 'كيف يمكنني تغيير معلومات ملفي الشخصي؟',
      answer: 'يمكنك تعديل معلومات ملفك الشخصي من خلال الذهاب إلى "الملف الشخصي" ثم الضغط على زر "تعديل". يمكنك تحديث الاسم، الصورة، المعلومات الأكاديمية، والأوقات المتاحة.'
    },
    {
      id: 2,
      category: 'الحساب والتسجيل',
      question: 'نسيت كلمة المرور، كيف يمكنني استعادتها؟',
      answer: 'اضغط على "نسيت كلمة المرور" في صفحة تسجيل الدخول، وأدخل بريدك الإلكتروني. ستصلك رسالة لإعادة تعيين كلمة المرور.'
    },
    {
      id: 3,
      category: 'الحجوزات والدروس',
      question: 'كيف أقوم بقبول أو رفض طلبات الحجز؟',
      answer: 'في لوحة التحكم، ستجد طلبات الحجز الجديدة في قسم "الدروس القادمة". يمكنك الضغط على زر "قبول" أو "رفض" بجانب كل طلب.'
    },
    {
      id: 4,
      category: 'الحجوزات والدروس',
      question: 'ماذا أفعل إذا لم يحضر الطالب للدرس؟',
      answer: 'إذا لم يحضر الطالب خلال 15 دقيقة من الموعد المحدد، يمكنك تسجيل غياب الطالب في النظام، وسيتم احتساب الدرس كمكتمل لك.'
    },
    {
      id: 5,
      category: 'المدفوعات',
      question: 'كيف ومتى أستلم أرباحي؟',
      answer: 'يتم تحويل الأرباح أسبوعياً كل يوم أحد إلى حسابك البنكي المسجل. تأكد من تحديث معلومات حسابك البنكي في الإعدادات.'
    },
    {
      id: 6,
      category: 'المدفوعات',
      question: 'ما هي نسبة العمولة التي يأخذها الموقع؟',
      answer: 'نأخذ عمولة 10% من قيمة كل درس مقابل استخدام المنصة وخدمات الدعم والتسويق.'
    },
    {
      id: 7,
      category: 'التقييمات',
      question: 'كيف يمكنني تحسين تقييمي؟',
      answer: 'احرص على الالتزام بالمواعيد، التحضير الجيد للدروس، التواصل الفعال مع الطلاب وأولياء الأمور، واطلب من الطلاب الراضين ترك تقييمات إيجابية.'
    },
    {
      id: 8,
      category: 'المشاكل التقنية',
      question: 'لا أستطيع تسجيل الدخول لحسابي',
      answer: 'تأكد من صحة البريد الإلكتروني وكلمة المرور. إذا استمرت المشكلة، امسح ذاكرة التخزين المؤقت للمتصفح أو جرب متصفحاً آخر.'
    }
  ];

  const supportChannels = [
    {
      icon: FiPhone,
      title: 'المكالمات الهاتفية',
      description: 'للمساعدة الفورية',
      contact: '+963 944 123 456',
      hours: 'الأحد - الخميس: 9:00 ص - 6:00 م',
      color: 'emerald'
    },
    {
      icon: FiMessageSquare,
      title: 'الدردشة المباشرة',
      description: 'دعم سريع أونلاين',
      contact: 'ابدأ المحادثة',
      hours: 'متاح 24/7',
      color: 'blue'
    },
    {
      icon: FiMail,
      title: 'البريد الإلكتروني',
      description: 'للاستفسارات المفصلة',
      contact: 'support@telescope.sy',
      hours: 'رد خلال 24 ساعة',
      color: 'purple'
    }
  ];

  const guides = [
    {
      icon: FiVideo,
      title: 'فيديو: كيفية إنشاء ملف شخصي جذاب',
      duration: '5 دقائق',
      description: 'تعلم كيفية إعداد ملفك الشخصي لجذب المزيد من الطلاب'
    },
    {
      icon: FiFileText,
      title: 'دليل: أفضل ممارسات التدريس عبر الإنترنت',
      duration: '10 دقائق قراءة',
      description: 'نصائح وتقنيات لتحسين جودة دروسك'
    },
    {
      icon: FiUsers,
      title: 'فيديو: التواصل الفعال مع الطلاب وأولياء الأمور',
      duration: '7 دقائق',
      description: 'كيفية بناء علاقات إيجابية مع الطلاب وأسرهم'
    },
    {
      icon: FiDollarSign,
      title: 'دليل: تحسين أرباحك على المنصة',
      duration: '8 دقائق قراءة',
      description: 'استراتيجيات لزيادة عدد الطلاب وتحسين الدخل'
    }
  ];

  const renderFAQ = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-6 border border-emerald-200">
        <h3 className="text-lg font-semibold text-emerald-800 mb-2">الأسئلة الشائعة</h3>
        <p className="text-emerald-700">ستجد هنا إجابات لأكثر الأسئلة شيوعاً من المعلمين</p>
      </div>

      <div className="space-y-4">
        {faqData.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg shadow-sm border">
            <button
              onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
              className="w-full p-6 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 space-x-reverse mb-2">
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                    {faq.category}
                  </span>
                </div>
                <h4 className="font-medium text-gray-800">{faq.question}</h4>
              </div>
              {expandedFaq === faq.id ? (
                <FiChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <FiChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            
            {expandedFaq === faq.id && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed mt-4">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-8">
      {/* Support Channels */}
      <div className="grid md:grid-cols-3 gap-6">
        {supportChannels.map((channel, index) => {
          const Icon = channel.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border text-center">
              <div className={`w-16 h-16 bg-${channel.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`w-8 h-8 text-${channel.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{channel.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{channel.description}</p>
              <p className="font-medium text-gray-800 mb-2">{channel.contact}</p>
              <p className="text-xs text-gray-500">{channel.hours}</p>
            </div>
          );
        })}
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">إرسال رسالة</h3>
          <p className="text-gray-600 text-sm mt-1">سنرد على رسالتك خلال 24 ساعة</p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  موضوع الرسالة *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="اكتب موضوع رسالتك"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الفئة *
                </label>
                <select
                  name="category"
                  value={contactForm.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                >
                  <option value="">اختر الفئة</option>
                  <option value="account">مشاكل الحساب</option>
                  <option value="bookings">الحجوزات والدروس</option>
                  <option value="payments">المدفوعات</option>
                  <option value="technical">مشاكل تقنية</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                مستوى الأولوية
              </label>
              <select
                name="priority"
                value={contactForm.priority}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="low">منخفضة</option>
                <option value="normal">عادية</option>
                <option value="high">عالية</option>
                <option value="urgent">عاجلة</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الرسالة *
              </label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="اكتب رسالتك بالتفصيل..."
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 space-x-reverse"
              >
                <FiSend className="w-5 h-5" />
                <span>إرسال الرسالة</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const renderGuides = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">الأدلة والموارد</h3>
        <p className="text-blue-700">موارد تعليمية لمساعدتك على تحقيق أقصى استفادة من المنصة</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {guides.map((guide, index) => {
          const Icon = guide.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-2">{guide.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{guide.description}</p>
                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-emerald-600">
                    <FiClock className="w-4 h-4" />
                    <span>{guide.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStatus = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">حالة النظام</h3>
          <p className="text-gray-600 text-sm mt-1">الحالة الحالية لخدمات المنصة</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3 space-x-reverse">
              <FiCheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-medium text-gray-800">المنصة الرئيسية</h4>
                <p className="text-sm text-gray-600">تعمل بشكل طبيعي</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">متاحة</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3 space-x-reverse">
              <FiCheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-medium text-gray-800">نظام المدفوعات</h4>
                <p className="text-sm text-gray-600">يعمل بشكل طبيعي</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">متاح</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-3 space-x-reverse">
              <FiAlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <h4 className="font-medium text-gray-800">الإشعارات</h4>
                <p className="text-sm text-gray-600">تأخير طفيف في الإرسال</p>
              </div>
            </div>
            <span className="text-sm text-yellow-600 font-medium">متأثرة</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3 space-x-reverse">
              <FiCheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-medium text-gray-800">الدعم الفني</h4>
                <p className="text-sm text-gray-600">متاح 24/7</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">متاح</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">التحديثات الأخيرة</h3>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-start space-x-3 space-x-reverse">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm text-gray-800 font-medium">تحسينات في أداء المنصة</p>
              <p className="text-xs text-gray-500">منذ 3 ساعات</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 space-x-reverse">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm text-gray-800 font-medium">إضافة ميزة الرسائل المباشرة</p>
              <p className="text-xs text-gray-500">منذ يومين</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 space-x-reverse">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm text-gray-800 font-medium">تحديث نظام التقييمات</p>
              <p className="text-xs text-gray-500">منذ أسبوع</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'faq', label: 'الأسئلة الشائعة', icon: FiHelpCircle },
    { id: 'contact', label: 'اتصل بنا', icon: FiMessageSquare },
    { id: 'guides', label: 'الأدلة والموارد', icon: FiBookOpen },
    { id: 'status', label: 'حالة النظام', icon: FiSettings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 space-x-reverse ml-8">
                <span className="text-2xl">🔭</span>
                <span className="text-xl font-bold text-emerald-600">تلسكوب</span>
              </Link>
              <div className="flex items-center space-x-2 space-x-reverse">
                <FiHelpCircle className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700 font-medium">المساعدة والدعم</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Link
                to="/teacher/dashboard"
                className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium"
              >
                العودة للوحة التحكم
              </Link>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Link
                  to="/"
                  className="p-2 text-gray-500 hover:text-emerald-600 transition-colors"
                  title="الموقع الرئيسي"
                >
                  <FiHome className="w-5 h-5" />
                </Link>
                <Link
                  to="/teacher/login"
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  title="تسجيل الخروج"
                >
                  <FiLogOut className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">مركز المساعدة والدعم</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نحن هنا لمساعدتك! ستجد إجابات لأسئلتك، وإرشادات مفيدة، وطرق للتواصل مع فريق الدعم
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 space-x-reverse bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'faq' && renderFAQ()}
          {activeTab === 'contact' && renderContact()}
          {activeTab === 'guides' && renderGuides()}
          {activeTab === 'status' && renderStatus()}
        </div>
      </div>
    </div>
  );
};

export default TeacherSupport;