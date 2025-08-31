import { FiCalendar, FiClock, FiEdit, FiMapPin, FiRepeat, FiX } from 'react-icons/fi'

const RenderBookingCard = ({
    formatDate
    , formatTime
    , booking
    , statusBadge
    , handleBookAgain
    , handleCancelBooking
    , handleRescheduleBooking
    , handleShowLocation
}) => {

    return (
        <div key={booking?._id} className={`bg-white rounded-lg shadow-sm p-6 border-r-4 ${booking?.isCompleted === false && booking?.cancelled === false ? 'border-primary' :
            booking?.isCompleted === true ? 'border-secondary' :
                'border-red-600'
            }`}>
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 space-x-reverse flex-1">
                    <img
                        src={booking?.teacherId?.image}
                        alt={booking?.teacherId?.name}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                            {booking?.teacherId?.name}
                        </h3>
                        <p className="text-primary mb-2">{booking?.subject}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <FiCalendar className="w-4 h-4" />
                                <span>{(booking.slotDate.includes("-")) ? booking.slotDate.split("T")[0] : formatDate(booking?.slotDate)}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <FiClock className="w-4 h-4" />
                                <span>{formatTime(booking?.slotTime)}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <span>{booking?.price?.toLocaleString()} ل.س</span>
                            </div>
                        </div>

                        {booking?.nots && (
                            <p className="text-sm text-gray-600 mb-3">
                                <strong>ملاحظات:</strong> {booking?.nots}
                            </p>
                        )}

                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                            {statusBadge.text}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2">
                    {booking?.isCompleted === false && booking?.cancelled === false && (
                        <>
                            <button
                                onClick={() => handleRescheduleBooking(booking?._id, booking?.teacherId?._id)}
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-2 space-x-reverse"
                            >
                                <FiEdit className="w-4 h-4" />
                                <span>تعديل</span>
                            </button>

                            <button
                                onClick={() => handleShowLocation(booking?.teacherId?._id)}
                                className='bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex gap-2 items-center space-x-2 space-x-reverse' >
                                <FiMapPin />
                                عرض موقع
                            </button>

                            <button
                                onClick={() => handleCancelBooking(booking?._id)}
                                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center justify-center space-x-2 space-x-reverse"
                            >
                                <FiX className="w-4 h-4" />
                                <span>إلغاء</span>
                            </button>
                        </>
                    )}

                    {booking?.isCompleted === true && (
                        <>
                            <button
                                onClick={() => handleBookAgain(booking?.teacherId?._id)}
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2 space-x-reverse"
                            >
                                <FiRepeat className="w-4 h-4" />
                                <span>حجز مرة أخرى</span>
                            </button>
                        </>
                    )}

                    {booking?.cancelled === true && (
                        <button
                            onClick={() => handleBookAgain(booking?.teacherId?._id)}
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2 space-x-reverse"
                        >
                            <FiRepeat className="w-4 h-4" />
                            <span>حجز مرة أخرى</span>
                        </button>
                    )}
                </div>
            </div>
        </div>

    )
}

export default RenderBookingCard