import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import header_image_3 from '../../../data/images/header_image_3.png'

const Footer = () => {
    return (
        <section style={{
            backgroundImage: `url("${header_image_3}")`
            , backgroundSize: '100% 100%'
            , backgroundAttachment: 'fixed'
        }} className="py-20 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold mb-6">
                    ابدأ رحلتك التعليمية اليوم
                </h2>
                <p className="text-xl mb-8 opacity-90">
                    انضم إلى آلاف الطلاب الذين يحققون نتائج ممتازة مع تلسكوب
                </p>
                <Link
                    to="/register"
                    className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 space-x-reverse"
                >
                    <span>إنشاء حساب مجاني</span>
                    <FiArrowLeft className="w-5 h-5" />
                </Link>
            </div>
        </section>
    )
}

export default Footer