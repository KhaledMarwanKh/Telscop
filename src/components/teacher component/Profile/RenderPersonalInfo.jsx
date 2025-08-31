import React from 'react'
import { FiCalendar, FiCamera, FiMail, FiMapPin, FiPhone, FiUser } from 'react-icons/fi'
import { city, homes } from '../../../data/assests'

const RenderPersonalInfo = (
    {
        profileImage,
        isEditing,
        handleImageChange,
        handleInputChange,
        formData,
        handleAddressChange
    }
) => {
    return (
        <div className="space-y-6">
            {/* Profile Image Section */}
            <div className="text-center">
                <div className="relative inline-block">
                    <img
                        src={profileImage}
                        alt="صورة المعلم"
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-emerald-200"
                    />
                    {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-700 transition-colors">
                            <FiCamera className="w-4 h-4" />
                            <input
                                type="file"
                                accept="*"
                                onChange={handleImageChange}
                                className="hidden"
                                name="image"
                            />
                        </label>
                    )}
                </div>
                {isEditing && (
                    <p className="text-sm text-gray-500 mt-2">انقر على الأيقونة لتغيير الصورة</p>
                )}
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiUser className="w-4 h-4 inline ml-2" />
                        الاسم الكامل
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={true}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                            }`}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiMail className="w-4 h-4 inline ml-2" />
                        البريد الإلكتروني
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={true}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                            }`}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiPhone className="w-4 h-4 inline ml-2" />
                        رقم الهاتف
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                            }`}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiCalendar className="w-4 h-4 inline ml-2" />
                        تاريخ الميلاد
                    </label>
                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate.split("T")[0]}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                            }`}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        الجنس
                    </label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        disabled={true}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                            }`}
                        required
                    >
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                    </select>
                </div>


                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiMapPin className="w-4 h-4 inline ml-2" />
                        العنوان
                    </label>
                    <div>
                        <label className='block text-[0.8rem] font-medium text-gray-700 mb-2'>
                            محافظة
                        </label>
                        <select
                            name="city"
                            value={formData.address.city}
                            onChange={handleAddressChange}
                            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                            required
                            disabled={!isEditing}
                        >
                            {city.map((city) => (
                                <option key={city.key} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className='block text-[0.8rem] font-medium text-gray-700 mb-2'>
                            منطقة
                        </label>
                        <select
                            name="region"
                            value={formData.address.region}
                            onChange={handleAddressChange}
                            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                            required
                            disabled={!isEditing}
                        >
                            {homes.map((region) => (
                                <option key={region.translation} value={region.region}>
                                    {region.region}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="group">
                        <label className='block text-[0.8rem] font-medium text-gray-700 mb-2'>
                            الشارع
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="street"
                                value={formData.address.street}
                                onChange={handleAddressChange}
                                className="w-full pl-4 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white placeholder:text-gray-400"
                                placeholder="أدخل الشارع"
                                required
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RenderPersonalInfo