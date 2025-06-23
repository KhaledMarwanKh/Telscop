import { useEffect, useState } from 'react';
import {
  FiUsers
} from 'react-icons/fi';
import { adminProfile, activeTeachers, subjects } from '../../data/adminMockData';
import { toast } from 'react-toastify';
import Header from '../../components/admin components/AdminTeachers/Header';
import StatisBar from '../../components/admin components/AdminTeachers/StatisBar';
import ActiveTeachersTable from '../../components/admin components/AdminTeachers/ActiveTeachersTable';

const AdminTeachers = () => {
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [admin, setAdmin] = useState({});
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [statis, setStatis] = useState({
    totalEarnings: 0,
    totalLessons: 0,
    teachersNum: 0
  })

  useEffect(() => {
    applyFilters();
  }, [subjectFilter])

  useEffect(() => {
    setFilteredTeachers(activeTeachers)
  }, [])

  useEffect(() => {
    setAdmin(adminProfile);
  }, [])

  const applyFilters = () => {
    const filteredTeachers = (subjectFilter !== 'all') ? activeTeachers.filter(
      teacher => teacher.subjectKey === subjectFilter
    ) : activeTeachers;

    setStatis({
      totalEarnings: filteredTeachers.reduce((sum, teacher) => sum + teacher.totalEarnings, 0),
      totalLessons: filteredTeachers.reduce((sum, teacher) => sum + teacher.totalLessons, 0),
      teachersNum: filteredTeachers.length
    })

    setFilteredTeachers(filteredTeachers);
  }

  const handleActivateTeacher = (teacherId) => {
    setFilteredTeachers(prev => prev.map(t =>
      t.id === teacherId ? { ...t, status: 'activated' } : t
    ));
    toast.success('تم تفعيل المعلم بنجاح');
  };

  const handleCancelActivateTeacher = (teacherId) => {
    setFilteredTeachers(prev => prev.map(t =>
      t.id === teacherId ? { ...t, status: 'not_activated' } : t
    ));
    toast.success('تم الغاء تفعيل المعلم بنجاح');
  };

  const getStatusBadge = (status) => {
    const badges = {
      activated: { color: 'bg-green-100 text-green-800', text: 'مفعل' },
      not_activated: { color: 'bg-red-100 text-red-800', text: 'غير مفعل' }
    };
    return badges[status] || badges.activated;
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Header
        setIsProfileMenuOpen={setIsProfileMenuOpen}
        isProfileMenuOpen={isProfileMenuOpen}
        admin={admin}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">إدارة المعلمين</h1>
          <p className="text-gray-600">عرض وإدارة جميع المعلمين المفعلين في المنصة</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">فلترة بالمادة</label>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {subjects.map(subject => (
                  <option key={subject.key} value={subject.key}>{subject.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <StatisBar
          statis={statis}
        />

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">قائمة المعلمين ({filteredTeachers.length})</h3>
          </div>

          <ActiveTeachersTable
            handleActivateTeacher={handleActivateTeacher}
            handleCancelActivateTeacher={handleCancelActivateTeacher}
            filteredTeachers={filteredTeachers}
            getStatusBadge={getStatusBadge}
          />

          {filteredTeachers.length === 0 && (
            <div className="text-center py-12">
              <FiUsers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد نتائج</h3>
              <p className="text-gray-500">لم يتم العثور على معلمين مطابقين لمعايير البحث</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTeachers;