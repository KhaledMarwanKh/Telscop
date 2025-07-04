import { subjects } from "../../../data/adminMockData"

const FilterTab = ({
    statusFilter,
    setStatusFilter,
    setSubjectFilter,
    subjectFilter,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between gap-4">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-[40%] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="all">جميع الحالات</option>
                    <option value="confirmed">مؤكد</option>
                    <option value="completed">مكتمل</option>
                    <option value="cancelled">ملغي</option>
                </select>

                <select
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                    className="w-[40%] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    {subjects.map(subject => (
                        <option key={subject.key} value={subject.key}>{subject.name}</option>
                    ))}
                </select>
            </div>
        </div>

    )
}

export default FilterTab