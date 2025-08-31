import React from 'react'
import { FiEye, FiEyeOff, FiLock, FiUpload } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const RenderStep4 = (
    {
        handleFileUpload,
        handleInputChange,
        setShowConfirmPassword,
        setShowPassword,
        showPassword,
        showConfirmPassword,
        formData,
        getPasswordStrength
    }
) => {
    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <FiUpload className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">رفع الوثائق المطلوبة</h3>
                <p className="text-gray-600 text-sm">يرجى رفع نسخ عن الشهادات والوثائق المطلوبة</p>
            </div>

            <div className="bg-gray-50/50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-4">الوثائق المطلوبة:</h4>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                    <li className="flex gap-y-3 flex-col  space-x-2 space-x-reverse">
                        <div className='flex space-x-2 space-x-reverse items-center'>
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            <span>صورة شخصية</span>
                        </div>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            name='image'
                            onChange={handleFileUpload}
                            className="w-full p-4 border-2 border-dashed border-emerald-300 rounded-xl hover:border-emerald-500 transition-colors cursor-pointer"
                        />
                    </li>

                    <li className="flex flex-col gap-y-3 space-x-2 space-x-reverse">
                        <div className='flex space-x-2 space-x-reverse items-center'>
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            <span>سيرة ذاتية و صورة عن الشهادة و اي وثائق اثبات اخرى</span>
                        </div>
                        <input
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                            name='certifications'
                            required
                            onChange={handleFileUpload}
                            className="w-full p-4 border-2 border-dashed border-emerald-300 rounded-xl hover:border-emerald-500 transition-colors cursor-pointer"
                        />
                    </li>
                </ul>
            </div>

            <div className="space-y-5">
                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        كلمة المرور *
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white placeholder:text-gray-400"
                            placeholder="أدخل كلمة مرور قوية"
                            minLength="6"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 left-0 pl-4 flex items-center hover:text-emerald-600 transition-colors"
                        >
                            {showPassword ? (
                                <FiEyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                                <FiEye className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>
                    {formData.password && (
                        <div className="mt-3">
                            <div className="text-xs text-gray-600 mb-2">قوة كلمة المرور:</div>
                            <div className="flex space-x-1 space-x-reverse">
                                <div className={`h-2 flex-1 rounded ${getPasswordStrength() >= 1 ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                                <div className={`h-2 flex-1 rounded ${getPasswordStrength() >= 2 ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                                <div className={`h-2 flex-1 rounded ${getPasswordStrength() >= 3 ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        تأكيد كلمة المرور *
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                        </div>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="passwordConfirm"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:ring-2 focus:ring-emerald-600/20 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white placeholder:text-gray-400 ${formData.confirmPassword && formData.password !== formData.confirmPassword
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-gray-200 focus:border-emerald-600'
                                }`}
                            placeholder="أعد إدخال كلمة المرور"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 left-0 pl-4 flex items-center hover:text-emerald-600 transition-colors"
                        >
                            {showConfirmPassword ? (
                                <FiEyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                                <FiEye className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-xs text-red-600 mt-2">كلمة المرور غير متطابقة</p>
                    )}
                </div>
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl">
                <div className="flex items-start">
                    <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="h-5 w-5 text-emerald-600 focus:ring-emerald-600 border-gray-300 rounded mt-1"
                        required
                    />
                    <label className="mr-3 block text-sm text-gray-700">
                        أوافق على{' '}
                        <Link to="/teacher/terms" className="text-emerald-600 hover:text-emerald-700 underline font-semibold">
                            شروط المعلمين
                        </Link>
                        {' '}و{' '}
                        <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700 underline font-semibold">
                            سياسة الخصوصية
                        </Link>
                        {' '}وأتعهد بصحة جميع البيانات المقدمة
                    </label>
                </div>
            </div>
        </div>
    )
}

export default RenderStep4