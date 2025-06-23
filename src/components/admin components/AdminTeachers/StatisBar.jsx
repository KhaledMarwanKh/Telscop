import React from 'react'
import { FiBookOpen, FiDollarSign, FiUsers } from 'react-icons/fi'

const StatisBar = (
    {
        statis
    }
) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <FiUsers className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">إجمالي المعلمين</p>
                        <p className="text-2xl font-bold text-blue-600">{statis.teachersNum}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                        <FiBookOpen className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">إجمالي الدروس</p>
                        <p className="text-2xl font-bold text-green-600">{statis.totalLessons}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-lg">
                        <FiDollarSign className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">إجمالي الأرباح</p>
                        <p className="text-xl font-bold text-orange-600">{(statis.totalEarnings / 1000000).toFixed(1)}M</p>
                        <p className="text-xs text-gray-500">ليرة سورية</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatisBar