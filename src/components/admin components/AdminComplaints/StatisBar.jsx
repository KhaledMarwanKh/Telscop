import React from 'react'
import { FiCheck, FiClock, FiMessageSquare } from 'react-icons/fi'

const StatisBar = (
    {
        statis
    }
) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border-r-4 border-r-yellow-700 ">
                <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                        <FiClock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">في الانتظار</p>
                        <p className="text-2xl font-bold text-yellow-600">{statis.pendingCount}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border-r-4 border-r-blue-700">
                <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <FiMessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
                        <p className="text-2xl font-bold text-blue-600">{statis.inProgressCount}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border-r-4 border-r-green-700">
                <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                        <FiCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">تم الحل</p>
                        <p className="text-2xl font-bold text-green-600">{statis.resolvedCount}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default StatisBar