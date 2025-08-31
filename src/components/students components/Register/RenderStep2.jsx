import { city, homes, grades } from '../../../data/assests';

const RenderStep2 = ({ formData, handleInputChange, calculateAge, handleAddressChange }) => {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        تاريخ الميلاد *
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            className="w-full pl-4 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
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
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
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
                    name="Class"
                    value={formData.Class}
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
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    اختر المحافظة
                </label>
                <select
                    name="city"
                    value={formData.address.city}
                    onChange={handleAddressChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                    required
                >
                    <option value="">اختر محافظة</option>
                    {city.map((city) => (
                        <option key={city.key} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    اختر المنطقة
                </label>
                <select
                    name="region"
                    value={formData.address.region}
                    onChange={handleAddressChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                    required
                >
                    <option value="">اختر المنطقة</option>
                    {homes.map((region) => (
                        <option key={region.translation} value={region.region}>
                            {region.region}
                        </option>
                    ))}
                </select>
            </div>
            <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    ادخل اسم الشارع*
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
                    />
                </div>
            </div>

        </div>
    )
}

export default RenderStep2