import React from 'react'
import { FiCheckCircle, FiDollarSign, FiTrendingUp, FiUsers, FiXCircle } from 'react-icons/fi'

const StatisBar = (
    {
        statis
    }
) => {
  return (
        < div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" >
            <div className="bg-white rounded-xl shadow-sm p-6 border-r-4 border-emerald-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الطلاب</p>
                  <p className="text-3xl font-bold text-emerald-600">{statis.totalStudents}</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <FiUsers className="w-8 h-8 text-emerald-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <FiTrendingUp className="w-4 h-4 text-green-500 ml-1" />
                <span className="text-green-600 font-medium">+5</span>
                <span className="text-gray-500 mr-1">هذا الأسبوع</span>
              </div>
            </div>
  
            <div className="bg-white rounded-xl shadow-sm p-6 border-r-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الدروس المكتملة</p>
                  <p className="text-3xl font-bold text-green-600">{statis.completedLessons}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <FiCheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <FiTrendingUp className="w-4 h-4 text-green-500 ml-1" />
                <span className="text-green-600 font-medium">+12</span>
                <span className="text-gray-500 mr-1">هذا الشهر</span>
              </div>
            </div>
  
            <div className="bg-white rounded-xl shadow-sm p-6 border-r-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الدروس الملغاة</p>
                  <p className="text-3xl font-bold text-red-600">{statis.cancelledLessons}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <FiXCircle className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-500">معدل الإلغاء: </span>
                <span className="text-red-600 font-medium mr-1">5.3%</span>
              </div>
            </div>
  
            <div className="bg-white rounded-xl shadow-sm p-6 border-r-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الأرباح</p>
                  <p className="text-3xl font-bold text-blue-600">{statis.totalEarnings}</p>
                  <p className="text-xs text-gray-500">ليرة سورية</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FiDollarSign className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
  )
}

export default StatisBar