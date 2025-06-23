import { useEffect, useState } from 'react';
import { mockTeacherProfile, mockTodayLessons, mockUpcomingLessons } from '../../data/teacherMockData';
import { toast } from 'react-toastify';
import Header from '../../components/teacher component/Dashboard/Header';
import NoLessions from '../../components/teacher component/Dashboard/NoLessions';
import TodayLessions from '../../components/teacher component/Dashboard/TodayLessions';
import UpCommingLessions from '../../components/teacher component/Dashboard/UpCommingLessions';
import StatisBar from '../../components/teacher component/Dashboard/StatisBar';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState({});
  const [statis, setStatis] = useState({})
  const [todayLessons, setTodayLessons] = useState([])
  const [upcommingLessons, setUpcommingLessons] = useState([])

  const handleCompleteLesson = (lessonId) => {
    toast.success('اكتمل الدرس بنجاح');
  };

  const handleCancelLesson = (lessonId) => {
    toast.error('تم الغاء الدرس');
  };

  const handleCallStudent = (phone) => {
    toast.info(`جاري الاتصال بـ ${phone}`);
  };

  useEffect(() => {
    setTeacherInfo(mockTeacherProfile)
  }, [teacherInfo])

  useEffect(() => {
    setStatis(mockTeacherProfile.stats)
  }, [statis])

  useEffect(() => {
    setUpcommingLessons(mockUpcomingLessons);
    setTodayLessons(mockTodayLessons)
  }, [todayLessons, upcommingLessons])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

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
      {todayLessons.length === 0 ? (
        <NoLessions />
      ) : (
        <TodayLessions
          handleCancelLesson={handleCancelLesson}
          handleCompleteLesson={handleCompleteLesson}
          handleCallStudent={handleCallStudent}
          getStatusBadge={getStatusBadge}
          todayLessons={todayLessons}
        />
      )}
    </div>
  );

  const renderUpcomingLessons = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {upcommingLessons.length === 0 ? (
        <NoLessions />
      ) : (
        <UpCommingLessions
          getStatusBadge={getStatusBadge}
          formatDate={formatDate}
          handleCancelLesson={handleCancelLesson}
          handleCompleteLesson={handleCompleteLesson}
          handleCallStudent={handleCallStudent}
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            لوحة التحكم
          </h1>
          <p className="text-gray-600">إليك نظرة عامة على نشاطك اليوم</p>
        </div>


        <StatisBar statis={statis} />


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
                دروس اليوم ({todayLessons.length})
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${activeTab === 'upcoming'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-sm'
                  }`}
              >
                الدروس القادمة ({upcommingLessons.length})
              </button>
            </div>

            {/* Content */}
            <div className='w-full'>
              {activeTab === 'today' && renderTodayLessons()}
              {activeTab === 'upcoming' && renderUpcomingLessons()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;