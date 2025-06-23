import React from 'react'
import { Bar } from 'react-chartjs-2'

const RenderStudentsStats = (
    {
        studentsChartData,
        chartOptions
    }
) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">توزيع الطلاب حسب الصف</h3>
                <div className="h-80 w-full flex justify-center">
                    <Bar data={studentsChartData} options={chartOptions} />
                </div>
            </div>
        </div>
    )
}

export default RenderStudentsStats