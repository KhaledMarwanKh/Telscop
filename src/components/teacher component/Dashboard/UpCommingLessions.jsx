import { FiCalendar, FiClock, FiDollarSign, FiPhone, FiXCircle } from 'react-icons/fi';

const UpCommingLessions = (
    {
        getStatusBadge,
        handleCancelLesson,
        formatDate,
        upcommingLessons
    }
) => {
    return (
        <div className="w-full">
            <table className="w-full text-center">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">الطالب</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">المادة والصف</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">التاريخ والوقت</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">التكلفة</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">الملاحظات</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">الحالة</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">إجراءات</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {upcommingLessons?.sort((a, b) => new Date(a.slotDate) - new Date(b.slotDate))?.map((lesson) => {
                        const { isCompleted, cancelled } = lesson;
                        const statusBadge = getStatusBadge((isCompleted ? "completed" : cancelled ? "cancelled" : "confirmed"));
                        return (
                            <tr key={lesson.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-3 space-x-reverse">
                                        <img
                                            src={lesson.userId.image}
                                            alt={lesson.userId.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{lesson.userId.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{lesson.subject}</div>
                                    <div className="text-sm text-gray-500">الصف {lesson.userId.Class}</div>
                                </td>
                                <td className="px-6 flex flex-col items-center py-4 whitespace-nowrap">
                                    <div className="flex items-center text-sm text-gray-900 mb-1">
                                        <FiCalendar className="w-4 h-4 ml-2 text-gray-400" />
                                        {lesson.slotDate.split("T")[0]}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <FiClock className="w-4 h-4 ml-2 text-gray-400" />
                                        {lesson.slotTime} ({60} دقيقة)
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center text-sm font-medium text-blue-600">
                                        <FiDollarSign className="w-4 h-4 ml-1" />
                                        {lesson.price.toLocaleString()} ل.س
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-600 max-w-xs truncate">
                                        {lesson.nots || '-'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusBadge.color}`}>
                                        {statusBadge.text}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center justify-center gap-1 space-x-2 space-x-reverse">
                                        {!isCompleted && !cancelled && (
                                            <>
                                                <button
                                                    onClick={() => handleCancelLesson(lesson._id)}
                                                    className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                                    title="الغاء"
                                                >
                                                    <FiXCircle className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default UpCommingLessions