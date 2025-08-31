import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import RenderOverview from '../../components/admin components/Dashboared/RenderOverview';
import TabsMenu from '../../components/admin components/Dashboared/TabsMenu';
import RenderTeacherStats from '../../components/admin components/Dashboared/RenderTeacherStats';
import RenderLessonsStats from '../../components/admin components/Dashboared/RenderLessonsStats';
import RenderStudentsStats from '../../components/admin components/Dashboared/RenderStudentsStats';
import { formatDate, getGradeNameByNumber, subjects } from '../../data/assests';
import api from '../../lib/api';
import { toast } from 'react-toastify';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState('overview');

  const [filters, setFilters] = useState({
    subject: 'all',
    dateRange: {
      start: "",
      end: ""
    }
  });

  const [monthlyStats, setMonthlyStats] = useState({});

  const [studentsByGrade, setStudentsByGrade] = useState({});

  const [lessonsBySubject, setLessonsBySubject] = useState({});

  const [teachersByGrade, setTeachersByGrade] = useState({});

  const [activeTeachers, setActiveTeachers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalLessons: 0,
    totalStudents: 0,
    totalTeachers: 0
  })

  const fetchData = async () => {
    const { adminToken } = localStorage;
    if (activeTab === "overview") {
      const generalStatisRequest = await (await api.get(
        "/api/admin/general-info"
        ,
        {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;

      const getMonthlyStatis = await (await api.get(
        "/api/admin/get-monthly-count"
        ,
        {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;



      const generalInfo = {
        totalEarnings: generalStatisRequest.totalRevenue,
        totalLessons: generalStatisRequest.completedAppointmentsCount,
        totalStudents: generalStatisRequest.studentsCount,
        totalTeachers: generalStatisRequest.completedAppointmentsCount
      }

      const monthStatis = {
        labels: Object.keys(getMonthlyStatis.data),
        students: Object.keys(getMonthlyStatis.data)?.map(ele => getMonthlyStatis.data[ele].students),
        teachers: Object.keys(getMonthlyStatis.data)?.map(ele => getMonthlyStatis.data[ele].teachers)
      }

      setStats(generalInfo);
      setMonthlyStats(monthStatis);
    } else if (activeTab === "students") {
      const getStudentsByGradeStatis = await (await api.get(
        "/api/admin/students-by-class"
        ,
        {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;

      const studentsChartData = {
        labels: getStudentsByGradeStatis.data.map(ele => getGradeNameByNumber(ele["class"])).filter(e => e),
        data: getStudentsByGradeStatis.data.map(ele => ele.count)
      }

      setStudentsByGrade(studentsChartData);
    } else if (activeTab === "lessons") {
      const getCompletedLessonsBySubjectStatis = await (await api.post(
        "/api/admin/stats-by-date-range"
        , {}
        ,
        {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;

      const lessonsBySubject = {
        lessonsNumberData: getCompletedLessonsBySubjectStatis.data.map(ele => ele.lessonsCount),
        lessonsAwardsData: getCompletedLessonsBySubjectStatis.data.map(ele => ele.totalRevenue),
        labels: getCompletedLessonsBySubjectStatis.data.map(ele => ele.subject)
      }

      setLessonsBySubject(lessonsBySubject);
    } else {
      const getTeachersByGradeStatis = await (await api.get(
        "/api/admin/teachers-by-class"
        , {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;

      const getTeacherStatis = await (await api.get(
        "/api/admin/stats-by-teacher"
        , {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;


      const teachersByGrade = {
        labels: getTeachersByGradeStatis.data.map(ele => getGradeNameByNumber(ele["class"])),
        data: getTeachersByGradeStatis.data.map(ele => ele.count)
      }

      const activeTeachers = getTeacherStatis.data;

      setActiveTeachers(activeTeachers);

      setTeachersByGrade(teachersByGrade);
    }
  }

  const applyFilter = async () => {
    try {
      const { adminToken } = localStorage;

      let sendFilters = {};

      if (filters.subject !== "all") {
      }

      if (filters.dateRange.end !== "" && filters.dateRange.start !== "") {
        if (new Date(filters.dateRange.end) < new Date(filters.dateRange.start)) {
          [filters.dateRange.start, filters.dateRange.end] = [filters.dateRange.end, filters.dateRange.start];
        }
        sendFilters.startDate = formatDate(new Date(filters.dateRange.start).toLocaleDateString("en-US"));
        sendFilters.endDate = formatDate(new Date(filters.dateRange.end).toLocaleDateString("en-US"));
      }

      const getCompletedLessonsBySubjectStatis = await (await api.post(
        "/api/admin/stats-by-date-range"
        ,
        sendFilters
        ,
        {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;

      let lessonsNumberData = getCompletedLessonsBySubjectStatis.data.map(ele => ele.lessonsCount);
      let lessonsAwardsData = getCompletedLessonsBySubjectStatis.data.map(ele => ele.totalRevenue);
      let labels = getCompletedLessonsBySubjectStatis.data.map(ele => ele.subject);

      if (filters.subject !== "all") {
        labels = labels.filter(label => label === filters.subject)
      }

      setLessonsBySubject({
        labels,
        lessonsAwardsData,
        lessonsNumberData
      });

    } catch (e) {
      toast.error(e);
      console.log(e);
    }

  }

  useEffect(() => {
    try {
      applyFilter();
    } catch (error) {
      console.log(error)
    }
    console.log(1);
  }, [filters])

  useEffect(() => {
    setIsLoading(true);

    try {
      fetchData();
    } catch (e) {
      console.log(e);
      toast.error(e.messege);
    }

    setIsLoading(false);

  }, [activeTab])

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleDateRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [type]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">إحصائيات شاملة</h1>
          <p className="text-gray-600">عرض احصائيات شاملة عن النظام</p>
        </div>

        <TabsMenu
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />

        <div>

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
                {activeTab === 'overview' && <RenderOverview
                  stats={stats}
                  monthlyStats={monthlyStats}
                  chartOptions={chartOptions}
                />}

                {activeTab === 'students' && <RenderStudentsStats
                  studentsByGrade={studentsByGrade}
                  chartOptions={chartOptions}
                />}

                {activeTab === 'lessons' && <RenderLessonsStats
                  lessonsBySubject={lessonsBySubject}
                  handleDateRangeChange={handleDateRangeChange}
                  handleFilterChange={handleFilterChange}
                  filters={filters}
                  chartOptions={chartOptions}
                  setFilters={setFilters}
                />}

                {activeTab === 'teachers' && <RenderTeacherStats
                  teachersByGrade={teachersByGrade}
                  chartOptions={chartOptions}
                  activeTeachers={activeTeachers}
                />}
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
