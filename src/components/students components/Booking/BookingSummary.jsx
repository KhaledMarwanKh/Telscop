import { translateDayToArabic } from "../../../data/assests"

const BookingSummary = (
    {
        teacher,
        selectedDate,
        selectedTime,
        timeSlots,
        selectedDay
    }
) => {
    return (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">ملخص الحجز</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>المعلم:</span>
                    <span className="font-semibold">{teacher?.name}</span>
                </div>
                <div className="flex justify-between">
                    <span>المادة:</span>
                    <span>{teacher?.subject}</span>
                </div>
                {selectedDate && (
                    <div className="flex justify-between">
                        <span>اليوم :</span>
                        <span>{selectedDate} - {translateDayToArabic(selectedDay)}</span>
                    </div>
                )}
                {selectedTime && (
                    <div className="flex justify-between">
                        <span>الوقت:</span>
                        <span>{timeSlots.find(slot => slot.value === selectedTime)?.label}</span>
                    </div>
                )}
                <hr className="my-3" />
                <div className="flex justify-between font-semibold text-lg">
                    <span>المجموع:</span>
                    <span className="text-secondary">{teacher?.price} ل.س</span>
                </div>
            </div>
        </div>

    )
}

export default BookingSummary