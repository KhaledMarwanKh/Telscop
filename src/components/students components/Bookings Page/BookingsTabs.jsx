import React from 'react'

const BookingsTabs = ({
    setActiveTab,
    getBookingsByStatus,
    activeTab
}) => {
    const tabs = [
        { id: 'upcoming', name: 'الحجوزات القادمة', count: getBookingsByStatus('upcoming').length },
        { id: 'completed', name: 'الحجوزات المكتملة', count: getBookingsByStatus('completed').length },
        { id: 'cancelled', name: 'الحجوزات المُلغاة', count: getBookingsByStatus('cancelled').length }
    ];

    return (
        <div className="mb-8">
            <nav className="flex space-x-8 space-x-reverse border-b">
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
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </nav>
        </div>

    )
}

export default BookingsTabs