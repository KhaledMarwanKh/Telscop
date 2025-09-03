import { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TeacherPanel from '../../components/students components/Teachers/TeacherPanel';
import FilterTab from '../../components/students components/Teachers/FilterTab';
import TeacherMap from '../../components/TeacherMap';
import api from '../../lib/api';

const Teachers = () => {
  const allTeachers = useLoaderData();
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [distFilter, setDistFilter] = useState(0);
  const [regionFilter, setRegionFilter] = useState('all')
  const navigate = useNavigate();

  const applyFilters = async () => {

    try {
      let teachers = [];

      const filter = {};

      const { userToken } = localStorage;

      if (distFilter > 0) {
        try {
          if (userToken) {
            teachers = await (await api.post(
              "/api/user/get-nearest-teacher"
              , { maxDistanceKm: distFilter }
              ,
              {
                headers: {
                  authorization: `Bearer ${userToken}`
                }
              }
            )).data;

            if (teachers?.success === true) {
              const teacher = teachers?.data?.filter(teacher => teacher?.subject === subjectFilter
                || teacher?.Class?.includes(parseInt(gradeFilter))
                || teacher?.address?.region === regionFilter);

              setFilteredTeachers(teacher);
              return
            }
          } else {
            toast.warn("سجل دخولك اولا");
            setDistFilter(0);
          }

        } catch (e) {
          toast.error(e.response.data.message);
        }

      }

      if (subjectFilter !== "all") {
        filter.subject = subjectFilter;
      }

      if (gradeFilter !== "all") {
        filter.Class = gradeFilter;
      }

      if (regionFilter !== "all") {
        filter.region = regionFilter;
      }

      const filteredTeachers = await (await api.get(
        "/api/teacher/list-teachers"
        ,
        {
          params: filter
        }
      )).data;

      if (filteredTeachers?.status === "success") {
        setFilteredTeachers(filteredTeachers?.data?.filter(teacher => teacher.activate));
      }

    } catch (e) {
      console.log(e.response.data.message);
      setDistFilter("all");
      setFilteredTeachers(allTeachers);
      setGradeFilter("all");
      setRegionFilter("all");
      setDistFilter(0);
      toast.error(e.message);
    }
  };

  const clearFilters = () => {
    setSubjectFilter('all');
    setGradeFilter('all');
    setRegionFilter('all')
    setDistFilter(0);
    setFilteredTeachers(allTeachers);
    toast.info('تم إلغاء جميع الفلاتر');
  };

  const handleTeacherSelect = (teacherId) => {
    navigate(`/booking/${teacherId}`);
  };

  useEffect(() => {
    applyFilters();
  }, [subjectFilter, gradeFilter, distFilter, regionFilter]);

  useEffect(() => {
    if (localStorage.filter) {
      setSubjectFilter(localStorage.filter);
      localStorage.clear();
    }
  }, [])

  useEffect(() => {
    setFilteredTeachers(allTeachers);
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
        distFilter={distFilter}
        setDistFilter={setDistFilter}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
      />

      <div className="p-6 rounded-lg py-2 px-3 bg-white shadow-lg mb-8">
        <h2 className="text-xl font-semibold my-10 flex items-center space-x-2 space-x-reverse">
          <span>🗺️</span>
          <span>خريطة المعلمين</span>
        </h2>

        <TeacherMap
          teachers={filteredTeachers}
          onTeacherSelect={handleTeacherSelect}
        />

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">قائمة المعلمين</h2>

          {filteredTeachers?.length === 0 ? (
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

export const teachersLoader = async () => {
  try {
    const allTeachers = await (await api.get(
      "/api/teacher/list-teachers"
    )).data;

    if (allTeachers.status === "success") {
      return allTeachers.data.filter(teacher => teacher.activate);
    }
  } catch (e) {
    toast.error(e.response.data.message);
    return [];
  }
}

export default Teachers;
