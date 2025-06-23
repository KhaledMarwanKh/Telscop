import { useEffect, useState } from 'react';
import {
  FiCalendar,
} from 'react-icons/fi';
import { adminProfile, allBookings, subjects } from '../../data/adminMockData';
import { toast } from 'react-toastify';
import Header from '../../components/admin components/AdminBookings/Header';
import FilterTab from '../../components/admin components/AdminBookings/FilterTab';
import StatisBar from '../../components/admin components/AdminBookings/StatisBar';
import BookingsTable from '../../components/admin components/AdminBookings/BookingsTable';

const AdminBookings = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [admin, setAdmin] = useState({})
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    completedBookings: 0,
    confirmedBookings: 0
  })

  const applyFilters = () => {
    const filteredBookings = allBookings.filter(booking => {
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      const matchesSubject = subjectFilter === 'all' || booking.subject === subjects.find(s => s.key === subjectFilter)?.name;

      return matchesStatus && matchesSubject;
    });

    setStats({
      totalBookings: filteredBookings.length,
      totalRevenue: filteredBookings
        .filter(b => b.status === 'completed')
        .reduce((sum, booking) => sum + booking.price, 0),
      completedBookings: filteredBookings.filter(b => b.status === 'completed').length,
      confirmedBookings: filteredBookings.filter(b => b.status === 'confirmed').length
    })

    setFilteredBookings(filteredBookings)
  }

  useEffect(() => {
    applyFilters();
  }, [statusFilter, subjectFilter])

  useEffect(() => {
    setAdmin(adminProfile);
  }, [])

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('هل أنت متأكد من إلغاء هذا الحجز؟')) {
      setFilteredBookings(prev => prev.map(b =>
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      ));
      toast.success('تم إلغاء الحجز بنجاح');
    }
  };

  const handleViewBooking = (bookingId) => {
    toast.info(`عرض تفاصيل الحجز ${bookingId}`);
  };

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: { color: 'bg-yellow-100 text-yellow-800', text: 'مؤكد' },
      completed: { color: 'bg-green-100 text-green-800', text: 'مكتمل' },
      cancelled: { color: 'bg-red-100 text-red-800', text: 'ملغي' }
    };
    return badges[status];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">إدارة الحجوزات</h1>
          <p className="text-gray-600">عرض وإدارة جميع حجوزات الدروس في المنصة</p>
        </div>

        <FilterTab
          setStatusFilter={setStatusFilter}
          setSubjectFilter={setSubjectFilter}
          subjectFilter={subjectFilter}
          statusFilter={statusFilter}
        />

        <StatisBar
          stats={stats}
        />
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">قائمة الحجوزات ({filteredBookings.length})</h3>
          </div>

          <BookingsTable
            handleCancelBooking={handleCancelBooking}
            handleViewBooking={handleViewBooking}
            filteredBookings={filteredBookings}
            getStatusBadge={getStatusBadge}
            formatDate={formatDate}
          />

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <FiCalendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد نتائج</h3>
              <p className="text-gray-500">لم يتم العثور على حجوزات مطابقة لمعايير البحث</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;