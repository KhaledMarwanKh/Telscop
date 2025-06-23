import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiStar, FiShield } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      toast.success('مرحباً بك في لوحة تحكم الإدارة!');
      setIsLoading(false);
      navigate('/admin/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 animate-float">
            <div className="text-4xl opacity-20">👑</div>
          </div>
          <div className="absolute top-3/4 left-1/3 animate-float-delayed">
            <div className="text-3xl opacity-20">⚙️</div>
          </div>
          <div className="absolute top-1/2 right-1/4 animate-float-slow">
            <div className="text-5xl opacity-20">🛡️</div>
          </div>
          <div className="absolute top-1/3 right-1/3 animate-float">
            <div className="text-3xl opacity-20">📊</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 overflow-hidden card-enhanced">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <Link to="/" className="inline-flex items-center justify-center space-x-3 space-x-reverse mb-6">
                <span className="text-4xl animate-bounce">🔭</span>
                <span className="text-3xl font-bold">تلسكوب</span>
              </Link>
              <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
                <FiShield className="w-6 h-6" />
                <h2 className="text-2xl font-bold">لوحة تحكم الإدارة</h2>
              </div>
              <p className="text-blue-100 text-sm">دخول المديرين والمشرفين</p>
              
              {/* Decorative Stars */}
              <div className="absolute top-4 right-4">
                <FiStar className="w-4 h-4 text-white/30 animate-pulse" />
              </div>
              <div className="absolute top-8 left-8">
                <FiStar className="w-3 h-3 text-white/40 animate-pulse animation-delay-1000" />
              </div>
              <div className="absolute bottom-6 right-12">
                <FiStar className="w-5 h-5 text-white/20 animate-pulse animation-delay-2000" />
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white placeholder:text-gray-400"
                      placeholder="أدخل بريدك الإلكتروني"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white placeholder:text-gray-400"
                      placeholder="أدخل كلمة المرور"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 left-0 pl-4 flex items-center hover:text-blue-600 transition-colors"
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded transition-colors"
                  />
                  <label className="mr-3 block text-sm text-gray-700 font-medium">
                    تذكرني
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full relative overflow-hidden py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] shadow-lg hover:shadow-xl ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-3 space-x-reverse">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>جاري تسجيل الدخول...</span>
                      </>
                    ) : (
                      <>
                        <span>دخول لوحة التحكم</span>
                        <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;