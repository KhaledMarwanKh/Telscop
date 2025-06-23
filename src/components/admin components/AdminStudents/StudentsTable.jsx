import React from 'react'
import { FiMail, FiPhone, FiTrash2 } from 'react-icons/fi';

const StudentsTable = (
    {
        handleDeleteStudent,
        filteredStudents
    }
) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الطالب</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الصف</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">ولي الأمر</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">العنوان</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">عدد الدروس</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">تاريخ التسجيل</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">إجراءات</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredStudents.map((student) => {
                        return (
                            <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-3 space-x-reverse">
                                        <img
                                            src={student.image}
                                            alt={student.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                            <div className="text-sm text-gray-500">{student.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">الصف {student.grade}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className='flex flex-col items-center'>
                                        <div className="text-sm font-medium text-gray-900">{student.parentName}</div>
                                        <div style={{ direction: 'ltr' }} className="text-sm text-gray-500">{student.parentPhone}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900 max-w-xs truncate">{student.address}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-900">{student.totalLessons}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-900">
                                        {new Date(student.joinDate).toLocaleDateString('en-US')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center space-x-2 space-x-reverse">
                                        <a
                                            href={`tel:${student.phone}`}
                                            className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                            title="اتصال"
                                        >
                                            <FiPhone className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={`mailto:${student.email}`}
                                            className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-50"
                                            title="إرسال بريد إلكتروني"
                                        >
                                            <FiMail className="w-4 h-4" />
                                        </a>
                                        <button
                                            onClick={() => handleDeleteStudent(student.id)}
                                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                            title="حذف"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
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

export default StudentsTable