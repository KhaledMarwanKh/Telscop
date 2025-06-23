import React from 'react'
import { FiCalendar, FiCheck, FiClock, FiDollarSign } from 'react-icons/fi'

const StatisBar = (
    {
        stats
    }
) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <FiCalendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">إجمالي الحجوزات</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.totalBookings}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                        <FiCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">الحجوزات مكتملة</p>
                        <p className="text-2xl font-bold text-green-600">{stats.completedBookings}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                        <FiClock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">مؤكدة</p>
                        <p className="text-2xl font-bold text-yellow-600">{stats.confirmedBookings}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                        <FiDollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                        <p className="text-xl font-bold text-purple-600">{Number((stats.totalRevenue / 1000)).toFixed(0)}K</p>
                        <p className="text-xs text-gray-500">ليرة سورية</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default StatisBar