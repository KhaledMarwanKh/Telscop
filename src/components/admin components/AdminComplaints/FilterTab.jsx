import React from 'react'

const FilterTab = (
    {
        setStatusFilter,
        setUserTypeFilter,
        userTypeFilter,
        statusFilter
    }
) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between gap-4">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-[40%] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="all">جميع الحالات</option>
                    <option value="pending">في الانتظار</option>
                    <option value="in_progress">قيد المراجعة</option>
                    <option value="resolved">تم الحل</option>
                </select>

                <select
                    value={userTypeFilter}
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                    className="w-[40%] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="all">جميع المستخدمين</option>
                    <option value="other">اخرون</option>
                    <option value="student">طالب</option>
                    <option value="teacher">معلم</option>
                </select>
            </div>
        </div>

    )
}

export default FilterTab