import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLoaderData } from 'react-router-dom';
import { MdCancel } from "react-icons/md";
import { toast } from 'react-toastify';
import TeacherInfo from '../../components/students components/Booking/TeacherInfo';
import TeahcerBookingForm from '../../components/students components/Booking/TeahcerBookingForm';
import { formatDate, getDayKeyByNumber, getNextDayDate } from '../../data/assests';
import api from '../../lib/api';

const Booking = () => {
  const teacherInfo = useLoaderData();
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [avTimes, setAvTimes] = useState([]);
  const [slotsBooked, setSlotsBooked] = useState([]);
  const [selectedDay, setSelectedDay] = useState(teacherInfo.availableTimes[0].day);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateState, setIsUpdateState] = useState(false);

  useEffect(() => {
    setTeacher(teacherInfo);

    setAvTimes(teacherInfo.availableTimes);

    const selectedDay = teacherInfo.availableTimes
      .map(e => e.day)
      .sort((a, b) => new Date(getNextDayDate(a)) - new Date(getNextDayDate(b)))[0];

    setSelectedDate(getNextDayDate(selectedDay));

    setSelectedDay(selectedDay);

  }, [teacherId, teacherInfo])

  useEffect(() => {
    if (localStorage.update) {
      setIsUpdateState(true);
    }
  }, [])

  useEffect(() => {
    if (teacherInfo?.slots_booked) {
      if (new Date(getNextDayDate(selectedDay)) < new Date()) {
        setSlotsBooked([])
      } else {
        setSlotsBooked(teacherInfo?.slots_booked[formatDate(getNextDayDate(selectedDay))])
      }
    }
  }, [teacherInfo, selectedDate, selectedDay]);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    try {

      if (!selectedDate) {
        toast.error('يرجى اختيار اليوم');
        return;
      }

      if (!selectedTime) {
        toast.error('يرجى اختيار الوقت');
        return;
      }

      const formData = {
        teacherId,
        newSlotDate: selectedDate,
        newSlotTime: selectedTime,
        subject: teacher?.subject,
        price: teacher?.price,
        notes
      }

      setIsLoading(true);

      const { userToken, bookingId } = localStorage;

      const updateBooking = await (await api.post(
        "/api/user/update-appointment"
        , { ...formData, "appointmentId": bookingId }
        , {
          headers: {
            authorization: `Bearer ${userToken}`
          }
        }
      )).data;


      if (updateBooking.success === true) {
        setIsLoading(false);
        setIsUpdateState(false);
        toast.success("تم تحديث الحجز بنجاح");
        navigate("/bookings");
      }

      if (localStorage.update) {
        localStorage.removeItem("update");
      }
      if (localStorage.bookingId) {
        localStorage.removeItem("bookingId");
      }

    } catch (e) {
      toast.error(e.message);
      if (localStorage.update) {
        localStorage.removeItem("update");
      }
      if (localStorage.bookingId) {
        localStorage.removeItem("bookingId");
      }
      setIsLoading(false);
    }
  }

  const handleDateSelect = (e) => {
    setSelectedDate(e.target.value);
    setSelectedDay(getDayKeyByNumber(new Date(e.target.value).getDay()));
  }

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!selectedDate) {
      toast.error('يرجى اختيار اليوم');
      return;
    }

    if (!selectedTime) {
      toast.error('يرجى اختيار الوقت');
      return;
    }

    const formData = {
      teacherId,
      slotDate: formatDate(selectedDate),
      slotTime: selectedTime,
      subject: teacher?.subject,
      price: teacher?.price,
      notes
    }

    console.log(formData, "book");

    try {
      const { userToken } = localStorage;

      setIsLoading(true);
      const bookingRequest = await (await api.post(
        "/api/user/book-appointment",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`
          }
        }
      )).data;

      if (bookingRequest.success === true) {
        setIsLoading(false);
        toast.success("تم حجز الدرس بنجاح");
        navigate("/bookings");
      }
    } catch (e) {
      toast.error(e.message);
      setIsLoading(false);
      setSelectedTime("");
    }
  };

  if (!teacher) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-xl font-semibold text-gray-600">جاري التحميل...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">

      <MdCancel className='text-3xl absolute left-0 cursor-pointer' onClick={() => {
        navigate('/teachers')
        if (localStorage.update) {
          localStorage.removeItem("update");
        }
        if (localStorage.bookingId) {
          localStorage.removeItem("bookingId");
        }
      }} />

      <div className="bg-white rounded-lg shadow-sm p-8">

        <h1 className="text-3xl font-bold mb-8 text-gray-800">حجز درس خصوصي</h1>


        <TeacherInfo teacher={teacher} />


        <TeahcerBookingForm
          handleBooking={handleBooking}
          handleTimeSelect={handleTimeSelect}
          teacher={teacher}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          setNotes={setNotes}
          notes={notes}
          handleDateSelect={handleDateSelect}
          avTimes={avTimes}
          slotsBooked={slotsBooked}
          selectedDay={selectedDay}
          isLoading={isLoading}
          isUpdateState={isUpdateState}
          handleUpdateBooking={handleUpdateBooking}
        />

      </div>
    </div>
  );
};

export const getTeacherInfo = async ({ params: { teacherId } }) => {
  try {
    const { userToken } = localStorage;

    const teacherInfo = await (await api.get(
      "/api/user/get-teacher"
      ,
      {
        headers: {
          authorization: `Bearer ${userToken}`
        },
        params: {
          teacherId
        }
      }
    )).data;

    if (teacherInfo.success === true) {
      return teacherInfo.data;
    }
  } catch (e) {
    toast.error(e.message);
  }
}

export default Booking;
