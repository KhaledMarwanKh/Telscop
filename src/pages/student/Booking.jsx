import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdCancel } from "react-icons/md";
import { availableDays, mockBookings, mockTeachers, timeSlots } from '../../data/mockData';
import { toast } from 'react-toastify';
import TeacherInfo from '../../components/students components/Booking/TeacherInfo';
import TeahcerBookingForm from '../../components/students components/Booking/TeahcerBookingForm';

const Booking = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [avialableTimeSolt, setAvailableTimeSlot] = useState([]);
  const [availableDay, setAvailableDays] = useState([]);

  useEffect(() => {
    const foundTeacher = mockTeachers.find(t => t.id === parseInt(teacherId));
    if (foundTeacher) {
      setTeacher(foundTeacher);
    } else {
      toast.error('المعلم غير موجود');
      navigate('/teachers');
    }
  }, [teacherId, navigate]);

  useEffect(() => {
    if (!localStorage.getItem('booking_id')) {
      const teacherBookingsTimes = mockBookings.filter(booking => parseInt(booking.teacherId) === parseInt(teacherId) && booking.status === 'upcoming')
        .map(booking => booking.time);

      const avialableTimeSolts = timeSlots.filter(time => !teacherBookingsTimes.includes(time.value))

      setAvailableTimeSlot(avialableTimeSolts)
    } else {
      setAvailableTimeSlot(timeSlots);
    }
  }, [teacherId])

  useEffect(() => {
    if (!localStorage.getItem('booking_id')) {
      const teacherBookingsDays = mockBookings.filter(booking => parseInt(booking.teacherId) === parseInt(teacherId) && booking.status === 'upcoming')
        .map(booking => booking.date);

      const availableDay = availableDays.filter(date => !teacherBookingsDays.includes(date.date));

      setAvailableDays(availableDay);
    } else {
      setAvailableDays(availableDays);
    }
  }, [teacherId])

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!selectedDate) {
      toast.error('يرجى اختيار التاريخ');
      return;
    }

    if (!selectedTime) {
      toast.error('يرجى اختيار الوقت');
      return;
    }

    const isHeCanBooking = mockBookings.filter(booking => booking.date === selectedDate && booking.time === selectedTime && parseInt(teacherId) !== parseInt(booking.teacherId));
    console.log(isHeCanBooking)
    if (Boolean(isHeCanBooking.length)) {
      toast.warning(`لديك درس  ${isHeCanBooking[0].subject} عند ${isHeCanBooking[0].teacherName} في هذا الموعد`);
      return;
    }

    if (localStorage.getItem('booking_id')) {
      const { booking_id } = localStorage;

      mockBookings[parseInt(booking_id) - 1].time = selectedTime;

      mockBookings[parseInt(booking_id) - 1].date = selectedDate;

      toast.success("تم تعديل الموعد بنجاح");

      localStorage.clear()

      navigate('/bookings')

      return;
    }

    // Simulate booking process
    toast.success('تم حجز الدرس بنجاح! سيتم التواصل معك قريباً');

    const formData = {
      id: mockBookings.length + 1,
      teacherId,
      date: selectedDate,
      time: selectedTime,
      subject: teacher.subject,
      teacherName: teacher.name,
      teacherImage: teacher.image,
      price: teacher.price,
      status: 'upcoming',
      notes
    }

    mockBookings.push(formData);

    navigate('/bookings');
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

      <MdCancel className='text-3xl absolute left-0 cursor-pointer' onClick={() => navigate('/teachers')} />

      <div className="bg-white rounded-lg shadow-sm p-8">

        <h1 className="text-3xl font-bold mb-8 text-gray-800">حجز درس خصوصي</h1>


        <TeacherInfo teacher={teacher} />


        <TeahcerBookingForm
          handleBooking={handleBooking}
          handleTimeSelect={handleTimeSelect}
          teacher={teacher}
          timeSlots={timeSlots}
          availableDay={availableDay}
          avialableTimeSolt={avialableTimeSolt}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          setNotes={setNotes}
          setSelectedDate={setSelectedDate}
          notes={notes}
        />

      </div>
    </div>
  );
};

export default Booking;
