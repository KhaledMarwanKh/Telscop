import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RenderBookingCard from '../../components/students components/Teachers/RenderBookingCard';
import ActiveTabStatus from '../../components/students components/Bookings Page/ActiveTabStatus';
import BookingsStat from '../../components/students components/Bookings Page/BookingsStat';
import BookingsTabs from '../../components/students components/Bookings Page/BookingsTabs';
import LocationMap from '../../components/students components/Bookings Page/LocationMap.jsx/LocationMap';
import { FiX } from 'react-icons/fi';
import { formatDate, formatTime, getDayInArabic, getDayKeyByNumber, getStatusBadge, getTimeSlotId } from '../../data/assests';
import api from '../../lib/api';

const Bookings = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  const [activeTab, setActiveTab] = useState('upcoming');

  const [prevUpcomingBookings ,setPrevUpcomingBookings] = useState([]);

  const [upcomingBookings, setUpComingBookings] = useState([]);

  const [showOnMap, setShowOnMap] = useState(false);

  const [isBookingsLoading, setIsBookingsLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [dayFilter, setDayFilter] = useState("all");

  const [timeFilter, setTimeFilter] = useState("all");

  const [teachGeo, setTeachGeo] = useState({
    lat: 0,
    lng: 0
  })

  const [studentLocation, setStudentLocation] = useState({
    lat: 0,
    lgt: 0
  })

  const applyFilters = async () => {
    if (activeTab === "upcoming") {
      const { userToken } = localStorage;
      let bookings = await (await api.get(
        "/api/user/current-appointments"
        , {
          headers: {
            authorization: `Bearer ${userToken}`
          }
        }
      )).data;

      if (dayFilter === "all" && timeFilter === "all"){
        setPrevUpcomingBookings(bookings?.data);
      }

      setUpComingBookings(bookings?.data?.filter((booking) => {
        if (dayFilter !== "all" && timeFilter !== "all") {
          return getDayInArabic(getDayKeyByNumber(new Date(booking.slotDate).getDay())) === dayFilter && formatTime(booking.slotTime) === timeFilter;
        } else if (dayFilter !== "all") {
          return getDayInArabic(getDayKeyByNumber(new Date(booking.slotDate).getDay())) === dayFilter;
        } else if (timeFilter !== "all") {
          return formatTime(booking.slotTime) === timeFilter;
        }else{
          return true;
        }
      }));
    }
  }

  useEffect(() => {
    setIsBookingsLoading(true);
    try {
      applyFilters();
    } catch (error) {
      toast.error(error.response.data.message)
    }
    setIsBookingsLoading(false);
  }, [dayFilter, timeFilter,activeTab])

  useEffect(() => {
    const update = async () => {
      try {
       if (activeTab !== "upcoming"){
         setDayFilter("all");

        setTimeFilter("all");

        setIsBookingsLoading(true);

        const { userToken } = localStorage;

        let bookings;

        if (activeTab === "completed") {

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
          setIsBookingsLoading(false);
        }
       }
      } catch (e) {
        setIsBookingsLoading(false);
        toast.error(e.response.data.message);
      }
    }

    update();
  }, [activeTab])


  useEffect(() => {
    const fetchLocation = async () => {
      if (isLoading) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
              setStudentLocation({
                lat: latitude,
                lgt: longitude
              })
            },
            (error) => {
              console.log(error);
            },
            {
              enableHighAccuracy: true,
              timeout: 1000000
            }
          );
        }
      }
    }

    fetchLocation();
    setIsLoading(false);
  }, [isLoading]);

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
      toast.error(e.response.data.message);
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
      toast.error(e.response.data.message);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">حجوزاتي</h1>

      <BookingsTabs
        activeTab={activeTab}
        bookings={bookings}
        setActiveTab={setActiveTab}
      />

      {
        activeTab === "upcoming" && (
          <div className='w-full grid md:grid-cols-2 gap-5 my-5 shadow-lg bg-white px-2 py-3'>
            <select onChange={(e) => setDayFilter(e.target.value)} className='px-2 py-3' value={dayFilter} name="day" id="">
              <option value="all">اختر اليوم</option>
              {
                [...new Set(prevUpcomingBookings?.map(booking => booking.slotDate))]
                  ?.sort((a, b) => new Date(a).getDay() - new Date(b).getDay())
                  ?.map(date => getDayInArabic(getDayKeyByNumber(new Date(date).getDay())))
                  ?.map(day => (
                    <option value={day}>
                      {day}
                    </option>
                  ))
              }
            </select>

            <select onChange={(e) => setTimeFilter(e.target.value)} className='px-2 py-3' value={timeFilter} name="time" id="">
              <option value="all">اختر الوقت</option>
              {
                [...new Set(prevUpcomingBookings?.map(booking => booking.slotTime))]
                  ?.sort((a, b) => getTimeSlotId(a) - getTimeSlotId(b))
                  ?.map(time => formatTime(time))
                  ?.map(time => (
                    <option value={time}>
                      {time}
                    </option>
                  ))
              }
            </select>
          </div>
        )
      }

      {
        !isBookingsLoading ?
          (
            <div className="space-y-6">
              {
                (activeTab === "upcoming" ? upcomingBookings : bookings).length === 0 ? (
                  <ActiveTabStatus time={timeFilter === "all" ? "" : "الساعة" + timeFilter} day={dayFilter === "all" ? "قادمة" : dayFilter} activeTab={activeTab} />
                ) : (
                  <>
                    {
                      activeTab !== "upcoming" ? (
                        <>
                          {(
                            bookings?.sort((a, b) => {
                              if (new Date(a.slotDate) === new Date(b.slotDate)) {
                                return getTimeSlotId(a.slotTime) - getTimeSlotId(b.slotTime)
                              } else {
                                return new Date(a.slotDate) - new Date(b.slotDate);
                              }
                            })
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
                        </>
                      ) : (
                        upcomingBookings?.sort((a, b) => {
                          if (new Date(a.slotDate) === new Date(b.slotDate)) {
                            return getTimeSlotId(a.slotTime) - getTimeSlotId(b.slotTime)
                          } else {
                            return new Date(a.slotDate) - new Date(b.slotDate);
                          }
                        })?.map((booking) => (
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
                      )
                    }
                  </>
                )
              }
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

      {activeTab === 'upcoming' && upcomingBookings?.length > 0 && (
        <BookingsStat bookings={upcomingBookings} />
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
