import React from 'react';
import { Mail, Phone, MapPin, BookOpen, Calendar, GraduationCap, Users, Award } from 'lucide-react';
import { FiX } from 'react-icons/fi';
import { formatDate } from '../../../data/assests';

const TeacherProfile = ({ teacher, setShowProfile }) => {
  return (
    <div className="w-full md:w-[900px] mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10 mt-10 space-y-6 relative">
      <FiX className='w-5 h-5 absolute left-10 top-20 cursor-pointer' onClick={() => setShowProfile(false)} />
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={teacher?.image}
          alt={teacher?.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{teacher?.name}</h2>
          <p className="text-gray-600">{teacher?.subject}</p>
          <p className="text-sm text-gray-500">{teacher?.degree}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Mail size={18} className="text-blue-500" />
          <span>{teacher?.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={18} className="text-green-500" />
          <p style={{ direction: 'ltr' }} >{teacher?.phone}</p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-red-500" />
          <span>{Object.values(teacher?.address).join(",")}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-6 mt-4 text-center">
        <div className="bg-green-50 p-4 rounded-xl shadow-sm">
          <BookOpen className="mx-auto text-green-600" />
          <h3 className="font-semibold text-lg">{teacher.totalLessons}</h3>
          <p className="text-sm text-gray-500">عدد الدروس</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl shadow-sm">
          <Users className="mx-auto text-purple-600" />
          <h3 className="font-semibold text-lg">{teacher.studentsCount} طالب</h3>
          <p className="text-sm text-gray-500">عدد الطلاب</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl shadow-sm">
          <Award className="mx-auto text-yellow-600" />
          <h3 className="font-semibold text-lg">{teacher?.amountMoneyRequired * 5 / 100} ل.س</h3>
          <p className="text-sm text-gray-500">الارباح</p>
        </div>
      </div>

      {/* More Details */}
      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 mt-4">
        <div className="flex items-center gap-2">
          <GraduationCap size={18} className="text-indigo-500" />
          <span>الصفوف: {teacher?.Class?.join(', ')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-orange-500" />
          <span>تاريخ الانضمام: <span style={{ direction: "ltr" }}>{formatDate(new Date(teacher?.createdAt).toLocaleDateString("en-US"))}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-pink-500" />
          <span>تاريخ الميلاد: <span style={{ direction: "ltr" }}>{teacher?.birthDate?.split("T")[0]}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${teacher.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
            {teacher?.available ? 'مفعل' : 'غير مفعل'}
          </span>
        </div>
      </div>

      {/* Bio */}
      <div className="mt-6">
        <h3 className="font-bold text-gray-800 mb-2">نبذة عن المعلم:</h3>
        <p className="text-gray-600 leading-relaxed">{teacher?.about}</p>
      </div>
    </div>
  );
};

export default TeacherProfile;