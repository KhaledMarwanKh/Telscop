import { FiCalendar, FiClock, FiEdit, FiRepeat, FiX } from 'react-icons/fi'

const RenderBookingCard = ({
    formatDate
    , formatTime
    , booking
    , statusBadge
    , handleBookAgain
    , handleCancelBooking,
    handleRescheduleBooking
}) => {
    return (
        <div key={booking.id} className={`bg-white rounded-lg shadow-sm p-6 border-r-4 ${booking.status === 'upcoming' ? 'border-primary' :
            booking.status === 'completed' ? 'border-secondary' :
                'border-red-600'
            }`}>
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 space-x-reverse flex-1">
                    <img
                        src={booking.teacherImage}
                        alt={booking.teacherName}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                            {booking.teacherName}
                        </h3>
                        <p className="text-primary mb-2">{booking.subject}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <FiCalendar className="w-4 h-4" />
                                <span>{formatDate(booking.date)}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <FiClock className="w-4 h-4" />
                                <span>{formatTime(booking.time)}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <span>{booking.price.toLocaleString()} ل.س</span>
                            </div>
                        </div>

                        {booking.notes && (
                            <p className="text-sm text-gray-600 mb-3">
                                <strong>ملاحظات:</strong> {booking.notes}
                            </p>
                        )}

                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                            {statusBadge.text}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2">
                    {booking.status === 'upcoming' && (
                        <>
                            <button
                                onClick={() => handleRescheduleBooking(booking.id)}
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2 space-x-reverse"
                            >
                                <FiEdit className="w-4 h-4" />
                                <span>تعديل</span>
                            </button>
                            <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center space-x-2 space-x-reverse"
                            >
                                <FiX className="w-4 h-4" />
                                <span>إلغاء</span>
                            </button>
                        </>
                    )}

                    {booking.status === 'completed' && (
                        <>
                            <button
                                onClick={() => handleBookAgain(booking.teacherId)}
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2 space-x-reverse"
                            >
                                <FiRepeat className="w-4 h-4" />
                                <span>حجز مرة أخرى</span>
                            </button>
                        </>
                    )}

                    {booking.status === 'cancelled' && (
                        <button
                            onClick={() => handleBookAgain(booking.teacherId)}
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