import React from 'react'
import { grades, homes } from '../../../data/assests'

const FilterTab = (
    {
        gradeFilter,
        setGradeFilter,
        regionFilter,
        setRegionFilter
    }
) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        الصف
                    </label>
                    <select
                        value={gradeFilter}
                        onChange={(e) => setGradeFilter(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {grades.map(grade => (
                            <option key={grade.value} value={grade.value}>{grade.name}</option>
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
                            <option key={region.region} value={region.region}>
                                {region.region}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </div>

    )
}

export default FilterTab