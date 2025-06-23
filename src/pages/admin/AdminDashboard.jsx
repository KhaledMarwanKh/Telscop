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

import {
  adminProfile as ap, studentsByGrade as sbg, lessonsBySubject as lbs, teachersByGrade as tbg,
  activeTeachers as at, subjects, monthlyStats as ms
} from '../../data/adminMockData';

import RenderOverview from '../../components/admin components/Dashboared/RenderOverview';
import Header from '../../components/admin components/Dashboared/Header';
import NavigationMenu from '../../components/admin components/Dashboared/NavigationMenu';
import TabsMenu from '../../components/admin components/Dashboared/TabsMenu';
import RenderTeacherStats from '../../components/admin components/Dashboared/RenderTeacherStats';
import RenderLessonsStats from '../../components/admin components/Dashboared/RenderLessonsStats';
import RenderStudentsStats from '../../components/admin components/Dashboared/RenderStudentsStats';

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
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    subject: 'all',
    dateRange: {
      start: '',
      end: ''
    }
  });

  const [admin, setAdmin] = useState({ n: 1 });

  const [monthlyStats, setMonthlyStats] = useState({ n: 1 });

  const [studentsByGrade, setStudentsByGrade] = useState({ n: 1 });

  const [lessonsBySubject, setLessonsBySubject] = useState({ n: 1 });

  const [teachersByGrade, setTeachersByGrade] = useState({ n: 1 });

  const [activeTeachers, setActiveTeachers] = useState({ n: 1 });

  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalLessons: 0,
    totalStudents: 0,
    totalTeachers: 0
  })

  useEffect(() => {
    setAdmin(ap);
  }, [])

  useEffect(() => {
    setMonthlyStats(ms);
  }, [])

  useEffect(() => {
    setActiveTeachers(at);
  }, [])

  useEffect(() => {
    setLessonsBySubject(lbs);
    setStats(prev => (
      { ...prev, totalLessons: lbs.data.reduce((sum, count) => sum + count, 0) }
    ))
  }, [])

  useEffect(() => {
    setStudentsByGrade(sbg);
    setStats(prev => (
      { ...prev, totalStudents: sbg.data.reduce((sum, count) => sum + count, 0) }
    ))
  }, [])

  useEffect(() => {
    setTeachersByGrade(tbg);
    setStats(prev => (
      { ...prev, totalTeachers: tbg.data.reduce((sum, count) => sum + count, 0) }
    ))
  }, [])

  useEffect(() => {
    setStats(prev => (
      { ...prev, totalEarnings: at.reduce((sum, teacher) => sum + teacher.totalEarnings, 0) }
    ))
  }, [])

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

  // Students by grade chart data
  const studentsChartData = {
    labels: studentsByGrade.labels,
    datasets: [
      {
        label: 'عدد الطلاب',
        data: studentsByGrade.data,
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Lessons by subject chart data (filtered)
  const getFilteredLessonsData = () => {
    let data = lessonsBySubject.data;
    let labels = lessonsBySubject.labels;

    if (filters.subject !== 'all') {
      const subjectIndex = subjects.findIndex(s => s.key === filters.subject) - 1;
      if (subjectIndex >= 0) {
        data = [data[subjectIndex]];
        labels = [labels[subjectIndex]];
      }
    }

    return {
      labels,
      datasets: [
        {
          label: 'الدروس المكتملة',
          data,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const teachersChartData = {
    labels: teachersByGrade.labels,
    datasets: [
      {
        label: 'عدد المعلمين',
        data: teachersByGrade.data,
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Monthly stats chart data
  const monthlyChartData = {
    labels: monthlyStats.labels,
    datasets: [
      {
        label: 'الطلاب',
        data: monthlyStats.students,
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
      {
        label: 'المعلمين',
        data: monthlyStats.teachers,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'الدروس',
        data: monthlyStats.lessons,
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 1,
      },
    ],
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

      <Header
        isProfileMenuOpen={isProfileMenuOpen}
        admin={admin}
        setIsProfileMenuOpen={setIsProfileMenuOpen}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">لوحة تحكم الإدارة</h1>
          <p className="text-gray-600">إحصائيات شاملة ونظرة عامة على النظام</p>
        </div>

        <NavigationMenu />


        <TabsMenu
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />

        <div>
          {activeTab === 'overview' && <RenderOverview
            monthlyChartData={monthlyChartData}
            stats={stats}
            chartOptions={chartOptions}
          />}

          {activeTab === 'students' && <RenderStudentsStats
            chartOptions={chartOptions}
            studentsChartData={studentsChartData}
          />}

          {activeTab === 'lessons' && <RenderLessonsStats
            getFilteredLessonsData={getFilteredLessonsData}
            handleDateRangeChange={handleDateRangeChange}
            handleFilterChange={handleFilterChange}
            filters={filters}
            chartOptions={chartOptions}
          />}

          {activeTab === 'teachers' && <RenderTeacherStats
            teachersChartData={teachersChartData}
            chartOptions={chartOptions}
            activeTeachers={activeTeachers}
          />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;