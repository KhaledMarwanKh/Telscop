import { Link } from 'react-router-dom'

const ActiveTabStatus = ({ activeTab, showTodayBooking }) => {
    return (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4">
                {activeTab === 'upcoming' ? '📅' :
                    activeTab === 'completed' ? '✅' : '❌'}
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {activeTab === 'upcoming' ? `لا توجد حجوزات ${showTodayBooking ? "اليوم" : "قادمة"}` :
                    activeTab === 'completed' ? 'لا توجد حجوزات مكتملة' :
                        'لا توجد حجوزات ملغية'}
            </h3>
            {
                showTodayBooking ? "" : (
                    <>
                        <p className="text-gray-500 mb-6">
                            {activeTab === 'upcoming' ? 'ابدأ في حجز دروسك الأولى!' :
                                activeTab === 'completed' ? 'لم تكمل أي دروس بعد' :
                                    'لم تلغِ أي حجوزات'}
                        </p>
                        {activeTab === 'upcoming' && (
                            <Link
                                to="/teachers"
                                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                            >
                                احجز درساً الآن
                            </Link>
                        )}
                    </>
                )
            }
        </div>
    )
}

export default ActiveTabStatus