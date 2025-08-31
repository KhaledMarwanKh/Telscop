import { useEffect, useState } from 'react';
import {
  FiCalendar,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import FilterTab from '../../components/admin components/AdminBookings/FilterTab';
import StatisBar from '../../components/admin components/AdminBookings/StatisBar';
import BookingsTable from '../../components/admin components/AdminBookings/BookingsTable';
import api from '../../lib/api';
import { getTimeSlotId } from '../../data/assests';
import { useNavigate } from "react-router-dom";

const AdminBookings = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    completedBookings: 0,
    confirmedBookings: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const applyFilters = async () => {
    try {
      let bookings = [];

      const { adminToken } = localStorage;

      const getBookingsRequest = await (await api.get(
        "/api/admin/appointments",
        {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;

      bookings = getBookingsRequest.data;

      bookings = bookings
        ?.sort((a, b) => new Date(a.slotDate) - new Date(b.slotDate));

      if (subjectFilter !== "all") {
        bookings = bookings.filter(booking => booking?.subject === subjectFilter);
      }

      if (statusFilter !== "all") {
        if (statusFilter === "completed") {
          bookings = bookings.filter(booking => booking.isCompleted);
        }
        else if (statusFilter === "cancelled") {
          bookings = bookings.filter(booking => booking.cancelled);
        }
        else {
          bookings = bookings.filter(booking => !booking.cancelled && !booking.isCompleted);
        }

      }
      if (subjectFilter === "all" && statusFilter === "all") {
        updateStatis(bookings);
      }
      setFilteredBookings(bookings);

    } catch (error) {

    }
  };

  const updateStatis = (bookings) => {
    setStats({
      totalBookings: bookings.length,
      totalRevenue: bookings?.reduce((a, b) => a + (b?.price * 5 / 100)),
      completedBookings: bookings.filter(booking => booking.isCompleted).length,
      confirmedBookings: bookings.filter(booking => !booking.cancelled && !booking.isCompleted).length
    })
  }

  useEffect(() => {
    setIsLoading(true);
    try {
      applyFilters();
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false)
  }, [statusFilter, subjectFilter])

  const handleCancelBooking = async (bookingId) => {
    const { adminToken } = localStorage;

    try {
      const cancelBookingRequest = await (await api.post(
        '/api/admin/cancel-appointment'
        ,
        {
          "appointmentId": bookingId
        }
        ,
        {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;

      if (cancelBookingRequest.success === true) {
        toast.success("تم الغاء الحجز بنجاح");
      }

      applyFilters();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: { color: 'bg-yellow-100 text-yellow-800', text: 'مؤكد' },
      completed: { color: 'bg-green-100 text-green-800', text: 'مكتمل' },
      cancelled: { color: 'bg-red-100 text-red-800', text: 'ملغي' }
    };
    return badges[status];
  };

  return (
    <div className="min-h-screen bg-gray-50">

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

        {
          isLoading ? (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="text-6xl mb-4">⏳</div>
                <h2 className="text-xl font-semibold text-gray-600">جاري التحميل...</h2>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">قائمة الحجوزات ({filteredBookings.length})</h3>
              </div>

              <BookingsTable
                handleCancelBooking={handleCancelBooking}
                filteredBookings={filteredBookings}
                getStatusBadge={getStatusBadge}
              />

              {
                filteredBookings.length === 0 && (
                  <div className="text-center py-12">
                    <FiCalendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد نتائج</h3>
                    <p className="text-gray-500">لم يتم العثور على حجوزات مطابقة لمعايير البحث</p>
                  </div>
                )
              }
            </div >
          )
        }
      </div>
    </div>
  );
};

export default AdminBookings;