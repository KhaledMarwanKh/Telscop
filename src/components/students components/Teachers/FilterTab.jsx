import React from 'react'
import { FiFilter } from 'react-icons/fi'
import { grades, subjects } from '../../../data/mockData'

const FilterTab = ({
    filteredTeachers
    , subjectFilter
    , setSubjectFilter
    , setGradeFilter
    , gradeFilter
    , clearFilters
}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <FiFilter className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-800">فلترة النتائج</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        المادة
                    </label>
                    <select
                        value={subjectFilter}
                        onChange={(e) => setSubjectFilter(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="">جميع المواد</option>
                        {subjects.map((subject) => (
                            <option key={subject.key} value={subject.key}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        الصف
                    </label>
                    <select
                        value={gradeFilter}
                        onChange={(e) => setGradeFilter(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="">جميع الصفوف</option>
                        {grades.map((grade) => (
                            <option key={grade.value} value={grade.value}>
                                {grade.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-end">
                    <button
                        onClick={clearFilters}
                        className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        إلغاء الفلاتر
                    </button>
                </div>

                <div className="flex items-end">
                    <div className="w-full bg-primary text-white px-6 py-3 rounded-lg text-center">
                        {filteredTeachers.length} معلم متاح
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterTab