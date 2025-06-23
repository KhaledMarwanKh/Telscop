import React from 'react'
import { Bar } from 'react-chartjs-2'
import { FiFilter } from 'react-icons/fi'
import { subjects } from '../../../data/adminMockData'

const RenderLessonsStats = (
    {
        filters,
        handleDateRangeChange,
        handleFilterChange,
        getFilteredLessonsData,
        chartOptions
    }
) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiFilter className="w-5 h-5 ml-2" />
                    الفلاتر
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">المادة</label>
                        <select
                            value={filters.subject}
                            onChange={(e) => handleFilterChange('subject', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {subjects.map(subject => (
                                <option key={subject.key} value={subject.key}>{subject.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">من تاريخ</label>
                        <input
                            type="date"
                            value={filters.dateRange.start}
                            onChange={(e) => handleDateRangeChange('start', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">إلى تاريخ</label>
                        <input
                            type="date"
                            value={filters.dateRange.end}
                            onChange={(e) => handleDateRangeChange('end', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">الدروس المكتملة حسب المادة</h3>
                <div className="h-80 w-full flex justify-center">
                    <Bar data={getFilteredLessonsData()} options={chartOptions} />
                </div>
            </div>
        </div>

    )
}

export default RenderLessonsStats