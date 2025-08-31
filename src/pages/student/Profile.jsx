import { useEffect, useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit2, FiSave } from 'react-icons/fi';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { city, formatDate, grades, homes } from '../../data/assests';
import api from '../../lib/api';

const Profile = () => {
  const studentInfo = useLoaderData();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: studentInfo?.name,
    email: studentInfo?.email,
    phone: studentInfo?.phone,
    birthDate: studentInfo?.birthDate,
    gender: studentInfo?.gender,
    Class: studentInfo?.Class,
    address: {
      city: studentInfo?.address?.city,
      region: studentInfo?.address?.region,
      street: studentInfo?.address?.street
    },
  });

  const [imageProf, setImageProf] = useState(studentInfo.image);

  const [sendImage, setSendImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const handleImageChange = ({ target: { name, files } }) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageProf(e.target.result);
    };
    reader.readAsDataURL(file);

    setSendImage(file);
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userToken } = localStorage;

    if (userToken) {
      try {
        console.log(formData, "update profile")

        const updateRequest = await (await api.post(
          "/api/user/update-Profile"
          , formData
          , {
            headers: {
              authorization: `Bearer ${userToken}`
            }
          }
        )).data;

        console.log(updateRequest, "update profile");

        if (updateRequest.status === "success") {
          toast.success("تم تعديل البيانات بنجاح");
        } else {
          toast.error("لقد حدث خطا ما");
          handleCancel();
        }
      } catch (e) {
        toast.error(e.message);
      }
    }

    try {
      if (sendImage) {
        const formData = new FormData();

        formData.append("image", sendImage);

        const imageUpdateRequest = await (await api.post(
          "/api/user/update-Profile"
          , formData
          , {
            timeout: 1000000,
            headers: {
              authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data"
            }
          }
        )).data;

        if (imageUpdateRequest.status === "success") {
          toast.success("تم تعديل البيانات بنجاح");
        } else {
          toast.error("لقد حدث خطا ما");
          handleCancel();
        }

      }
    } catch (e) {
      toast.error(e.message);
    }
    setIsEditing(false);
  }

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: studentInfo?.name,
      email: studentInfo?.email,
      phone: studentInfo?.phone,
      birthDate: studentInfo?.birthDate,
      gender: studentInfo?.gender,
      Class: studentInfo?.Class,
      address: {
        city: studentInfo?.address?.city,
        region: studentInfo?.address?.region,
        street: studentInfo?.address?.street
      },
    });

    setImageProf(studentInfo?.image);

    setSendImage(null);

    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">الملف الشخصي</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
            >
              <FiEdit2 className="w-4 h-4" />
              <span>تعديل</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Profile Image Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <img
                src={imageProf}
                alt="صورة الطالب"
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-200"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <FiEdit2 className="w-4 h-4" />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            {isEditing && (
              <p className="text-sm text-gray-500 mt-2">انقر على الأيقونة لتغيير الصورة</p>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiUser className="w-4 h-4 inline ml-2" />
                الاسم الكامل
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiMail className="w-4 h-4 inline ml-2" />
                البريد الإلكتروني
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiPhone className="w-4 h-4 inline ml-2" />
                رقم الهاتف
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{ direction: 'ltr' }}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiCalendar className="w-4 h-4 inline ml-2" />
                تاريخ الميلاد
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate.split("T")[0]}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الجنس
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                required
              >
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الصف
              </label>
              <select
                name="Class"
                value={formData.Class}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                required
              >
                {grades.slice(1).map((grade) => (
                  <option key={grade.value} value={parseInt(grade.value)}>
                    {grade.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiMapPin className="w-4 h-4 inline ml-2" />
                العنوان
              </label>
              <div>
                <label className='block text-[0.8rem] font-medium text-gray-700 mb-2'>
                  محافظة
                </label>
                <select
                  name="city"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                  required
                  disabled={!isEditing}
                >
                  {city.map((city) => (
                    <option key={city.key} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block text-[0.8rem] font-medium text-gray-700 mb-2'>
                  منطقة
                </label>
                <select
                  name="region"
                  value={formData.address.region}
                  onChange={handleAddressChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                  required
                  disabled={!isEditing}
                >
                  {homes.map((region) => (
                    <option key={region.translation} value={region.region}>
                      {region.region}
                    </option>
                  ))}
                </select>
              </div>
              <div className="group">
                <label className='block text-[0.8rem] font-medium text-gray-700 mb-2'>
                  الشارع
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="street"
                    value={formData.address.street}
                    onChange={handleAddressChange}
                    className="w-full pl-4 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white placeholder:text-gray-400"
                    placeholder="أدخل الشارع"
                    required
                    disabled={!isEditing}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2 space-x-reverse"
              >
                <FiSave className="w-5 h-5" />
                <span>حفظ التغييرات</span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export const userInfoLoader = async () => {
  const { userToken } = localStorage;
  try {
    if (userToken) {
      const studentInfo = await (await api.get(
        '/api/user/get-profile',
        {
          headers: {
            authorization: `Bearer ${userToken}`
          }
        }
      )).data;

      console.log(studentInfo);

      if (studentInfo?.status === "success") {
        return studentInfo.data;
      } else {
        throw new Error("لقد حدث خطا ما");
      }
    }
  } catch (e) {
    console.log(e);
    return {
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      gender: '',
      Class: '',
      address: {
        city: '',
        region: '',
        street: ''
      },
      image: ''
    }
  }

}

export default Profile;
