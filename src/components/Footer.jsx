import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { BsFacebook, BsTwitterX, BsLinkedin, BsInstagram, BsWhatsapp } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <span className="text-2xl">🔭</span>
              <h3 className="text-xl font-bold">تلسكوب</h3>
            </div>
            <p className="text-gray-300">
              منصتك التعليمية الأولى في سوريا لحجز الدروس الخصوصية
            </p>
            <div>
              <p className=''>حساباتنا</p>
              <div className='flex items-center gap-4 py-2'>
                <BsFacebook className='w-[25px] h-[25px]  p-[2px] cursor-pointer' />
                <BsTwitterX className='w-[25px] h-[25px]  p-[2px] cursor-pointer' />
                <BsWhatsapp className='w-[25px] h-[25px]  p-[2px] cursor-pointer' />
                <BsInstagram className='w-[25px] h-[25px]  p-[2px] cursor-pointer' />
                <BsLinkedin className='w-[25px] h-[25px]  p-[2px] cursor-pointer' />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>
                  المعلمين
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-semibold mb-4">المواد</h4>
            <ul className="space-y-2 text-gray-300">
              <li>الرياضيات</li>
              <li>اللغة العربية</li>
              <li>العلوم</li>
              <li>اللغة الإنجليزية</li>
              <li>التاريخ</li>
              <li>الجغرافيا</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">تواصل معنا</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2 space-x-reverse">
                <FiPhone className="w-4 h-4" />
                <span style={{ direction: 'ltr' }}>+963 31 123 4567</span>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <FiMail className="w-4 h-4" />
                <span>info@telescope-edu.sy</span>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <FiMapPin className="w-4 h-4" />
                <span>حمص، سوريا</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 تلسكوب. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
