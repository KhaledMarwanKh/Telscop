import { useState } from 'react';
import { NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../lib/api';


const AdminNavbar = () => {
    const navigate = useNavigate()
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handler = () => {
        window.scrollTo(0, 0);
        setIsMobileMenuOpen(false)
    }

    const handler_2 = () => {
        window.scrollTo(0, 0);
        setIsProfileMenuOpen(false)
    }

    const handleLogOut = async () => {
        try {

            const { adminToken } = localStorage;

            const logoutRequest = await (await api.post(
                "/api/admin/logout"
                , {}
                , {
                    headers: {
                        authorization: `Bearer ${adminToken}`
                    }
                }
            )).data;

            if (logoutRequest.status === "success") {
                localStorage.removeItem("adminToken");
                toast.success("تم تسجيل الخروج بنجاح");
                setTimeout(() => {
                    navigate("/");
                    window.scrollTo(0, 0);
                    window.location.reload();
                }, 1000)
            }
        } catch (e) {
            toast.error(e.message);
            console.log(e);
        }
    }

    const navLinks = [
        { path: '/admin/dashboard', name: 'الرئيسية' },
        { path: '/admin/students', name: 'ادارة الطلاب' },
        { path: '/admin/teachers', name: 'ادارة المعلمين' },
        { path: '/admin/bookings', name: 'ادارة الحجوزات' },
        { path: '/admin/pending-teachers', name: 'طلبات المعلمين' },
        { path: '/admin/complaints', name: 'الشكاوى و الاستفسارات' },
    ];

    return (
        <nav className="bg-white shadow-sm border-b sticky top-0 z-[1000]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 space-x-reverse">
                            <span className="text-3xl">🔭</span>
                            <span className="text-2xl font-bold text-primary">تلسكوب</span>
                        </Link>
                    </div>

                    <div
                        style={{
                            perspective: "1000px"
                        }}
                        className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `${(isActive) ? "active" : ""} nav-link relative px-4 py-2.5 rounded-lg text-[0.7rem] font-bold transition-all duration-300 ${isActive
                                        ? 'text-white bg-gradient-to-r from-[#2563EB] to-[#1E40AF] shadow-md'
                                        : 'text-gray-800  hover:text-[white] hover:bg-[#2550EB]'
                                    }`
                                }
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                }}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    <FiLogOut onClick={handleLogOut} className='hidden lg:block w-5 h-5 cursor-pointer' title='تسجيل الخروج' />

                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-700 hover:text-primary transition-colors"
                        >
                            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className={`lg:hidden show-menu bg-white border-t`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`block px-3 py-2 text-sm font-medium transition-colors ${isActive(link.path)
                                    ? 'text-white bg-primary bg-opacity-10'
                                    : 'text-gray-700 hover:text-primary'
                                    }`}
                                onClick={() => {

                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <hr className="my-2" />
                        <Link
                            to="/login"
                            className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                            onClick={handleLogOut}
                        >
                            تسجيل خروج
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default AdminNavbar;
