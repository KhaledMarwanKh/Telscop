import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit2, FiSave } from 'react-icons/fi';
import { mockStudent, grades } from '../../data/mockData';
import { toast } from 'react-toastify';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockStudent.name,
    email: mockStudent.email,
    phone: mockStudent.phone,
    birthDate: mockStudent.birthDate,
    gender: mockStudent.gender,
    grade: mockStudent.grade,
    address: mockStudent.address
  });

  const [profileImage, setProfileImage] = useState(mockStudent.image);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    // Simulate saving changes
    toast.success('تم حفظ التغييرات بنجاح!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: mockStudent.name,
      email: mockStudent.email,
      phone: mockStudent.phone,
      birthDate: mockStudent.birthDate,
      gender: mockStudent.gender,
      grade: mockStudent.grade,
      address: mockStudent.address
    });
    setProfileImage(mockStudent.image);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
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
                src={profileImage}
                alt="صورة الطالب"
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-200"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <FiEdit2 className="w-4 h-4" />
                  <input
                    type="file"
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
                value={formData.birthDate}
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
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                required
              >
                {grades.map((grade) => (
                  <option key={grade.value} value={grade.value}>
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
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows="3"
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                required
                style={{ resize: 'none' }}
              />
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

        {/* Account Statistics */}
        {!isEditing && (
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-xl font-semibold mb-6">إحصائيات الحساب</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-primary bg-opacity-5 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">12</div>
                <div className="text-white text-sm">إجمالي الدروس</div>
              </div>
              <div className="bg-secondary bg-opacity-5 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">1</div>
                <div className="text-white text-sm"> عدد الدروس التي تم الغائها </div>
              </div>
              <div className="bg-accent bg-opacity-5 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">1</div>
                <div className="text-white text-sm"> عدد الدروس التي تمت </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
