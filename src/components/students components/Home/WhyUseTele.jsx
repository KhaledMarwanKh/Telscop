import React from 'react'
import { FiBook, FiCalendar, FiMapPin } from 'react-icons/fi'

const WhyUseTele = () => {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    لماذا تختار تلسكوب؟
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="d text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiBook className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">معلمون مؤهلون</h3>
                        <p className="text-gray-600">
                            معلمون معتمدون وذوو خبرة في جميع المواد الدراسية
                        </p>
                    </div>

                    <div className="d text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiCalendar className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">جدولة مرنة</h3>
                        <p className="text-gray-600">
                            احجز الدروس في الأوقات التي تناسبك
                        </p>
                    </div>

                    <div className="d text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiMapPin className="w-8 h-8 text-accent text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">قريب منك</h3>
                        <p className="text-gray-600">
                            ابحث عن المعلمين القريبين من موقعك
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyUseTele