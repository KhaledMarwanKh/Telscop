import React from 'react'
import { FiUser, FiMail, FiPhone } from 'react-icons/fi'

const RenderStep1 = ({ formData, handleInputChange, }) => {
    return (
        <div className="space-y-5">
            <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    الاسم الكامل *
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-4 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white placeholder:text-gray-400"
                        placeholder="أدخل اسمك الكامل"
                        required
                    />
                </div>
            </div>

            <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    البريد الإلكتروني *
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-4 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white placeholder:text-gray-400"
                        placeholder="أدخل بريدك الإلكتروني"
                        required
                    />
                </div>
            </div>

            <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    رقم الهاتف *
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <FiPhone className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-4 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white placeholder:text-gray-400"
                        placeholder="+963 944 123 456"
                        required
                    />
                </div>
            </div>
        </div>
    )
}

export default RenderStep1