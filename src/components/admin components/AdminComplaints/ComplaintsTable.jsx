import React from 'react'
import { FiClock, FiEye, FiMail, FiPhone } from 'react-icons/fi';

const ComplaintsTable = (
    {
        getSenderTypeBadge,
        getStatusBadge,
        formatDate,
        filteredComplaints,
        handleMarkInProgress,
        handleViewComplaint
    }
) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-center">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">المرسل</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">الموضوع</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">نوع المرسل</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">التاريخ</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">الحالة</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">إجراءات</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredComplaints.map((complaint) => {
                        const statusBadge = getStatusBadge(complaint.status);
                        const senderTypeBadge = getSenderTypeBadge(complaint.senderType);

                        return (
                            <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{complaint.senderName}</div>
                                        <div className="text-sm text-gray-500">{complaint.senderEmail}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                        {complaint.subject}
                                    </div>
                                    <div className="text-sm text-gray-500 max-w-xs truncate mt-1">
                                        {complaint.message}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${senderTypeBadge.color}`}>
                                        {senderTypeBadge.text}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-900">
                                        {formatDate(complaint.date)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusBadge.color}`}>
                                        {statusBadge.text}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center justify-center gap-1 space-x-2 space-x-reverse">
                                        <button
                                            onClick={() => handleViewComplaint(complaint)}
                                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                            title="عرض التفاصيل"
                                        >
                                            <FiEye className="w-4 h-4" />
                                        </button>
                                        <a
                                            href={`tel:${complaint.senderPhone}`}
                                            className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                            title="اتصال"
                                        >
                                            <FiPhone className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={`mailto:${complaint.senderEmail}`}
                                            className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-50"
                                            title="إرسال بريد إلكتروني"
                                        >
                                            <FiMail className="w-4 h-4" />
                                        </a>
                                        {complaint.status === 'pending' && (
                                            <button
                                                onClick={() => handleMarkInProgress(complaint.id)}
                                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                                title="وضع علامة قيد المراجعة"
                                            >
                                                <FiClock className="w-4 h-4" />
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

    )
}

export default ComplaintsTable