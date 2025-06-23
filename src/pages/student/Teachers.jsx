import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTeachers } from '../../data/mockData';
import { toast } from 'react-toastify';
import TeacherPanel from '../../components/students components/Teachers/TeacherPanel';
import FilterTab from '../../components/students components/Teachers/FilterTab';
import TeacherMap from '../../components/TeacherMap';

const Teachers = () => {
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const navigate = useNavigate();

  const applyFilters = () => {
    let filtered = mockTeachers;

    if (subjectFilter) {
      filtered = filtered.filter(teacher => teacher.subjectKey === subjectFilter);
    }

    if (gradeFilter) {
      filtered = filtered.filter(teacher =>
        teacher.grades.includes(parseInt(gradeFilter))
      );
    }

    setFilteredTeachers(filtered);
  };

  const clearFilters = () => {
    setSubjectFilter('');
    setGradeFilter('');
    setFilteredTeachers(mockTeachers);
    toast.info('تم إلغاء جميع الفلاتر');
  };

  const handleTeacherSelect = (teacherId) => {
    navigate(`/booking/${teacherId}`);
  };

  useEffect(() => {
    applyFilters();
  }, [subjectFilter, gradeFilter]);

  useEffect(() => {
    if (localStorage.filter) {
      setSubjectFilter(localStorage.filter);
      localStorage.clear();
    }
  }, [])

  useEffect(() => {
    setFilteredTeachers(mockTeachers)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">المعلمون المتاحون</h1>

      <FilterTab
        gradeFilter={gradeFilter}
        subjectFilter={subjectFilter}
        setGradeFilter={setGradeFilter}
        setSubjectFilter={setSubjectFilter}
        filteredTeachers={filteredTeachers}
        clearFilters={clearFilters}
      />

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text+-xl font-semibold mb-4 flex items-center space-x-2 space-x-reverse">
          <span>🗺️</span>
          <span>خريطة المعلمين</span>
        </h2>
        <TeacherMap
          teachers={filteredTeachers}
          onTeacherSelect={handleTeacherSelect}
        />

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">قائمة المعلمين</h2>

          {filteredTeachers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                لا توجد نتائج
              </h3>
              <p className="text-gray-500">
                جرب تغيير الفلاتر للعثور على معلمين آخرين
              </p>
            </div>
          ) : (
            <TeacherPanel filteredTeachers={filteredTeachers} handleTeacherSelect={handleTeacherSelect} />
          )}
        </div>

      </div>
    </div>
  );
};

export default Teachers;
