import React from 'react'

const BookingsTabs = ({
    setActiveTab,
    activeTab,
    bookings,
    setShowTodayBookings,
    showTodayBooking
}) => {
    const tabs = [
        { id: 'upcoming', name: 'الحجوزات القادمة' },
        { id: 'completed', name: 'الحجوزات السابقة' },
        { id: 'cancelled', name: 'الحجوزات المُلغاة' }
    ];

    return (
        <div className="mb-8">
            <nav className="flex space-x-8 space-x-reverse border-b relative">
                {
                    activeTab === "upcoming" && (
                        <div className='flex items-center gap-3 absolute left-[10px] top-[50%] translate-y-[-50%]'>
                            <input onClick={() => setShowTodayBookings(prev => !prev)} type="radio" name="yes" id="yes" checked={showTodayBooking} />
                            <label htmlFor="yes" className='text-gray-500 text-sm hover:text-gray-700'>دروس اليوم</label>
                        </div>
                    )
                }
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        {tab.name}
                        {tab.count > 0 && (
                            <span className={`mr-2 inline-block px-2 py-1 text-xs rounded-full ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                {tab.id === activeTab ? bookings.length : 0}
                            </span>
                        )}
                    </button>
                ))}
            </nav>
        </div>

    )
}

export default BookingsTabs