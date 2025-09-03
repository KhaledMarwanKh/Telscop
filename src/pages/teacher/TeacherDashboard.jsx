import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/teacher component/Dashboard/Header';
import NoLessions from '../../components/teacher component/Dashboard/NoLessions';
import TodayLessions from '../../components/teacher component/Dashboard/TodayLessions';
import UpCommingLessions from '../../components/teacher component/Dashboard/UpCommingLessions';
import StatisBar from '../../components/teacher component/Dashboard/StatisBar';
import { formatDate, getDayKeyByNumber, getNextDayDate, getTimeSlotId } from '../../data/assests';
import api from '../../lib/api';
import { useLoaderData, useNavigate } from 'react-router-dom';
import FilterTab from '../../components/teacher component/Dashboard/Filter';

const TeacherDashboard = () => {
  const dashboardInfo = useLoaderData();
  const [activeTab, setActiveTab] = useState('today');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState({});
  const [statis, setStatis] = useState({});
  const [todayLessons, setTodayLessons] = useState([]);
  const [upcommingLessons, setUpcommingLessons] = useState([]);
  const [dayFilter, setDayFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [totalBookings, setTotalBookings] = useState([]);
  const navigate = useNavigate();

  const handleCompleteLesson = async (lessonId) => {
    try {
      const { teacherToken } = localStorage;

      const completeBookingRequest = await (await api.post(
        "/api/teacher/complete-appointments"
        , {
          appointmentId: lessonId
        },
        {
          headers: {
            authorization: `Bearer ${teacherToken}`
          }
        }
      )).data;

      if (completeBookingRequest.success) {
        toast.success("تم تعليم الدرس كمكتمل");
        navigate("/teacher/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  const handleCancelLesson = async (lessonId) => {
    try {
      const { teacherToken } = localStorage;

      const canceleBookingRequest = await (await api.post(
        "/api/teacher/cancel-appointments",
        {
          appointmentId: lessonId
        },
        {
          headers: {
            authorization: `Bearer ${teacherToken}`
          }
        }
      )).data;

      if (canceleBookingRequest.success) {
        toast.success("تم الغاء الدرس بنجاح");
        navigate("/teacher/dashboard")
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error)
    }
  };

  useEffect(() => {
    setStatis(dashboardInfo?.statis);
    setTeacherInfo(dashboardInfo?.teacherInfo);
    setTodayLessons(dashboardInfo?.todayLessons);
    setUpcommingLessons(dashboardInfo?.upcommingLessons);
    setTotalBookings(dashboardInfo?.bookings);
  }, [dashboardInfo])

  useEffect(() => {
    updateBookings();
  }, [dayFilter, statusFilter]);

  const updateBookings = async () => {
    const { teacherToken } = localStorage;
    try {

      const bookingsRequest = await (await api.get(
        "/api/teacher/appointments"
        , {
          headers: {
            authorization: `Bearer ${teacherToken}`
          }
        }
      )).data;

      if (bookingsRequest.success) {
        const bookings = bookingsRequest.data;

        let upcommingLessons, todayLessons;

        todayLessons = bookings
          .filter(booking => booking.slotDate.split("T")[0] === formatDate(new Date().toLocaleDateString("en-US")))
          .sort((a, b) => getTimeSlotId(a.slotTime) - getTimeSlotId(b.slotTime));

        upcommingLessons = bookings
          .filter(booking => new Date(booking.slotDate.split("T")[0]) > new Date(formatDate(new Date().toLocaleDateString("en-US"))))
          .sort((a, b) => new Date(a.slotDate.split("T")[0]) - new Date(b.slotDate.split("T")[0]));

        if (dayFilter !== "all") {
          upcommingLessons = upcommingLessons.filter(booking => getDayKeyByNumber(new Date(booking.slotDate).getDay()) === dayFilter);
        }

        if (statusFilter !== "all") {
          if (statusFilter === "confirmed") {
            upcommingLessons = upcommingLessons.filter(booking => !booking.isCompleted && !booking.cancelled);
            todayLessons = todayLessons.filter(booking => !booking.isCompleted && !booking.cancelled);
          }
          else if (statusFilter === "completed") {
            upcommingLessons = upcommingLessons.filter(booking => booking.isCompleted);
            todayLessons = todayLessons.filter(booking => booking.isCompleted);
          }
          else {
            upcommingLessons = upcommingLessons.filter(booking => booking.cancelled);
            todayLessons = todayLessons.filter(booking => booking.cancelled);
          }
        }

        setTodayLessons(todayLessons);

        setUpcommingLessons(upcommingLessons);

        setTotalBookings(bookings);

      }

    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: { color: 'bg-yellow-100 text-yellow-800 ', text: 'مؤكد' },
      completed: { color: 'bg-emerald-100 text-emerald-800', text: 'مكتمل' },
      cancelled: { color: 'bg-red-100 text-red-800', text: 'ملغي' }
    };
    return badges[status] || badges.confirmed;
  };

  const renderTodayLessons = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {todayLessons?.length === 0 ? (
        <NoLessions />
      ) : (
        <TodayLessions
          handleCancelLesson={handleCancelLesson}
          handleCompleteLesson={handleCompleteLesson}
          getStatusBadge={getStatusBadge}
          todayLessons={todayLessons}
        />
      )}
    </div>
  );

  const renderUpcomingLessons = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {upcommingLessons?.length === 0 ? (
        <NoLessions />
      ) : (
        <UpCommingLessions
          getStatusBadge={getStatusBadge}
          formatDate={formatDate}
          handleCancelLesson={handleCancelLesson}
          handleCompleteLesson={handleCompleteLesson}
          upcommingLessons={upcommingLessons}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <Header
        setIsProfileMenuOpen={setIsProfileMenuOpen}
        teacher={teacherInfo}
        isProfileMenuOpen={isProfileMenuOpen}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <StatisBar statis={statis} bookings={totalBookings} />

        {/* Main Content */}
        <div className="grid grid-cols-1 w-full lg:grid-cols-2 gap-8">
          {/* Lessons Section */}
          <div className="lg:col-span-2 w-full space-y-6">
            {/* Tabs */}
            <div className="flex space-x-4 space-x-reverse">
              <button
                onClick={() => setActiveTab('today')}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${activeTab === 'today'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-sm'
                  }`}
              >
                دروس اليوم ({todayLessons?.length})
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${activeTab === 'upcoming'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-sm'
                  }`}
              >
                الدروس القادمة ({upcommingLessons?.length})
              </button>
            </div>

            {/* Content */}
            <div className='w-full'>
              <FilterTab
                setDayFilter={setDayFilter}
                setStatusFilter={setStatusFilter}
                dayFilter={dayFilter}
                statusFilter={statusFilter}
                daysInEnglish={
                  teacherInfo?.availableTimes?.map(daySlot => daySlot.day)
                    ?.filter(day => new Date(getNextDayDate(day)) > new Date())
                    ?.sort((a, b) => new Date(getNextDayDate(a)) - new Date(getNextDayDate(b)))
                }
                activeTab={activeTab}
              />
              {activeTab === 'today' && renderTodayLessons()}
              {activeTab === 'upcoming' && renderUpcomingLessons()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const dashboardInfoLoader = async () => {
  const { teacherToken } = localStorage;

  let upcommingLessons = [];
  let todayLessons = [];
  let statis = {};

  if (teacherToken) {
    try {
      const statisRequest = await (await api.get(
        "/api/teacher/dashboard",
        {
          headers: {
            authorization: `Bearer ${teacherToken}`
          }
        }
      )).data;

      if (statisRequest.status === "success") {
        statis = statisRequest.data;

        const bookingsRequest = await (await api.get(
          "/api/teacher/appointments"
          , {
            headers: {
              authorization: `Bearer ${teacherToken}`
            }
          }
        )).data;

        if (bookingsRequest.success === true) {
          const bookings = bookingsRequest.data;

          todayLessons = bookings
            .filter(booking => booking.slotDate.split("T")[0] === formatDate(new Date().toLocaleDateString("en-US")))
            .sort((a, b) => getTimeSlotId(a.slotTime) - getTimeSlotId(b.slotTime));

          upcommingLessons = bookings
            .filter(booking => new Date(booking.slotDate.split("T")[0]) > new Date(formatDate(new Date().toLocaleDateString("en-US"))))
            .sort((a, b) => new Date(a.slotDate.split("T")[0]) - new Date(b.slotDate.split("T")[0]));

          const teacherInfoRequest = await (await api.get(
            "/api/teacher/profile"
            , {
              headers: {
                authorization: `Bearer ${teacherToken}`
              }
            }
          )).data;

          if (teacherInfoRequest.success === true) {
            const teacherInfo = teacherInfoRequest.data;

            return { statis, todayLessons, upcommingLessons, teacherInfo, bookings };
          }
        }
      }
    } catch (e) { 
      toast.error(e.response.data.message);
    }
  } else {
    window.location.href = "/login";
  }
}

export default TeacherDashboard;