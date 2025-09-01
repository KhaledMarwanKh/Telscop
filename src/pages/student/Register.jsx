import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';
import RenderStep1 from '../../components/students components/Register/RenderStep1';
import RenderStep3 from '../../components/students components/Register/RenderStep3';
import RenderStep2 from '../../components/students components/Register/RenderStep2';
import api from '../../lib/api';
import { getGeoLocation } from '../../data/assests';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    address: {
      city: "",
      street: "",
      region: ''
    },
    location: {
      coordinates: []
    },
    Class: "",
    gender: "",
    phone: "",
    birthDate: '',
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sendImage, setSendImage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    setSendImage(file);
  };

  const handleAddressChange = ({ target: { value, name } }) => {
    setFormData((prev) => (
      {
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }
    ))
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          toast.error('يرجى إدخال الاسم الكامل');
          return false;
        }
        if (!formData.email.trim()) {
          toast.error('يرجى إدخال البريد الإلكتروني');
          return false;
        }
        if (!formData.phone.trim()) {
          toast.error('يرجى إدخال رقم الهاتف');
          return false;
        }
        return true;
      case 2:
        if (!formData.birthDate) {
          toast.error('يرجى إدخال تاريخ الميلاد');
          return false;
        }
        if (!formData.gender) {
          toast.error('يرجى اختيار الجنس');
          return false;
        }
        if (!formData.Class) {
          toast.error('يرجى اختيار الصف');
          return false;
        }
        if (formData.address.city === '' || formData.address.region === '' || formData.address.street === '') {
          toast.error("يرجى اختيار المنطقة والمحافظة");
          return false;
        }
        return true;
      case 3:
        if (formData.password.length < 6) {
          toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
          return false;
        }
        if (formData.password !== formData.passwordConfirm) {
          toast.error('كلمة المرور وتأكيد كلمة المرور غير متطابقتين');
          return false;
        }
        if (!formData.agreeToTerms) {
          toast.error('يرجى الموافقة على شروط الخدمة وسياسة الخصوصية');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const resetInput = () => {
    setCurrentStep(1);
    setIsLoading(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      address: {
        city: "",
        street: "",
        region: ''
      },
      location: {
        coordinates: []
      },
      Class: "",
      gender: "",
      phone: "",
      birthDate: '',
      agreeToTerms: false
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) {
      return;
    }

    const location = {
      type: "Point",
      coordinates: []
    };

    const geo = await getGeoLocation();

    formData.location.coordinates = geo;

    formData.Class = parseInt(formData.Class);

    setIsLoading(true);

    try {

      const responseData = await (await api.post("/api/user/register", formData)).data;

      if (!responseData) {
        toast.error("حدث خطا ما");
        resetInput();
      }

      if (responseData.status === "success") {
        localStorage.setItem("userToken", responseData.token);
        toast.success("تم انشاء الحساب بنجاح");
        if (sendImage) {
          const { userToken } = localStorage;

          const formData = new FormData();

          formData.append("image", sendImage);

          if (userToken) {
            const sendImageRequest = await (await api.post(
              "/api/user/update-Profile"
              , formData
              , {
                headers: {
                  "Content-Type": "multipart/form-data",
                  authorization: `Bearer ${userToken}`
                }
              }
            )).data

            if (sendImageRequest.status === "success") {
              toast.success("تم رفع صورة بنجاح");
            }
          }
        }
        navigate('/');
      }

    } catch (e) {
      toast.error(e.message);
      resetInput();
    }

  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;

    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) strength++;

    return strength;
  };

  useEffect(() => {
     if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    ({ coords: { latitude, longitude } }) => {
                      setFormData(prev => ({
                        ...prev,
                        location:{
                          coordinates:[longitude,latitude]
                        }
                      }))
                    },
                    (error) => {
                        console.log(error);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 1000000
                    }
                );
       }
  }, []);


  const stepTitles = [
    'المعلومات الأساسية',
    'البيانات الشخصية',
    'إعدادات الأمان'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-8">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-32 left-32 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-60 right-32 w-80 h-80 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-16 left-48 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/5 left-1/5 animate-float">
            <div className="text-4xl opacity-15">✨</div>
          </div>
          <div className="absolute top-4/5 left-1/4 animate-float-delayed">
            <div className="text-3xl opacity-15">🎯</div>
          </div>
          <div className="absolute top-2/5 right-1/5 animate-float-slow">
            <div className="text-4xl opacity-15">🚀</div>
          </div>
          <div className="absolute top-1/3 right-2/5 animate-float">
            <div className="text-3xl opacity-15">💡</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-lg w-full mx-4">
        {/* Main Card */}
        <div className="bg-white/85 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 overflow-hidden card-enhanced">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-secondary to-green-600 p-8 text-white text-center">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <Link to="/" className="inline-flex items-center justify-center space-x-3 space-x-reverse mb-4">
                <span className="text-3xl animate-bounce">🔭</span>
                <span className="text-2xl font-bold">تلسكوب</span>
              </Link>
              <h2 className="text-xl font-bold mb-2">انضم إلى عائلة تلسكوب</h2>
              <p className="text-green-100 text-sm">ابدأ رحلتك التعليمية معنا</p>

              {/* Step Indicator */}
              <div className="flex justify-center space-x-4 space-x-reverse mt-6">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step === currentStep ? 'bg-white text-secondary' :
                      step < currentStep ? 'bg-green-400 text-white' : 'bg-white/30 text-white/70'
                      }`}>
                      {step < currentStep ? <FiCheck className="w-4 h-4" /> : step}
                    </div>
                    {step < 3 && (
                      <div className={`w-8 h-1 mx-2 rounded transition-all duration-300 ${step < currentStep ? 'bg-green-400' : 'bg-white/30'
                        }`}></div>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-xs text-green-100 mt-3">{stepTitles[currentStep - 1]}</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && <RenderStep1 formData={formData} handleInputChange={handleInputChange} />}
              {currentStep === 2 && <RenderStep2 formData={formData} handleAddressChange={handleAddressChange} handleInputChange={handleInputChange} calculateAge={calculateAge} />}
              {currentStep === 3 && <RenderStep3 formData={formData} handleInputChange={handleInputChange} handleFileUpload={handleFileUpload} getPasswordStrength={getPasswordStrength} setShowConfirmPassword={setShowConfirmPassword} setShowPassword={setShowPassword} showPassword={showPassword} showConfirmPassword={showConfirmPassword} />}

              {/* Navigation Buttons */}
              <div className="mt-8 flex gap-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-3 px-6 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
                  >
                    السابق
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-secondary to-green-600 text-white rounded-xl hover:from-green-600 hover:to-secondary transition-all duration-300 font-bold transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <span>التالي</span>
                      <FiArrowLeft className="w-5 h-5" />
                    </div>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl ${isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-secondary to-green-600 hover:from-green-600 hover:to-secondary'
                      }`}
                  >
                    <div className="flex items-center justify-center space-x-3 space-x-reverse">
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>جاري إنشاء الحساب...</span>
                        </>
                      ) : (
                        <>
                          <span>إنشاء الحساب</span>
                          <FiCheck className="w-5 h-5" />
                        </>
                      )}
                    </div>
                  </button>
                )}
              </div>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                لديك حساب بالفعل؟{' '}
                <Link
                  to="/login"
                  className="font-bold text-secondary hover:text-green-700 transition-colors hover:underline"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


export default Register;