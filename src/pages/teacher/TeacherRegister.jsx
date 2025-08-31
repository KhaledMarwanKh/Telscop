import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiCheck, FiBookOpen, FiUpload, FiClock, FiAward, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import RenderStep1 from '../../components/teacher component/Register/RenderStep1';
import RenderStep2 from '../../components/teacher component/Register/RenderStep2';
import RenderStep3 from '../../components/teacher component/Register/RenderStep3';
import RenderStep4 from '../../components/teacher component/Register/RenderStep4';
import { formatDate, getGeoLocation } from '../../data/assests';
import api from '../../lib/api';

const TeacherRegister = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    about: '',
    location: {
      coordinates: []
    },
    phone: '',
    slots_booked: {},
    availableTimes: [
    ],
    Class: [],
    degree: '',
    experience: 0,
    subject: '',
    gender: '',
    address: {
      city: "",
      region: "",
      street: ""
    },
    birthDate: '',
    price: 0,
    image: null,
    password: '',
    passwordConfirm: '',
    certificates: []
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.alert("قم بتشغيل الموقع من فضلك لتخزين موقعك الجغرافي");
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'experience' ? parseInt(value) : (name === "price") ? parseInt(value) : value
    }));
  };

  const handleGradeChange = (gradeValue) => {
    setFormData(prev => ({
      ...prev,
      Class: prev.Class.includes(gradeValue)
        ? prev.Class.filter(g => g !== gradeValue)
        : [...prev.Class, gradeValue]
    }));
  };

  const handleAvailabilityChange = (day, slot) => {
    console.log(day)
    if (!formData.availableTimes.map(e => e.day).includes(day)) {
      console.log(formData.availableTimes)
      setFormData((prev) => ({
        ...prev,
        availableTimes: [
          ...prev.availableTimes,
          { day, slots: [slot] }
        ]
      }))

      return;
    }

    setFormData(prev => ({
      ...prev,
      availableTimes: prev.availableTimes.map(daySchedule =>
        daySchedule.day === day
          ? {
            ...daySchedule,
            slots: daySchedule.slots.includes(slot)
              ? daySchedule.slots.filter(s => s !== slot)
              : [...daySchedule.slots, slot]
          }
          : daySchedule
      )
    }));
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    console.log(files, e.target.name)
    setFormData(prev => ({
      ...prev,
      image: (e.target.name === 'image') ? files[0] : prev.image,
      certificates: (e.target.name === 'certifications') ? files : prev.certificates
    }));
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
        if (!formData.birthDate) {
          toast.error('يرجى إدخال تاريخ الميلاد');
          return false;
        }
        if (!formData.gender) {
          toast.error('يرجى اختيار الجنس');
          return false;
        }

        if (formData.address.city === '' || formData.address.region === '') {
          toast.error("يرجى اختيار المنطقة والمحافظة");
          return false;
        }

        return true;
      case 2:
        if (!formData.subject) {
          toast.error('يرجى اختيار المادة التي تدرسها');
          return false;
        }
        if (formData.Class.length === 0) {
          toast.error('يرجى اختيار الصفوف التي تدرس لها');
          return false;
        }
        if (!formData.experience) {
          toast.error('يرجى إدخال سنوات الخبرة');
          return false;
        }
        if (!formData.degree.trim()) {
          toast.error('يرجى إدخال المؤهل العلمي');
          return false;
        }
        if (!formData.price) {
          toast.error('يرجى تحديد تكلفة الجلسة');
          return false;
        }
        return true;
      case 3:
        // const hasAvailability = Object.values(formData.availableTimes).some(slots => slots.length > 0);
        // if (!hasAvailability) {
        //   toast.error('يرجى تحديد الأوقات المتاحة للتدريس');
        //   return false;
        // }
        return true;
      case 4:
        if (!formData.certificates || formData.certificates.length === 0) {
          toast.error('يرجى رفع الوثائق المطلوبة');
          return false;
        }
        if (formData.password.length < 6) {
          toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
          return false;
        }
        if (formData.password !== formData.passwordConfirm) {
          toast.error('كلمة المرور وتأكيد كلمة المرور غير متطابقتين');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(4)) {
      return;
    }

    const geo = await getGeoLocation();

    formData.location.coordinates = geo;

    setIsLoading(true);

    try {
      const sendFormData = new FormData();

      sendFormData.append("name", formData.name);
      sendFormData.append("email", formData.email);
      sendFormData.append("phone", formData.phone);
      sendFormData.append("gender", formData.gender);
      sendFormData.append("birthDate", formData.birthDate);
      sendFormData.append("address", JSON.stringify(formData.address));
      sendFormData.append("subject", formData.subject);
      sendFormData.append("price", formData.price);
      sendFormData.append("Class", JSON.stringify(formData.Class));
      sendFormData.append("experience", formData.experience);
      sendFormData.append("about", formData.about);
      sendFormData.append("degree", formData.degree);
      sendFormData.append("availableTimes", JSON.stringify(formData.availableTimes));
      sendFormData.append("image", formData.image);

      for (let i of formData.certificates) {
        sendFormData.append("certificates", i);
      }

      sendFormData.append("password", formData.password);
      sendFormData.append("passwordConfirm", formData.passwordConfirm);
      sendFormData.append("location", JSON.stringify(formData.location));

      console.log(formData.location.coordinates);
      console.log(sendFormData);

      const signupRequest = await (await api.post(
        "/api/teacher/signup-teacher"
        , sendFormData
        , {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          timeout: 100000
        }
      )).data;

      if (signupRequest.success) {
        toast.success("تم ارسال بيانات الحساب. بانتظار موافقة");
        navigate("/");
      }

    } catch (error) {
      toast.error(error.message);
    }

    setIsLoading(false);

  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
  }

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

  const stepTitles = [
    'المعلومات الشخصية',
    'المعلومات الأكاديمية',
    'الأوقات المتاحة',
    'الوثائق والأمان'
  ];

  const stepIcons = [
    <FiUser key="1" className="w-5 h-5" />,
    <FiAward key="2" className="w-5 h-5" />,
    <FiClock key="3" className="w-5 h-5" />,
    <FiUpload key="4" className="w-5 h-5" />
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-8">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-32 left-32 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-60 right-32 w-80 h-80 bg-green-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-16 left-48 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/5 left-1/5 animate-float">
            <div className="text-4xl opacity-15">📚</div>
          </div>
          <div className="absolute top-4/5 left-1/4 animate-float-delayed">
            <div className="text-3xl opacity-15">🎯</div>
          </div>
          <div className="absolute top-2/5 right-1/5 animate-float-slow">
            <div className="text-4xl opacity-15">🏆</div>
          </div>
          <div className="absolute top-1/3 right-2/5 animate-float">
            <div className="text-3xl opacity-15">📝</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-4">
        {/* Main Card */}
        <div className="bg-white/85 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 overflow-hidden card-enhanced">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-emerald-600 to-green-700 p-8 text-white text-center">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <Link to="/" className="inline-flex items-center justify-center space-x-3 space-x-reverse mb-4">
                <span className="text-3xl animate-bounce">🔭</span>
                <span className="text-2xl font-bold">تلسكوب</span>
              </Link>
              <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
                <FiBookOpen className="w-6 h-6" />
                <h2 className="text-xl font-bold">انضم لفريق المعلمين</h2>
              </div>
              <p className="text-emerald-100 text-sm">شارك خبرتك وساعد الطلاب على تحقيق أحلامهم</p>

              {/* Step Indicator */}
              <div className="flex justify-center space-x-2 space-x-reverse mt-6">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step === currentStep ? 'bg-white text-emerald-600' :
                      step < currentStep ? 'bg-emerald-400 text-white' : 'bg-white/30 text-white/70'
                      }`}>
                      {step < currentStep ? <FiCheck className="w-5 h-5" /> : stepIcons[step - 1]}
                    </div>
                    {step < 4 && (
                      <div className={`w-8 h-1 mx-1 rounded transition-all duration-300 ${step < currentStep ? 'bg-emerald-400' : 'bg-white/30'
                        }`}></div>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-xs text-emerald-100 mt-3">{stepTitles[currentStep - 1]}</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && <RenderStep1
                handleInputChange={handleInputChange}
                formData={formData}
                calculateAge={calculateAge}
                handleAddressChange={handleAddressChange}
              />}
              {currentStep === 2 && <RenderStep2
                handleGradeChange={handleGradeChange}
                handleInputChange={handleInputChange}
                formData={formData}

              />}
              {currentStep === 3 && <RenderStep3
                handleAvailabilityChange={handleAvailabilityChange}
                formData={formData}
              />}
              {currentStep === 4 && <RenderStep4
                handleFileUpload={handleFileUpload}
                setShowConfirmPassword={setShowConfirmPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                showPassword={showPassword}
                formData={formData}
                getPasswordStrength={getPasswordStrength}
                handleInputChange={handleInputChange}
              />}

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

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-emerald-600 transition-all duration-300 font-bold transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
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
                      : 'bg-gradient-to-r from-emerald-600 to-green-700 hover:from-green-700 hover:to-emerald-600'
                      }`}
                  >
                    <div className="flex items-center justify-center space-x-3 space-x-reverse">
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>جاري إرسال الطلب...</span>
                        </>
                      ) : (
                        <>
                          <span>إرسال الطلب</span>
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
                لديك حساب معلم بالفعل؟{' '}
                <Link
                  to="/teacher/login"
                  className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors hover:underline"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50/50 px-8 py-6 border-t border-gray-100">
            <div className="text-center space-x-4 space-x-reverse">
              <Link
                to="/register"
                className="text-sm text-gray-600 hover:text-emerald-600 transition-colors font-medium"
              >
                تسجيل طالب
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegister;