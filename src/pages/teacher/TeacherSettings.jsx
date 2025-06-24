import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUser, FiLock, FiBell, FiEye, FiMail, FiPhone,
  FiSave, FiHome, FiLogOut, FiBookOpen, FiShield, FiCreditCard,
  FiToggleLeft, FiToggleRight, FiChevronRight
} from 'react-icons/fi';
import { mockTeacherProfile } from '../../data/teacherMockData';
import { toast } from 'react-toastify';

const TeacherSettings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [settings, setSettings] = useState({
    // Account Settings
    profileVisibility: true,
    showPhone: true,
    showEmail: false,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    newBookingNotification: true,
    reminderNotification: true,
    cancelationNotification: true,
    
    // Privacy Settings
    allowStudentReviews: true,
    showStatistics: false,
    autoAcceptBookings: false,
    
    // Payment Settings
    autoWithdraw: false,
    withdrawalThreshold: 500000
  });

  const teacher = mockTeacherProfile;

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = () => {
    toast.success('تم حفظ الإعدادات بنجاح!');
  };

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiEye className="w-5 h-5 ml-3 text-emerald-600" />
          إعدادات الخصوصية
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">إظهار الملف الشخصي</h4>
              <p className="text-sm text-gray-600">السماح للطلاب برؤية ملفك الشخصي</p>
            </div>
            <button
              onClick={() => handleToggle('profileVisibility')}
              className={`p-1 transition-colors ${settings.profileVisibility ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              {settings.profileVisibility ? <FiToggleRight className="w-8 h-8" /> : <FiToggleLeft className="w-8 h-8" />}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">إظهار رقم الهاتف</h4>
              <p className="text-sm text-gray-600">عرض رقم هاتفك للطلاب المحتملين</p>
            </div>
            <button
              onClick={() => handleToggle('showPhone')}
              className={`p-1 transition-colors ${settings.showPhone ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              {settings.showPhone ? <FiToggleRight className="w-8 h-8" /> : <FiToggleLeft className="w-8 h-8" />}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">إظهار البريد الإلكتروني</h4>
              <p className="text-sm text-gray-600">عرض بريدك الإلكتروني في الملف الشخصي</p>
            </div>
            <button
              onClick={() => handleToggle('showEmail')}
              className={`p-1 transition-colors ${settings.showEmail ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              {settings.showEmail ? <FiToggleRight className="w-8 h-8" /> : <FiToggleLeft className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiShield className="w-5 h-5 ml-3 text-emerald-600" />
          إعدادات الأمان
        </h3>
        
        <div className="space-y-4">
          <Link
            to="/teacher/change-password"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <FiLock className="w-5 h-5 text-gray-500" />
              <div>
                <h4 className="font-medium text-gray-800">تغيير كلمة المرور</h4>
                <p className="text-sm text-gray-600">تحديث كلمة المرور الخاصة بك</p>
              </div>
            </div>
            <FiChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiMail className="w-5 h-5 ml-3 text-emerald-600" />
          إشعارات البريد الإلكتروني
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">الإشعارات العامة</h4>
              <p className="text-sm text-gray-600">تلقي إشعارات البريد الإلكتروني</p>
            </div>
            <button
              onClick={() => handleToggle('emailNotifications')}
              className={`p-1 transition-colors ${settings.emailNotifications ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              {settings.emailNotifications ? <FiToggleRight className="w-8 h-8" /> : <FiToggleLeft className="w-8 h-8" />}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">طلبات الحجز الجديدة</h4>
              <p className="text-sm text-gray-600">إشعار عند وصول طلب حجز جديد</p>
            </div>
            <button
              onClick={() => handleToggle('newBookingNotification')}
              className={`p-1 transition-colors ${settings.newBookingNotification ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              {settings.newBookingNotification ? <FiToggleRight className="w-8 h-8" /> : <FiToggleLeft className="w-8 h-8" />}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">تذكيرات الدروس</h4>
              <p className="text-sm text-gray-600">تذكير بالدروس القادمة</p>
            </div>
            <button
              onClick={() => handleToggle('reminderNotification')}
              className={`p-1 transition-colors ${settings.reminderNotification ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              {settings.reminderNotification ? <FiToggleRight className="w-8 h-8" /> : <FiToggleLeft className="w-8 h-8" />}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">إلغاء الحجوزات</h4>
              <p className="text-sm text-gray-600">إشعار عند إلغاء الطلاب للحجوزات</p>
            </div>
            <button
              onClick={() => handleToggle('cancelationNotification')}
              className={`p-1 transition-colors ${settings.cancelationNotification ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              {settings.cancelationNotification ? <FiToggleRight className="w-8 h-8" /> : <FiToggleLeft className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiPhone className="w-5 h-5 ml-3 text-emerald-600" />
          الرسائل النصية
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">إشعارات SMS</h4>
              <p className="text-sm text-gray-600">تلقي رسائل نصية للأحداث المهمة</p>
            </div>
            <button
              onClick={() => handleToggle('smsNotifications')}
              className={`p-1 transition-colors ${settings.smsNotifications ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              {settings.smsNotifications ? <FiToggleRight className="w-8 h-8" /> : <FiToggleLeft className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookingSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiBell className="w-5 h-5 ml-3 text-emerald-600" />
          إعدادات الحجوزات
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">قبول الحجوزات تلقائياً</h4>
              <p className="text-sm text-gray-600">قبول طلبات الحجز دون مراجعة يدوية</p>
            </div>
            <button
              onClick={() => handleToggle('autoAcceptBookings')}
              className={`p-1 transition-colors ${settings.autoAcceptBookings ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              {settings.autoAcceptBookings ? <FiToggleRight className="w-8 h-8" /> : <FiToggleLeft className="w-8 h-8" />}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">السماح بالتقييمات</h4>
              <p className="text-sm text-gray-600">السماح للطلاب بكتابة تقييمات</p>
            </div>
            <button
              onClick={() => handleToggle('allowStudentReviews')}
              className={`p-1 transition-colors ${settings.allowStudentReviews ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              {settings.allowStudentReviews ? <FiToggleRight className="w-8 h-8" /> : <FiToggleLeft className="w-8 h-8" />}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">إظهار الإحصائيات</h4>
              <p className="text-sm text-gray-600">عرض إحصائياتك للطلاب</p>
            </div>
            <button
              onClick={() => handleToggle('showStatistics')}
              className={`p-1 transition-colors ${settings.showStatistics ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              {settings.showStatistics ? <FiToggleRight className="w-8 h-8" /> : <FiToggleLeft className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiCreditCard className="w-5 h-5 ml-3 text-emerald-600" />
          إعدادات المدفوعات
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">السحب التلقائي</h4>
              <p className="text-sm text-gray-600">سحب الأرباح تلقائياً عند الوصول للحد الأدنى</p>
            </div>
            <button
              onClick={() => handleToggle('autoWithdraw')}
              className={`p-1 transition-colors ${settings.autoWithdraw ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              {settings.autoWithdraw ? <FiToggleRight className="w-8 h-8" /> : <FiToggleLeft className="w-8 h-8" />}
            </button>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الحد الأدنى للسحب (ليرة سورية)
            </label>
            <input
              type="number"
              value={settings.withdrawalThreshold}
              onChange={(e) => setSettings(prev => ({ ...prev, withdrawalThreshold: parseInt(e.target.value) }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              min="100000"
              step="50000"
            />
            <p className="text-xs text-gray-500 mt-2">الحد الأدنى: 100,000 ليرة سورية</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">معلومات الحساب البنكي</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم البنك
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="البنك التجاري السوري"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم الحساب
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="123456789"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم صاحب الحساب
            </label>
            <input
              type="text"
              defaultValue={teacher.name}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              فرع البنك
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="فرع حمص الرئيسي"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const menuItems = [
    { id: 'account', label: 'الحساب والخصوصية', icon: FiUser },
    { id: 'notifications', label: 'الإشعارات', icon: FiBell },
    { id: 'bookings', label: 'إعدادات الحجوزات', icon: FiBookOpen },
    { id: 'payments', label: 'المدفوعات', icon: FiCreditCard }
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
                <FiBookOpen className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700 font-medium">الإعدادات</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6">الإعدادات</h2>
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg transition-colors text-right ${
                        activeSection === item.id
                          ? 'bg-emerald-50 text-emerald-600 border-r-2 border-emerald-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === 'account' && renderAccountSettings()}
            {activeSection === 'notifications' && renderNotificationSettings()}
            {activeSection === 'bookings' && renderBookingSettings()}
            {activeSection === 'payments' && renderPaymentSettings()}

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 space-x-reverse"
              >
                <FiSave className="w-5 h-5" />
                <span>حفظ التغييرات</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettings;