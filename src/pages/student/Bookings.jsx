import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockBookings, timeSlots } from '../../data/mockData';
import { toast } from 'react-toastify';
import RenderBookingCard from '../../components/students components/Teachers/RenderBookingCard';
import ActiveTabStatus from '../../components/students components/Bookings Page/ActiveTabStatus';
import BookingsStat from '../../components/students components/Bookings Page/BookingsStat';
import BookingsTabs from '../../components/students components/Bookings Page/BookingsTabs';

const Bookings = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('upcoming');

  const getBookingsByStatus = (status) => {
    return mockBookings.filter(booking => booking.status === status);
  };

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { color: 'bg-blue-100 text-blue-800', text: 'قادم' },
      completed: { color: 'bg-green-100 text-green-800', text: 'مكتمل' },
      cancelled: { color: 'bg-red-100 text-red-800', text: 'ملغي' }
    };
    return badges[status] || badges.upcoming;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const formatTime = (timeString) => {
    const slot = timeSlots.find(slot => slot.value === timeString);
    return slot ? slot.label : timeString;
  };

  const handleCancelBooking = (bookingId) => {
    toast.success('تم إلغاء الحجز بنجاح');
    mockBookings[parseInt(bookingId) - 1].status = 'cancelled'
    setActiveTab('cancelled')
  };

  const handleRescheduleBooking = (bookingId) => {
    toast.info('سيتم تحويلك لصفحة إعادة الجدولة');
    localStorage.setItem('booking_id', bookingId);
    navigate('/booking/' + mockBookings[parseInt(bookingId) - 1].teacherId)
  };

  const handleBookAgain = (teacherId) => {
    toast.info('سيتم تحويلك لصفحة الحجز');
    navigate('/booking/' + teacherId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">حجوزاتي</h1>

      <BookingsTabs
        activeTab={activeTab}
        getBookingsByStatus={getBookingsByStatus}
        setActiveTab={setActiveTab}
      />

      <div className="space-y-6">
        {getBookingsByStatus(activeTab).length === 0 ? (
          <ActiveTabStatus activeTab={activeTab} />
        ) : (
          getBookingsByStatus(activeTab).map(booking => (
            <RenderBookingCard
              formatDate={formatDate}
              formatTime={formatTime}
              booking={booking}
              statusBadge={getStatusBadge(booking.status)}
              handleBookAgain={handleBookAgain}
              handleRescheduleBooking={handleRescheduleBooking}
              handleCancelBooking={handleCancelBooking}
            />
          ))
        )}
      </div>

      {activeTab === 'upcoming' && getBookingsByStatus('upcoming').length > 0 && (
        <BookingsStat getBookingsByStatus={getBookingsByStatus} />
      )}
    </div>
  );
};

export default Bookings;
