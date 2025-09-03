import { useEffect, useState } from 'react';
import {
  FiEdit2, FiSave,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import RenderPersonalInfo from '../../components/teacher component/Profile/RenderPersonalInfo';
import RenderProfissionalInfo from '../../components/teacher component/Profile/RenderProfissionalInfo';
import RenderSchedule from '../../components/teacher component/Profile/RenderSchedule';
import Header from '../../components/teacher component/Profile/Header';
import { useLoaderData } from 'react-router-dom';
import api from '../../lib/api';

const TeacherProfile = () => {
  const teacherInfo = useLoaderData();

  const [isEditing, setIsEditing] = useState(false);

  const [activeTab, setActiveTab] = useState('personal');

  const [formData, setFormData] = useState({
    name: teacherInfo.name,
    email: teacherInfo.email,
    phone: teacherInfo.phone,
    birthDate: teacherInfo.birthDate,
    gender: teacherInfo.gender,
    address: {
      city: teacherInfo.address.city,
      region: teacherInfo.address.region,
      street: teacherInfo.address.street
    },
    subject: teacherInfo.subject,
    Class: teacherInfo.Class,
    experience: teacherInfo.experience,
    price: teacherInfo.price,
    degree: teacherInfo.degree,
    about: teacherInfo.about,
    availableTimes: teacherInfo.availableTimes,
    slots_booked: teacherInfo.slots_booked,
    location: teacherInfo.location,
    image: teacherInfo.image
  });

  const [profileImage, setProfileImage] = useState(teacherInfo.image);

  const [sendImage, setSendImage] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('activeTab')) {
      setActiveTab("schedule");
      setIsEditing(true);
      localStorage.clear();
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'experience' ? parseInt(value) : value
    }));
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

  const handleGradeChange = (gradeValue) => {
    setFormData(prev => ({
      ...prev,
      Class: prev.Class.includes(gradeValue)
        ? prev.Class.filter(g => g !== gradeValue)
        : [...prev.Class, parseInt(gradeValue)]
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setSendImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { teacherToken } = localStorage;

    if (teacherToken) {
      try {
        console.log(formData, "update profile")

        const updateRequest = await (await api.post(
          "/api/teacher/update-Profile"
          , formData
          , {
            headers: {
              authorization: `Bearer ${teacherToken}`
            }
          }
        )).data;

        if (updateRequest.success === true) {
          toast.success("تم تعديل البيانات بنجاح");
        } else {
          toast.error("لقد حدث خطا ما");
          handleCancel();
        }
      } catch (e) {
        toast.error(e.response.data.message);
      }
    }

    try {
      if (sendImage) {
        const formData = new FormData();

        formData.append("image", sendImage);

        const imageUpdateRequest = await (await api.post(
          "/api/teacher/update-Profile"
          , formData
          , {
            timeout: 1000000,
            headers: {
              authorization: `Bearer ${teacherToken}`,
              "Content-Type": "multipart/form-data"
            }
          }
        )).data;

        if (imageUpdateRequest.success === true) {
          toast.success("تم تعديل البيانات بنجاح");
        } else {
          toast.error("لقد حدث خطا ما");
          handleCancel();
        }

      }
    } catch (e) {
      toast.error(e.response.data.message);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: teacherInfo.name,
      email: teacherInfo.email,
      phone: teacherInfo.phone,
      birthDate: teacherInfo.birthDate,
      gender: teacherInfo.gender,
      address: {
        city: teacherInfo.address.city,
        region: teacherInfo.address.region,
        street: teacherInfo.address.street
      },
      subject: teacherInfo.subject,
      Class: teacherInfo.Class,
      experience: teacherInfo.experience,
      price: teacherInfo.price,
      degree: teacherInfo.degree,
      about: teacherInfo.about,
      availableTimes: teacherInfo.availableTimes,
      slots_booked: teacherInfo.slots_booked,
      location: teacherInfo.location,
      image: teacherInfo.image
    });
    setProfileImage(teacherInfo.image);
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
              handleAddressChange={handleAddressChange}
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

        </div>
      </div>
    </div>
  );
};

export const getInfo = async () => {
  const { teacherToken } = localStorage;

  if (teacherToken) {
    try {
      const teacherInfoRequest = await (await api.get(
        "/api/teacher/profile"
        , {
          headers: {
            authorization: `Bearer ${teacherToken}`
          }
        }
      )).data;

      if (teacherInfoRequest.success === true) {
        return teacherInfoRequest.data;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

}

export default TeacherProfile;