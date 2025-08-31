import { useEffect, useState } from 'react';
import { NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import { FiChevronDown, FiMenu, FiX, FiUser, FiCalendar, FiLogOut, FiLogIn } from 'react-icons/fi';
import api from '../lib/api';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();
  const [student, setStudent] = useState({
    image: '',
    name: ''
  });

  useEffect(() => {

    const { userToken } = localStorage;

    if (!userToken) {
      setIsLogin(false);
    } else {
      const fetchData = async () => {
        try {
          const studentInfo = await (await api.get(
            '/api/user/get-profile',
            {
              headers: {
                authorization: `Bearer ${userToken}`
              }
            }
          )).data;

          if (studentInfo.status === "success") {
            setStudent(studentInfo.data);
          }
        } catch (e) {
          console.log(e);
          toast.error(e.message);
          setIsLogin(false);
        }
      }
      fetchData();

      setIsLogin(true);
    }

  }, [])

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

  const handleLogOut = async () => {
    try {

      const { userToken } = localStorage;

      const logoutRequest = await (await api.post(
        "/api/user/logout"
        , {}
        , {
          headers: {
            authorization: `Bearer ${userToken}`
          }
        }
      )).data;

      if (logoutRequest.status === "success") {
        localStorage.removeItem("userToken");
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
                {
                  isLogin ? (
                    <button
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-primary transition-colors"
                    >
                      <img
                        src={student?.image}
                        alt="صورة الطالب"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm">{student?.name}</span>
                      <FiChevronDown className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/login')}
                      className='px-2 py-3 border rounded hover:bg-primary hover:text-white transition-all duration-150'>
                      تسجيل الدخول
                    </button>
                  )
                }

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
                      className="profile-menu-link flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {
                        isLogin ? (
                          <div onClick={handleLogOut} className="w-full flex items-center justify-between">
                            تسجيل خروج
                            <FiLogOut />
                          </div>
                        ) : (
                          <div onClick={() => navigate("/")} className="w-full flex items-center justify-between">
                            تسجيل الدخول
                            <FiLogIn />
                          </div>
                        )
                      }
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {
            (isLogin) ? (
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className='block md:hidden px-2 py-3 border rounded hover:bg-primary hover:text-white transition-all duration-150'>
                تسجيل الدخول
              </button>
            )
          }

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
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              {
                isLogin ? (
                  <div onClick={handleLogOut} className="flex items-center justify-between">
                    تسجيل خروج
                    <FiLogOut />
                  </div>
                ) : (
                  <div onClick={() => { navigate("/login"); handler() }}
                    className="flex items-center justify-between">
                    تسجيل الدخول
                    <FiLogIn />
                  </div>
                )
              }
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
