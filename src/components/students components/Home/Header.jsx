import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import header_image_1 from '../../../data/images/header_image_1.jpg'

const Header = () => {
    return (
        <section style={
            {
                backgroundImage: `url("${header_image_1}")`
                , backgroundSize: '100% 100%'
                , backgroundRepeat: 'no-repeat'
                , backgroundAttachment: 'fixed'
            }
        } className="home-header text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        مرحباً بك في تلسكوب
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90">
                        منصتك للتعلم مع أفضل المعلمين في حمص
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/teachers"
                            className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors inline-flex items-center justify-center space-x-2 space-x-reverse"
                        >
                            <span>ابحث عن معلم الآن</span>
                            <FiArrowLeft className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/register"
                            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors inline-flex items-center justify-center"
                        >
                            إنشاء حساب جديد
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header