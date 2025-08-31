import React from 'react'
import { FiMail, FiTrash2 } from 'react-icons/fi';
import { getGradeNameByNumber } from '../../../data/assests';

const StudentsTable = (
    {
        handleDeleteStudent,
        filteredStudents
    }
) => {
    return (
        <div className="overflow-auto h-[400px]">
            <table className="w-full text-center">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">الطالب</th>
                        <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">الصف</th>
                        <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">العنوان</th>
                        <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">عدد الدروس</th>
                        <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">تاريخ التسجيل</th>
                        <th className="text-center px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">إجراءات</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredStudents.map((student) => {
                        return (
                            <tr key={student?._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-3 space-x-reverse">
                                        <img
                                            src={student?.image}
                                            alt=""
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{student?.name}</div>
                                            <div className="text-sm text-gray-500">{student?.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">{getGradeNameByNumber(student["class"])}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900 max-w-xs truncate">{student?.address?.city + "," + student?.address?.region + "," + student?.address?.street}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-900">{student?.lessonsCount}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-900">
                                        {new Date(student?.createdAt?.split("T")[0]).toLocaleDateString('en-US')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center justify-center gap-1 space-x-2 space-x-reverse">
                                        <a
                                            href={`mailto:${student?.email}`}
                                            className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-50"
                                            title="إرسال بريد إلكتروني"
                                        >
                                            <FiMail className="w-4 h-4" />
                                        </a>
                                        <button
                                            onClick={() => handleDeleteStudent(student?._id)}
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