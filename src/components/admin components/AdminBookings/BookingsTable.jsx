import React from 'react'
import { FiX } from 'react-icons/fi';
import { formatTime,formatDate, getGradeNameByNumber } from '../../../data/assests';

const BookingsTable = (
    {
        handleCancelBooking,
        filteredBookings,
        getStatusBadge,
    }
) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-center">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">الطالب</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">المعلم</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">المادة والصف</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">التاريخ والوقت</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">المدة</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">التكلفة</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">تاريخ الحجز</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">الحالة</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">إجراءات</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredBookings?.map((booking) => {
                        const statusBadge = getStatusBadge(
                            (booking?.isCompleted) ? "completed"
                                : (booking?.cancelled) ? "cancelled"
                                    : "confirmed"
                        );
                        return (
                            <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-3 space-x-reverse">
                                        <img
                                            src={booking?.userId?.image}
                                            alt=""
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="text-sm font-medium text-gray-900">{booking?.userId?.name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-3 space-x-reverse">
                                        <div className="text-sm font-medium text-gray-900">{booking?.teacherId?.name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{booking?.subject}</div>
                                        <div className="text-sm text-gray-500">{getGradeNameByNumber(booking?.userId?.Class)}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{formatDate(booking?.slotDate?.split("T")[0])}</div>
                                        <div className="text-sm text-gray-500">{formatTime(booking?.slotTime)}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-900">{60} دقيقة</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-emerald-600">
                                        {booking.price} ل.س
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-900">
                                        {formatDate(new Date(booking?.createdAt).toLocaleDateString('en-US'))}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusBadge.color}`}>
                                        {statusBadge.text}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                                        {(!booking?.isCompleted && !booking?.cancelled) && (
                                            <button
                                                onClick={() => handleCancelBooking(booking?._id)}
                                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                                title="إلغاء الحجز"
                                            >
                                                <FiX className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default BookingsTable