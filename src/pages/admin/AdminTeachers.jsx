import { useEffect, useState } from 'react';
import {
  FiUsers
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import StatisBar from '../../components/admin components/AdminTeachers/StatisBar';
import ActiveTeachersTable from '../../components/admin components/AdminTeachers/ActiveTeachersTable';
import FilterTab from '../../components/admin components/AdminTeachers/FilterTab';
import TeacherProfile from '../../components/admin components/AdminTeachers/TeahcerProfile';
import api from '../../lib/api';
import { useNavigate } from "react-router-dom";

const AdminTeachers = () => {
  const navigate = useNavigate();
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [statis, setStatis] = useState({
    totalEarnings: 0,
    totalLessons: 0,
    teachersNum: 0
  });
  const [showProfile, setShowProfile] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    try {
      applyFilters();
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false)
  }, [subjectFilter, gradeFilter, regionFilter]);

  const getCompletedBookings = async () => {
    const { adminToken } = localStorage;

    const getCompletedBookingsRequest = await (await api.get(
      "/api/admin/appointments"
      , {
        headers: {
          authorization: `Bearer ${adminToken}`
        }
      }
    )).data;

    return getCompletedBookingsRequest?.data?.filter(booking => booking.isCompleted);
  }

  const applyFilters = async () => {

    const { adminToken } = localStorage;

    try {
      const getAllTeacherRequest = await (await api.get(
        "/api/admin/all-activate-teachers"
        , {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;

      let filteredTeachers = getAllTeacherRequest.teacher_activate;


      if (regionFilter !== "all") {
        filteredTeachers = filteredTeachers?.filter(teacher => teacher?.address?.region === regionFilter);
      }

      if (gradeFilter !== "all") {
        filteredTeachers = filteredTeachers?.filter(teacher => teacher?.Class?.includes(parseInt(gradeFilter)));
      }

      if (subjectFilter !== "all") {
        filteredTeachers = filteredTeachers?.filter(teacher => teacher?.subject === subjectFilter);
      }

      let completedBookings = [], totalLessons = 0, totalEarnings = 0, teachersNum = filteredTeachers?.length;

      await getCompletedBookings().then(data => {
        completedBookings = data;
      });

      filteredTeachers?.forEach(teacher => {
        const lessons = completedBookings?.filter(booking => booking?.teacherId?._id === teacher._id && booking?.isCompleted)?.length;
        totalLessons += lessons;

        totalEarnings += teacher?.amountMoneyAllTime * 5 / 100;
      });


      setBookings(completedBookings);

      setStatis({
        totalEarnings,
        totalLessons,
        teachersNum
      });

      setFilteredTeachers(filteredTeachers);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  const handleActivateTeacher = async (teacherId) => {
    try {
      const { adminToken } = localStorage;

      const makeAvailableTrueRequest = await (await api.post(
        "/api/admin/change-state-teacher"
        , {
          state: true,
          id: teacherId
        },
        {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;

      toast.success("تم تفعيل المدرس بنجاح");
      applyFilters();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleCancelActivateTeacher = async (teacherId) => {
    try {
      const { adminToken } = localStorage;

      const makeAvailableTrueRequest = await (await api.post(
        "/api/admin/change-state-teacher"
        , {
          state: false,
          id: teacherId
        },
        {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;

      toast.success("تم الغاء تفعيل المدرس بنجاح");
      applyFilters();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleShowTeacherInfo = (teacherId) => {
    const teacher = filteredTeachers.filter(teacher => teacher?._id === teacherId)[0];
    const teacherBookings = bookings?.filter(booking => booking?.teacherId?._id === teacherId);
    teacher.totalLessons = teacherBookings.length;
    teacher.studentsCount = (new Set(teacherBookings.map(booking => booking?.userId?._id))).size;
    setSelectedTeacher(teacher);
    setShowProfile(true);
  }

  const getStatusBadge = (status) => {
    const badges = {
      activated: { color: 'bg-green-100 text-green-800', text: 'مفعل' },
      not_activated: { color: 'bg-red-100 text-red-800', text: 'غير مفعل' }
    };
    return badges[status] || badges.activated;
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">إدارة المعلمين</h1>
          <p className="text-gray-600">عرض وإدارة جميع المعلمين المفعلين في المنصة</p>
        </div>

        <FilterTab
          setGradeFilter={setGradeFilter}
          setRegionFilter={setRegionFilter}
          setSubjectFilter={setSubjectFilter}
          gradeFilter={gradeFilter}
          subjectFilter={subjectFilter}
          regionFilter={regionFilter}
        />

        <StatisBar
          statis={statis}
        />

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">قائمة المعلمين ({filteredTeachers.length})</h3>
          </div>

          {
            isLoading ? (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="text-6xl mb-4">⏳</div>
                  <h2 className="text-xl font-semibold text-gray-600">جاري التحميل...</h2>
                </div>
              </div>
            ) : (
              <>
                <ActiveTeachersTable
                  handleActivateTeacher={handleActivateTeacher}
                  handleCancelActivateTeacher={handleCancelActivateTeacher}
                  handleShowTeacherInfo={handleShowTeacherInfo}
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
              </>
            )
          }
        </div>
      </div>
      {
        showProfile && (
          <div className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <TeacherProfile teacher={selectedTeacher} setShowProfile={setShowProfile} />
          </div>
        )
      }
    </div>
  );
};

export default AdminTeachers;