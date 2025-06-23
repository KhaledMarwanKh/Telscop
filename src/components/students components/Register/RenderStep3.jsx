import React from 'react'
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const RenderStep3 = ({handleInputChange,
    formData,
    setShowConfirmPassword,
    showConfirmPassword,
    getPasswordStrength,
    showPassword,
    setShowPassword}) => {
    return (
        <div className="space-y-5">
            <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    كلمة المرور *
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white placeholder:text-gray-400"
                        placeholder="أدخل كلمة مرور قوية"
                        minLength="6"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 left-0 pl-4 flex items-center hover:text-primary transition-colors"
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
                            <div className={`h-2 flex-1 rounded ${getPasswordStrength() >= 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                            <div className={`h-2 flex-1 rounded ${getPasswordStrength() >= 2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                            <div className={`h-2 flex-1 rounded ${getPasswordStrength() >= 3 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
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
                        <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white placeholder:text-gray-400 ${formData.confirmPassword && formData.password !== formData.confirmPassword
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-gray-200 focus:border-primary'
                            }`}
                        placeholder="أعد إدخال كلمة المرور"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 left-0 pl-4 flex items-center hover:text-primary transition-colors"
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

            <div className="bg-gray-50/50 p-4 rounded-xl">
                <div className="flex items-start">
                    <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                        required
                    />
                    <label className="mr-3 block text-sm text-gray-700">
                        أوافق على{' '}
                        <Link to="/terms" className="text-primary hover:text-blue-700 underline font-semibold">
                            شروط الخدمة
                        </Link>
                        {' '}و{' '}
                        <Link to="/privacy" className="text-primary hover:text-blue-700 underline font-semibold">
                            سياسة الخصوصية
                        </Link>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default RenderStep3