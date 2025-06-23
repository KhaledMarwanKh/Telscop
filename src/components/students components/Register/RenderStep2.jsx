import React from 'react'
import { FiCalendar, FiMapPin } from 'react-icons/fi'
import { grades } from '../../../data/mockData'

const RenderStep2 = ({ formData, handleInputChange, calculateAge }) => {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        تاريخ الميلاد *
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <FiCalendar className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            className="w-full pl-4 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                            max={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </div>
                    {formData.birthDate && (
                        <p className="text-xs text-gray-500 mt-2">
                            العمر: {calculateAge(formData.birthDate)} سنة
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        الجنس *
                    </label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                        required
                    >
                        <option value="">اختر الجنس</option>
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    الصف الدراسي *
                </label>
                <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                    required
                >
                    <option value="">اختر الصف</option>
                    {grades.map((grade) => (
                        <option key={grade.value} value={grade.value}>
                            {grade.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    العنوان *
                </label>
                <div className="relative">
                    <div className="absolute top-4 right-4 pointer-events-none">
                        <FiMapPin className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full pl-4 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white placeholder:text-gray-400"
                        placeholder="أدخل عنوانك الكامل (المحافظة، المدينة، الحي، الشارع...)"
                        required
                    />
                </div>
            </div>
        </div>
    )
}

export default RenderStep2