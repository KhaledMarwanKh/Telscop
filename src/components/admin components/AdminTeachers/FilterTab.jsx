import React from 'react'
import { grades, homes, subjects } from '../../../data/assests'

const FilterTab = (
    {
        subjectFilter,
        setSubjectFilter,
        gradeFilter,
        setGradeFilter,
        regionFilter,
        setRegionFilter
    }
) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        المادة
                    </label>
                    <select
                        value={subjectFilter}
                        onChange={(e) => setSubjectFilter(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="all">جميع المواد</option>
                        {subjects.map((subject) => (
                            <option key={subject.key} value={subject.name}>
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
                        <option value="all">جميع الصفوف</option>
                        {grades.map((grade) => (
                            <option key={grade.value} value={grade.value}>
                                {grade.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        المنطقة
                    </label>
                    <select
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="all">جميع المناطق</option>
                        {homes.map((region) => (
                            <option key={region.translation} value={region.region}>
                                {region.region}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>)
}

export default FilterTab