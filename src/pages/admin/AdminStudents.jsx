import { useEffect, useState } from 'react';
import {
  FiUsers, FiTrash2, FiPhone, FiMail
} from 'react-icons/fi';
import { adminProfile, allStudents, grades } from '../../data/adminMockData';
import { toast } from 'react-toastify';
import Header from '../../components/admin components/AdminStudents/Header';
import StatisBar from '../../components/admin components/AdminStudents/StatisBar';
import StudentsTable from '../../components/admin components/AdminStudents/StudentsTable';

const AdminStudents = () => {
  const [gradeFilter, setGradeFilter] = useState('all');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [admin, setAdmin] = useState({})

  useEffect(() => {
    applyFilter();
  }, [gradeFilter])

  useEffect(() => {
    setAdmin(adminProfile);
  }, [])

  const applyFilter = () => {
    const filteredStudents = (gradeFilter !== 'all') ? allStudents.filter(student => (
      student.grade === parseInt(gradeFilter)
    )) : allStudents;

    setFilteredStudents(filteredStudents)
  }

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطالب؟')) {
      setFilteredStudents(prev => prev.filter(s => s.id !== studentId));
      toast.success('تم حذف الطالب بنجاح');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Header
        setIsProfileMenuOpen={setIsProfileMenuOpen}
        admin={admin}
        isProfileMenuOpen={isProfileMenuOpen}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">إدارة الطلاب</h1>
          <p className="text-gray-600">عرض وإدارة جميع الطلاب المسجلين في المنصة</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">فلترة بالصف</label>
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {grades.map(grade => (
                  <option key={grade.value} value={grade.value}>{grade.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <StatisBar
          filteredStudents={filteredStudents}
        />

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">قائمة الطلاب ({filteredStudents.length})</h3>
          </div>

          <StudentsTable
            handleDeleteStudent={handleDeleteStudent}
            filteredStudents={filteredStudents}
          />

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <FiUsers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد نتائج</h3>
              <p className="text-gray-500">لم يتم العثور على طلاب مطابقين لمعايير البحث</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;