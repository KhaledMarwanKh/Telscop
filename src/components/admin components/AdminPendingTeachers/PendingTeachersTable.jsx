import React from 'react'
import { FiCheck, FiDownload, FiMail, FiPhone, FiX } from 'react-icons/fi';

const PendingTeachersTable = (
    {
        handleApproveTeacher,
        handleDownloadDocument,
        handleRejectTeacher,
        filteredTeachers,
        formatDate,
        getDaysAgo
    }
) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">المعلم</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">المادة</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الصفوف</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">تاريخ التقديم</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الوثائق</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">إجراءات</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredTeachers.map((teacher) => {
                        const daysAgo = getDaysAgo(teacher.applicationDate);
                        return (
                            <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-3 space-x-reverse">
                                        <img
                                            src={teacher.image}
                                            alt={teacher.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                                            <div className="text-sm text-gray-500">{teacher.email}</div>
                                            <div className="text-sm text-gray-500">{teacher.phone}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">{teacher.subject}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-900">{teacher.grades.join(', ')}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm text-gray-900">{formatDate(teacher.applicationDate)}</div>
                                        <div className="text-xs text-gray-500">
                                            منذ {daysAgo} {daysAgo === 1 ? 'يوم' : 'أيام'}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        {teacher.documents.map((doc, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleDownloadDocument(teacher.id, doc)}
                                                className="flex items-center space-x-2 space-x-reverse text-xs text-blue-600 hover:text-blue-800"
                                            >
                                                <FiDownload className="w-3 h-3" />
                                                <span>{doc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center space-x-2 space-x-reverse">
                                        <a
                                            href={`tel:${teacher.phone}`}
                                            className="text-green-600 hover:text-green-800 p-2 rounded hover:bg-green-50"
                                            title="اتصال"
                                        >
                                            <FiPhone className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={`mailto:${teacher.email}`}
                                            className="text-purple-600 hover:text-purple-800 p-2 rounded hover:bg-purple-50"
                                            title="إرسال بريد إلكتروني"
                                        >
                                            <FiMail className="w-4 h-4" />
                                        </a>
                                        <button
                                            onClick={() => handleApproveTeacher(teacher.id)}
                                            className="text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                                            title="الموافقة"
                                        >
                                            <FiCheck className="w-4 h-4 inline ml-1" />
                                            موافقة
                                        </button>
                                        <button
                                            onClick={() => handleRejectTeacher(teacher.id)}
                                            className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                                            title="رفض"
                                        >
                                            <FiX className="w-4 h-4 inline ml-1" />
                                            رفض
                                        </button>
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

export default PendingTeachersTable