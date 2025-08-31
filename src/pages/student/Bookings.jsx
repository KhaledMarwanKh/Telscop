import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RenderBookingCard from '../../components/students components/Teachers/RenderBookingCard';
import ActiveTabStatus from '../../components/students components/Bookings Page/ActiveTabStatus';
import BookingsStat from '../../components/students components/Bookings Page/BookingsStat';
import BookingsTabs from '../../components/students components/Bookings Page/BookingsTabs';
import LocationMap from '../../components/students components/Bookings Page/LocationMap.jsx/LocationMap';
import { FiX } from 'react-icons/fi';
import { formatDate, formatTime, getGeoLocation, getStatusBadge, getTimeSlotId } from '../../data/assests';
import api from '../../lib/api';

const Bookings = () => {
  const navigate = useNavigate();

  const [todayBoookings, setTodayBookings] = useState([]);

  const [showTodayBooking, setShowTodayBookings] = useState(false);

  const [bookings, setBookings] = useState([]);

  const [activeTab, setActiveTab] = useState('upcoming');

  const [showOnMap, setShowOnMap] = useState(false);

  const [isBookingsLoading, setIsBookingsLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [teachGeo, setTeachGeo] = useState({
    lat: 0,
    lng: 0
  })

  const [studentLocation, setStudentLocation] = useState({
    lat: 0,
    lgt: 0
  })

  useEffect(() => {
    const update = async () => {
      try {

        setIsBookingsLoading(true);

        const { userToken } = localStorage;

        let bookings;

        if (activeTab === "upcoming") {

          bookings = await (await api.get(
            "/api/user/current-appointments"
            , {
              headers: {
                authorization: `Bearer ${userToken}`
              }
            }
          )).data;

        } else if (activeTab === "completed") {

          bookings = await (await api.get(
            "/api/user/completed-appointments"
            , {
              headers: {
                authorization: `Bearer ${userToken}`
              }
            }
          )).data;

        } else {
          bookings = await (await api.get(
            "/api/user/cancelled-appointments"
            , {
              headers: {
                authorization: `Bearer ${userToken}`
              }
            }
          )).data;
        }

        if (bookings.success === true) {
          setBookings(
            bookings.data
              .sort((a, b) => new Date(a.slotDate.split("T")[0]) - new Date(b.slotDate.split("T")[0]))
          );
          setTodayBookings(
            bookings.data
              ?.filter(booking => booking.slotDate.split("T")[0] === formatDate(new Date().toLocaleDateString("en-US")))
              ?.sort((a, b) => getTimeSlotId(a.slotTime) - getTimeSlotId(b.slotTime))
          );
          setIsBookingsLoading(false);
        }
      } catch (e) {
        setIsBookingsLoading(false);
        toast.error(e.message);
      }
    }

    update();
  }, [activeTab])


  useEffect(() => {
    const fetchLocation = async () => {
      if (isLoading) {
        const geo = await getGeoLocation();

        setStudentLocation(
          {
            lat: geo[1],
            lgt: geo[0]
          }
        );
      }
    }

    fetchLocation();
  }, [isLoading])

  const handleCancelBooking = async (bookingId) => {
    const { userToken } = localStorage;

    try {

      const cancelBookingRequest = await (await api.post(
        '/api/user/cancel-appointment'
        ,
        {
          "appointmentId": bookingId
        }
        ,
        {
          headers: {
            authorization: `Bearer ${userToken}`
          }
        }
      )).data;

      if (cancelBookingRequest.success === true) {
        toast.success("تم الغاء الحجز بنجاح");
        setActiveTab("cancelled");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleRescheduleBooking = (bookingId, teacherId) => {
    toast.info('سيتم تحويلك لصفحة إعادة الجدولة');
    localStorage.setItem("update", true);
    localStorage.setItem("bookingId", bookingId);
    navigate('/booking/' + teacherId);
  };

  const handleBookAgain = (teacherId) => {
    toast.info('سيتم تحويلك لصفحة الحجز');
    console.log(teacherId)
    navigate('/booking/' + teacherId);
  };

  const handleShowLocation = async (teacherId) => {
    try {
      const { userToken } = localStorage;

      const teacherLocation = await (await api.get(
        "/api/user/get-teacher"
        , {
          headers: {
            authorization: `Bearer ${userToken}`
          },
          params: {
            teacherId
          }
        }
      )).data;

      if (teacherLocation.success === true) {
        const { location: { coordinates: c } } = teacherLocation.data;
        setTeachGeo({
          lat: c[1]
          , lng: c[0]
        })
        setShowOnMap(true);
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">حجوزاتي</h1>

      <BookingsTabs
        activeTab={activeTab}
        bookings={showTodayBooking ? todayBoookings : bookings}
        setActiveTab={setActiveTab}
        setShowTodayBookings={setShowTodayBookings}
        showTodayBooking={showTodayBooking}
      />

      {
        !isBookingsLoading ?
          (
            <div className="space-y-6">
              {(showTodayBooking ? todayBoookings : bookings).length === 0 ? (
                <ActiveTabStatus showTodayBooking={showTodayBooking} activeTab={activeTab} />
              ) : (
                (showTodayBooking ? todayBoookings : bookings)
                  ?.sort((a, b) => new Date(a.slotDate) - new Date(b.slotDate))
                  ?.sort((a, b) => getTimeSlotId(a.slotTime) - getTimeSlotId(b.slotTime))
                  ?.map((booking) => (
                    <RenderBookingCard
                      formatDate={formatDate}
                      formatTime={formatTime}
                      booking={booking}
                      statusBadge={getStatusBadge(activeTab)}
                      handleBookAgain={handleBookAgain}
                      handleRescheduleBooking={handleRescheduleBooking}
                      handleCancelBooking={handleCancelBooking}
                      handleShowLocation={handleShowLocation}
                    />
                  ))
              )}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="text-6xl mb-4">⏳</div>
                <h2 className="text-xl font-semibold text-gray-600">جاري التحميل...</h2>
              </div>
            </div>
          )
      }

      {activeTab === 'upcoming' && bookings.length > 0 && (
        <BookingsStat bookings={bookings} />
      )}

      {
        showOnMap && (
          <div style={{
            backgroundColor: "rgba(0,0,0,0.3)"
          }} className='w-full h-full z-[40] top-0 px-4 rounded shadow-lg absolute left-0  flex items-center justify-center flex-col '>
            <FiX className='w-5 h-5 bg-white rounded-full absolute left-2 top-2 cursor-pointer' onClick={() => setShowOnMap(false)} />
            <LocationMap teacherLocation={teachGeo} studentLocation={studentLocation} />
          </div>
        )
      }

    </div>
  );
};

export default Bookings;
