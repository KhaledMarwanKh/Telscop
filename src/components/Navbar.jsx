import { useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { FiChevronDown, FiMenu, FiX, FiUser, FiCalendar, FiLogOut } from 'react-icons/fi';
import { mockStudent } from '../data/mockData';


const Navbar = () => {

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

  const navLinks = [
    { path: '/', name: 'الرئيسية' },
    { path: '/teachers', name: 'المعلمين' },
    { path: '/about', name: 'من نحن' },
    { path: '/contact', name: 'اتصل بنا' }
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
            className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `${(isActive) ? "active" : ""} nav-link relative px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${isActive
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

          <div className="hidden md:block">
            <div className="flex items-center space-x-6 space-x-reverse">
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-primary transition-colors"
                >
                  <img
                    src={mockStudent.image}
                    alt="صورة الطالب"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm">{mockStudent.name}</span>
                  <FiChevronDown className="w-4 h-4" />
                </button>

                {isProfileMenuOpen && (
                  <div style={{ perspective: "1000px" }} className={`px-1 absolute show-menu top-[-100px] opacity-0 left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border`}>
                    <Link
                      to="/profile"
                      className="profile-menu-link flex gap-2 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={handler_2}
                    >
                      <FiUser />
                      الملف الشخصي
                    </Link>
                    <Link
                      to="/bookings"
                      className="profile-menu-link flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={handler_2}
                    >
                      <FiCalendar />
                      حجوزاتي
                    </Link>
                    <hr className="my-1" />
                    <Link
                      to="/login"
                      className="profile-menu-link flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={handler_2}
                    >
                      <FiLogOut />
                      تسجيل خروج
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="md:hidden">
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
        <div className={`md:hidden show-menu bg-white border-t`}>
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
              to="/profile"
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              onClick={handler}
            >
              الملف الشخصي
            </Link>
            <Link
              to="/bookings"
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              onClick={handler}
            >
              حجوزاتي
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              onClick={handler}
            >
              تسجيل خروج
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
