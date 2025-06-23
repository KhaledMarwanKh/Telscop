import { daysOfWeek, teacherTimeSlots } from '../../../data/teacherMockData';
import { FiClock } from 'react-icons/fi';

const RenderSchedule = (
    {
        handleAvailabilityChange,
        isEditing,
        formData
    }
) => {
    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <FiClock className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">الأوقات المتاحة للتدريس</h3>
                <p className="text-gray-600 text-sm">حدد الأيام والأوقات التي تفضل التدريس فيها</p>
            </div>

            {daysOfWeek.map((day) => {
                const daySchedule = formData.availability.find(a => a.day === day.key) || { day: day.key, slots: [] };
                return (
                    <div key={day.key} className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-3">{day.name}</h4>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                            {teacherTimeSlots.map((slot) => (
                                <button
                                    key={slot.value}
                                    type="button"
                                    onClick={() => isEditing && handleAvailabilityChange(day.key, slot.value)}
                                    disabled={!isEditing}
                                    className={`p-2 border-2 rounded-lg transition-all duration-300 text-sm ${daySchedule.slots.includes(slot.value)
                                            ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                                            : 'border-gray-200 text-gray-700'
                                        } ${!isEditing ? 'cursor-not-allowed opacity-60' : 'hover:border-emerald-300'}`}
                                >
                                    {slot.label}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default RenderSchedule