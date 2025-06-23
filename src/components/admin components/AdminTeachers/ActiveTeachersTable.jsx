import React from 'react'
import { FiAward, FiMail, FiPhone, FiUsers, FiUserX } from 'react-icons/fi';

const ActiveTeachersTable = (
    {
        handleActivateTeacher,
        handleCancelActivateTeacher,
        getStatusBadge,
        filteredTeachers,
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
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">عدد الطلاب</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">عدد الدروس</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الأرباح</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">تاريخ الانضمام</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الحالة</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">إجراءات</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredTeachers.map((teacher) => {
                        const statusBadge = getStatusBadge(teacher.status);
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
                                    <span className="text-sm text-gray-900">{teacher.studentsCount}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-900">{teacher.totalLessons}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-emerald-600">
                                        {teacher.totalEarnings.toLocaleString()} ل.س
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-900">
                                        {new Date(teacher.joinDate).toLocaleDateString('en-US')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusBadge.color}`}>
                                        {statusBadge.text}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center space-x-2 space-x-reverse">
                                        <a
                                            href={`tel:${teacher.phone}`}
                                            className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                            title="اتصال"
                                        >
                                            <FiPhone className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={`mailto:${teacher.email}`}
                                            className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-50"
                                            title="إرسال بريد إلكتروني"
                                        >
                                            <FiMail className="w-4 h-4" />
                                        </a>

                                        <button
                                            onClick={() => handleActivateTeacher(teacher.id)}
                                            className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                            title="تفعيل المعلم"
                                        >
                                            <FiUsers className="w-4 h-4" />
                                        </button>

                                        <button
                                            onClick={() => handleCancelActivateTeacher(teacher.id)}
                                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-green-50"
                                            title="الغاء تفعيل المعلم"
                                        >
                                            <FiUserX className="w-4 h-4" />
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

export default ActiveTeachersTable