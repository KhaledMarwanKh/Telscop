import { FiChevronDown, FiEdit3, FiHelpCircle, FiHome, FiLogOut, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../../lib/api'

const Header = (
    {
        setIsProfileMenuOpen,
        isProfileMenuOpen,
        teacher
    }
) => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        const { teacherToken } = localStorage;

        try {
            const logoutRequest = await (await api.post(
                "/api/teacher/logout"
                , {}
                ,
                {
                    headers: {
                        authorization: "Bearer " + teacherToken
                    }
                }
            )).data;

            console.log(logoutRequest)

            toast.success("تم تسجيل الخروج بنجاح");

            localStorage.removeItem("teacherToken");

            window.location.href = "/login";
        } catch (e) {
            toast.error(e.message);
            console.log(e);
        }
    }

    const reschedualLessons = () => {
        setIsProfileMenuOpen(false)
        localStorage.setItem('activeTab', 'schedule');
        navigate('/teacher/profile')
    }

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
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className="flex items-center space-x-3 space-x-reverse p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <img
                                    src={teacher.image}
                                    alt={teacher.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-700">{teacher.name}</p>
                                    <p className="text-xs text-gray-500">{teacher.subject}</p>
                                </div>
                                <FiChevronDown className="w-4 h-4 text-gray-500" />
                            </button>

                            {isProfileMenuOpen && (
                                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-800">{teacher.name}</p>
                                        <p className="text-xs text-gray-500">{teacher.email}</p>
                                    </div>

                                    <Link
                                        to="/teacher/profile"
                                        className="flex items-center space-x-3 space-x-reverse px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        onClick={() => setIsProfileMenuOpen(false)}
                                    >
                                        <FiUser className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <span className="font-medium">الملف الشخصي</span>
                                            <p className="text-xs text-gray-500">عرض وتعديل معلوماتك</p>
                                        </div>
                                    </Link>

                                    <button
                                        className="flex items-center space-x-3 space-x-reverse px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full"
                                        onClick={reschedualLessons}
                                    >
                                        <FiEdit3 className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <span className="font-medium">تحديث الجدول</span>
                                            <p className="text-xs text-gray-500">إدارة الأوقات المتاحة</p>
                                        </div>
                                    </button>

                                    <Link
                                        to="/teacher/support"
                                        className="flex items-center space-x-3 space-x-reverse px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        onClick={() => setIsProfileMenuOpen(false)}
                                    >
                                        <FiHelpCircle className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <span className="font-medium">المساعدة</span>
                                            <p className="text-xs text-gray-500">دليل الاستخدام والدعم</p>
                                        </div>
                                    </Link>

                                    <div className="border-t border-gray-100 mt-2">
                                        <Link
                                            to="/"
                                            className="flex items-center space-x-3 space-x-reverse px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            onClick={() => setIsProfileMenuOpen(false)}
                                        >
                                            <FiHome className="w-4 h-4 text-gray-500" />
                                            <span>الموقع الرئيسي</span>
                                        </Link>

                                        <Link
                                            to="/login"
                                            className="flex items-center space-x-3 space-x-reverse px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            onClick={handleLogout}
                                        >
                                            <FiLogOut className="w-4 h-4 text-red-500" />
                                            <span>تسجيل الخروج</span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header