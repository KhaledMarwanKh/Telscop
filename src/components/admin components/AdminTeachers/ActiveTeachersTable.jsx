import React, { useEffect, useState } from 'react'
import { FiEye, FiMail, FiMapPin, FiPhone, FiTrendingDown, FiTrendingUp, FiUsers, FiUserX } from 'react-icons/fi';

const ActiveTeachersTable = (
    {
        handleActivateTeacher,
        handleCancelActivateTeacher,
        getStatusBadge,
        filteredTeachers,
        handleShowTeacherInfo
    }
) => {
    const [maxAwards, setMaxAwards] = useState(0);
    const [minAwards, setMinAwards] = useState(0);

    useEffect(() => {
        const maxAwards = Math.max(...filteredTeachers?.map(teacher => teacher.amountMoneyAllTime * 5 / 100));
        const minAwards = Math.min(...filteredTeachers?.map(teacher => teacher.amountMoneyAllTime * 5 / 100));

        setMaxAwards(maxAwards);
        setMinAwards(minAwards);
    }, [maxAwards, minAwards, filteredTeachers])

    const awardStatus = [
        { status: 'غير مدفوع', color: 'text-red-700 bg-red-200' },
        { status: 'مدفوع', color: 'text-green-700 bg-green-200' },
    ]

    return (
        <div className="overflow-auto">
            <table className="w-full text-center">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">المعلم</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">المادة</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">الصفوف</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">العنوان</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">رقم الهاتف</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider"> الارباح التي تم تحصيلها</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider"> المبلغ المطلوب دفعه</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">الحالة</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">إجراءات</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredTeachers?.sort((a,b)=>(b.amountMoneyAllTime * 5 /100) - (a.amountMoneyAllTime * 5 /100))?.map((teacher, index) => {
                        return (
                            <tr key={teacher?._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-3 space-x-reverse">
                                        <img
                                            src={teacher?.image}
                                            alt={teacher?.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{teacher?.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">{teacher?.subject}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-900">{teacher?.Class?.join(', ')}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-900 flex items-center justify-center gap-2"><FiMapPin /> {Object.values(teacher?.address).join(",")}</span>
                                </td>
                                <td style={{ direction: 'ltr' }} className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-900 flex items-center justify-center gap-2">{teacher?.phone} <FiPhone /></span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`text-sm font-medium flex items-center justify-center gap-2 ${((teacher?.amountMoneyAllTime * 5 / 100) === maxAwards) ? "text-emerald-600" : ((teacher.amountMoneyAllTime * 5 / 100) === minAwards) ? "text-red-600" : "text-gray-700"}`}>
                                        {
                                            ((teacher?.amountMoneyAllTime * 5 / 100) === maxAwards) ? <FiTrendingUp /> : ((teacher.amountMoneyAllTime * 5 / 100) === minAwards) ? <FiTrendingDown /> : ""
                                        }
                                        {teacher?.amountMoneyAllTime * 5 / 100} ل.س
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap flex flex-col items-center">
                                    <span className={`text-sm font-medium px-2 py-1 flex rounded items-center justify-center gap-2 ${(teacher?.amountMoneyRequired === 0) ? awardStatus[1].color : awardStatus[0].color}`}>
                                        {
                                            (teacher?.amountMoneyRequired === 0) ? awardStatus[1].status : awardStatus[0].status
                                        }
                                    </span>
                                    <span className='text-sm text-center'>
                                        {
                                            teacher?.amountMoneyRequired
                                        }ل.س
                                    </span>
                                </td>

                                <td className="text-sm px-6 py-4 whitespace-nowrap">

                                    {
                                        (() => {
                                            const statusBadge = getStatusBadge(
                                                (teacher?.activate) ? "activated" : "not_activated"
                                            );

                                            return (
                                                <span className={`px-2 rounded ${statusBadge.color}`}>
                                                    {
                                                        statusBadge.text
                                                    }
                                                </span>
                                            );
                                        })()
                                    }
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center space-x-2 space-x-reverse">
                                        <FiEye className='cursor-pointer' onClick={() => handleShowTeacherInfo(teacher?._id)} />
                                        <a
                                            href={`mailto:${teacher.email}`}
                                            className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-50"
                                            title="إرسال بريد إلكتروني"
                                        >
                                            <FiMail className="w-4 h-4" />
                                        </a>

                                        <button
                                            onClick={() => handleActivateTeacher(teacher?._id)}
                                            className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                            title="تفعيل المعلم"
                                        >
                                            <FiUsers className="w-4 h-4" />
                                        </button>

                                        <button
                                            onClick={() => handleCancelActivateTeacher(teacher?._id)}
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