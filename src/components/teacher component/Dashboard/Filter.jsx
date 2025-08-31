import React from 'react'
import { getDayInArabic } from '../../../data/assests'

const FilterTab = (
    {
        setDayFilter
        , daysInEnglish
        , dayFilter
        , activeTab
        , statusFilter
        , setStatusFilter
    }
) => {
    return (
        <div className='w-full flex items-center justify-center gap-5 px-3 py-2 bg-white my-5 rounded shadow-lg'>
            {
                activeTab === "upcoming" ? (
                    <>
                        <div className='w-[40%]'>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                اليوم
                            </label>
                            <select
                                value={dayFilter}
                                onChange={(e) => setDayFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="all">جميع الايام</option>
                                {
                                    daysInEnglish.map(day => (
                                        <option value={day}>
                                            {
                                                getDayInArabic(day)
                                            }
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className='w-[40%]'>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                حالة الحجز
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="all">جميع</option>
                                {
                                    ["confirmed", "completed", "cancelled"].map(status => (
                                        <option value={status}>
                                            {
                                                status === "confirmed" ? "مؤكد"
                                                    : status === "completed" ? "مكتمل"
                                                        : "ملغي"
                                            }
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </>
                ) : (
                    <div className='w-[40%]'>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            حالة الحجز
                        </label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="all">جميع</option>
                            {
                                ["confirmed", "completed", "cancelled"].map(status => (
                                    <option value={status}>
                                        {
                                            status === "confirmed" ? "مؤكد"
                                                : status === "completed" ? "مكتمل"
                                                    : "ملغي"
                                        }
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                )
            }
        </div>
    )
}

export default FilterTab