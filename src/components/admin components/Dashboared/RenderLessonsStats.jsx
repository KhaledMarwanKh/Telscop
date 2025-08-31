import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { FiFilter } from 'react-icons/fi'
import { formatDate, subjects } from '../../../data/assests'
const RenderLessonsStats = (
    {
        filters,
        handleDateRangeChange,
        handleFilterChange,
        chartOptions,
        setFilters,
        lessonsBySubject
    }
) => {
    const [activeTab, setActiveTab] = useState("number");

    const [data, setData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const lessonsStatis = {
            labels: lessonsBySubject.labels,
            datasets: [
                {
                    label: 'الدروس المكتملة',
                    data: lessonsBySubject.lessonsNumberData,
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'اجمالي الارباح',
                    data: lessonsBySubject.lessonsAwardsData,
                    backgroundColor: 'rgba(59, 246, 130, 0.8)',
                    borderColor: 'rgba(59, 246, 130, 0.8)',
                    borderWidth: 1,
                }
            ],
        };

        setData(
            (prev) => (
                (activeTab === "number") ?
                    { ...prev, labels: lessonsStatis.labels, datasets: [lessonsStatis.datasets[0]] }
                    : { ...prev, labels: lessonsStatis.labels, datasets: [lessonsStatis.datasets[1]] }
            )
        );

    }, [activeTab,lessonsBySubject])

    const tabs = [
        { id: 'number', label: 'الدروس المكتملة حسب المادة' },
        { id: 'awards', label: 'الارباح محققة حسب كل مادة' },
    ];

    const clearFilters = () => {
        setFilters({
            subject: "all",
            dateRange: {
                start: "",
                end: ""
            }
        })
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiFilter className="w-5 h-5 ml-2" />
                    الفلاتر
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">المادة</label>
                        <select
                            value={filters.subject}
                            onChange={(e) => handleFilterChange('subject', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">جميع المواد</option>
                            {subjects.map(subject => (
                                <option key={subject.name} value={subject.name}>{subject.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">من تاريخ</label>
                        <input
                            type="date"
                            value={filters.dateRange.start}
                            onChange={(e) => handleDateRangeChange('start', formatDate(new Date(e.target.value).toLocaleDateString("en-US")))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">إلى تاريخ</label>
                        <input
                            type="date"
                            value={filters.dateRange.end}
                            onChange={(e) => handleDateRangeChange('end', formatDate(new Date(e.target.value).toLocaleDateString("en-US")))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={clearFilters}
                        className="h-[63px] mt-[22px] border border-gray-300 text-gray-700  rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        إلغاء الفلاتر
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row space-x-2 space-x-reverse bg-gray-100 p-1 rounded-lg">
                        {tabs.map((tab) => {
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="h-80 w-full flex justify-center">
                    <Bar data={data} options={chartOptions} />
                </div>

            </div>
        </div>

    )
}

export default RenderLessonsStats