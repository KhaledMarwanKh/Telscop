import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiUsers, FiCheck, FiX,
  FiPhone, FiMail,
  FiDownload, FiClock
} from 'react-icons/fi';
import { adminProfile, pendingTeachers, subjects } from '../../data/adminMockData';
import { toast } from 'react-toastify';
import Header from '../../components/admin components/AdminPendingTeachers/Header';
import StatisBar from '../../components/admin components/AdminPendingTeachers/StatisBar';
import PendingTeachersTable from '../../components/admin components/AdminPendingTeachers/PendingTeachersTable';

const AdminPendingTeachers = () => {
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    setAdmin(adminProfile);
  }, [])

  useEffect(() => {
    applyFilter();
  }, [subjectFilter])

  const applyFilter = () => {
    const filteredTeachers = (subjectFilter !== 'all') ? pendingTeachers.filter(
      teacher => teacher.subjectKey === subjectFilter
    ) : pendingTeachers;

    setFilteredTeachers(filteredTeachers);
  }

  const handleApproveTeacher = (teacherId) => {
    if (window.confirm('هل أنت متأكد من الموافقة على هذا المعلم؟')) {
      setFilteredTeachers(prev => prev.filter(t => t.id !== teacherId));
      toast.success('تم قبول المعلم وتفعيل حسابه بنجاح');
    }
  };

  const handleRejectTeacher = (teacherId) => {
    if (window.confirm('هل أنت متأكد من رفض طلب هذا المعلم؟')) {
      setFilteredTeachers(prev => prev.filter(t => t.id !== teacherId));
      toast.error('تم رفض طلب المعلم');
    }
  };

  const handleDownloadDocument = (teacherId, document) => {
    toast.info(`تحميل ${document} للمعلم ${teacherId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const getDaysAgo = (dateString) => {
    const today = new Date();
    const applicationDate = new Date(dateString);
    const diffTime = Math.abs(today - applicationDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Header
        admin={admin}
        setIsProfileMenuOpen={setIsProfileMenuOpen}
        isProfileMenuOpen={isProfileMenuOpen}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">طلبات المعلمين</h1>
          <p className="text-gray-600">مراجعة والموافقة على طلبات التدريس الجديدة</p>
        </div>

        {/* Alert for pending applications */}
        {filteredTeachers.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <FiClock className="w-5 h-5 text-yellow-600 ml-2" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  يوجد {filteredTeachers.length} طلب في انتظار المراجعة
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  يرجى مراجعة الطلبات والوثائق المرفقة قبل اتخاذ القرار
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
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
          filteredTeachers={filteredTeachers}
        />

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">طلبات التدريس ({filteredTeachers.length})</h3>
          </div>

          <PendingTeachersTable
            handleApproveTeacher={handleApproveTeacher}
            handleDownloadDocument={handleDownloadDocument}
            handleRejectTeacher={handleRejectTeacher}
            filteredTeachers={filteredTeachers}
            getDaysAgo={getDaysAgo}
            formatDate={formatDate}
          />

          {filteredTeachers.length === 0 && (
            <div className="text-center py-12">
              <FiUsers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد طلبات جديدة</h3>
              <p className="text-gray-500">جميع طلبات التدريس تمت مراجعتها</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPendingTeachers;