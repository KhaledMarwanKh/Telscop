import { FiHome, FiLogOut } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 space-x-reverse ml-8">
                            <span className="text-2xl">🔭</span>
                            <span className="text-xl font-bold text-emerald-600">تلسكوب</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4 space-x-reverse">
                        <Link
                            to="/teacher/dashboard"
                            className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium"
                        >
                            العودة للوحة التحكم
                        </Link>

                        <div className="flex items-center space-x-2 space-x-reverse">
                            <Link
                                to="/"
                                className="p-2 text-gray-500 hover:text-emerald-600 transition-colors"
                                title="الموقع الرئيسي"
                            >
                                <FiHome className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header