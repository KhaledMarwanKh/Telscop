import React from 'react'
import { daysOfWeek, teacherTimeSlots } from '../../../data/teacherMockData'
import { FiClock } from 'react-icons/fi'

const RenderStep3 = (
    {
        handleAvailabilityChange,
        formData,
    }
) => {
    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <FiClock className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">الأوقات المتاحة للتدريس</h3>
                <p className="text-gray-600 text-sm">حدد الأيام والأوقات التي تفضل التدريس فيها</p>
            </div>

            {daysOfWeek.map((day) => (
                <div key={day.key} className="bg-gray-50/50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-800 mb-3">{day.name}</h4>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                        {teacherTimeSlots.map((slot) => (
                            <button
                                key={slot.value}
                                type="button"
                                onClick={() => handleAvailabilityChange(day.key, slot.value)}
                                className={`p-2 border-2 rounded-lg transition-all duration-300 text-sm ${formData.availability[day.key]?.includes(slot.value)
                                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                                    : 'border-gray-200 hover:border-emerald-300 text-gray-700'
                                    }`}
                            >
                                {slot.label}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RenderStep3