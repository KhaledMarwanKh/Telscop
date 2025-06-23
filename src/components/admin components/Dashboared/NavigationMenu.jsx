import React from 'react'
import { Link } from 'react-router-dom'

const NavigationMenu = () => {
    return (
        <div className="mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <nav className="flex space-x-4 space-x-reverse">
                    <Link
                        to="/admin/students"
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        إدارة الطلاب
                    </Link>
                    <Link
                        to="/admin/teachers"
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        إدارة المعلمين
                    </Link>
                    <Link
                        to="/admin/bookings"
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        إدارة الحجوزات
                    </Link>
                    <Link
                        to="/admin/pending-teachers"
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        طلبات المعلمين
                    </Link>
                    <Link
                        to="/admin/complaints"
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        الشكاوى والاستفسارات
                    </Link>
                </nav>
            </div>
        </div>

    )
}

export default NavigationMenu