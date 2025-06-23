import React from 'react'
import { FiCheck, FiClock, FiX } from 'react-icons/fi'

const StatisBar = (
    {
        filteredTeachers
    }
) => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                      <FiClock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="mr-4">
                      <p className="text-sm font-medium text-gray-600">طلبات جديدة</p>
                      <p className="text-2xl font-bold text-yellow-600">{filteredTeachers.length}</p>
                  </div>
              </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                      <FiCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="mr-4">
                      <p className="text-sm font-medium text-gray-600">تمت الموافقة اليوم</p>
                      <p className="text-2xl font-bold text-green-600">3</p>
                  </div>
              </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-lg">
                      <FiX className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="mr-4">
                      <p className="text-sm font-medium text-gray-600">تم الرفض اليوم</p>
                      <p className="text-2xl font-bold text-red-600">1</p>
                  </div>
              </div>
          </div>
      </div>

  )
}

export default StatisBar