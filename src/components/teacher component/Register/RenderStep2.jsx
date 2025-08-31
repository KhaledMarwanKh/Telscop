import React from 'react'
import { grades, subjects as teacherSubjects } from '../../../data/assests'


const RenderStep2 = (
    {
        formData,
        handleGradeChange,
        handleInputChange,
    }
) => {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    المادة التي تدرسها *
                </label>
                <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                    required
                >
                    <option value="">اختر المادة</option>
                    {teacherSubjects.slice(1).map((subject) => (
                        <option key={subject.key} value={subject.name}>
                            {subject.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    الصفوف التي تدرس لها * (يمكن اختيار أكثر من صف)
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {grades.slice(1).map((grade) => (
                        <button
                            key={grade.value}
                            type="button"
                            onClick={() => handleGradeChange(grade.value)}
                            className={`p-3 border-2 rounded-xl transition-all duration-300 text-sm font-medium ${formData.Class.includes(grade.value)
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                                : 'border-gray-200 hover:border-emerald-300 text-gray-700'
                                }`}
                        >
                            {grade.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        سنوات الخبرة *
                    </label>
                    <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                        required
                    >
                        <option value="">اختر سنوات الخبرة</option>
                        <option value="1">سنة واحدة</option>
                        <option value="2">سنتان</option>
                        <option value="3">3 سنوات</option>
                        <option value="4">4 سنوات</option>
                        <option value="5">5 سنوات</option>
                        <option value="6">6 سنوات</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        تكلفة الجلسة (ليرة سورية) *
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                        placeholder="مثال: 25000"
                        min="0"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    المؤهل العلمي *
                </label>
                <input
                    type="text"
                    name="degree"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white placeholder:text-gray-400"
                    placeholder="مثال: بكالوريوس رياضيات - جامعة دمشق"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    نبذة عنك (اختياري)
                </label>
                <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white placeholder:text-gray-400"
                    placeholder="اكتب نبذة مختصرة عن خبرتك وأسلوب التدريس..."
                />
            </div>
        </div>
    )
}

export default RenderStep2