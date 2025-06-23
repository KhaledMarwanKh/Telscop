import { useEffect, useState } from 'react';
import {
  FiEdit2, FiSave, 
} from 'react-icons/fi';
import { mockTeacherProfile } from '../../data/teacherMockData';
import { toast } from 'react-toastify';
import RenderPersonalInfo from '../../components/teacher component/Profile/RenderPersonalInfo';
import RenderProfissionalInfo from '../../components/teacher component/Profile/RenderProfissionalInfo';
import RenderSchedule from '../../components/teacher component/Profile/RenderSchedule';
import Header from '../../components/teacher component/Profile/Header';
import StatisBar from '../../components/teacher component/Profile/StatisBar';

const TeacherProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [activeTab, setActiveTab] = useState('personal');

  const [formData, setFormData] = useState({
    name:""
  });

  const [profileImage, setProfileImage] = useState(mockTeacherProfile.image);

  const [statis,setStatis] =  useState({})

  useEffect(()=>{
    setFormData(mockTeacherProfile)
  },[])

  useEffect(()=>{
    if (localStorage.getItem('activeTab')){
      setActiveTab("schedule");
      setIsEditing(true);
      localStorage.clear();
    }
  },[])

  useEffect(()=>{
    setStatis(mockTeacherProfile.stats)
  },[statis])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGradeChange = (gradeValue) => {
    setFormData(prev => ({
      ...prev,
      grades: prev.grades.includes(gradeValue)
        ? prev.grades.filter(g => g !== gradeValue)
        : [...prev.grades, gradeValue]
    }));
  };

  const handleAvailabilityChange = (day, slot) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.map(daySchedule =>
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('تم حفظ التغييرات بنجاح!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: mockTeacherProfile.name,
      email: mockTeacherProfile.email,
      phone: mockTeacherProfile.phone,
      birthDate: mockTeacherProfile.birthDate,
      gender: mockTeacherProfile.gender,
      address: mockTeacherProfile.address,
      subject: mockTeacherProfile.subject,
      grades: mockTeacherProfile.grades,
      experience: mockTeacherProfile.experience,
      price: mockTeacherProfile.price,
      qualification: mockTeacherProfile.qualification,
      bio: mockTeacherProfile.bio,
      availability: mockTeacherProfile.availability
    });
    setProfileImage(mockTeacherProfile.image);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">الملف الشخصي</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 space-x-reverse"
              >
                <FiEdit2 className="w-4 h-4" />
                <span>تعديل</span>
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 space-x-reverse"
                >
                  <FiSave className="w-4 h-4" />
                  <span>حفظ</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Tabs */}
            <div className="border-b mb-8">
              <nav className="flex space-x-8 space-x-reverse">
                <button
                  type="button"
                  onClick={() => setActiveTab('personal')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'personal'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  المعلومات الشخصية
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('professional')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'professional'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  المعلومات الأكاديمية
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('schedule')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'schedule'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  الأوقات المتاحة
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'personal' && <RenderPersonalInfo
              handleImageChange={handleImageChange}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              formData={formData}
              profileImage={profileImage}
            />}
            {activeTab === 'professional' && <RenderProfissionalInfo
              handleGradeChange={handleGradeChange}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
              formData={formData}
            />}
            {activeTab === 'schedule' && <RenderSchedule
              handleAvailabilityChange={handleAvailabilityChange}
              isEditing={isEditing}
              formData={formData}
            />}
          </form>

          {/* Statistics */}
          {!isEditing && (
            <StatisBar teacherStat={statis} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;