import { subjects } from "../../../data/assests"

const FilterTab = ({
    statusFilter,
    setStatusFilter,
    setSubjectFilter,
    subjectFilter,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="all">جميع الحالات</option>
                    <option value="confirmed">مؤكد</option>
                    <option value="completed">مكتمل</option>
                    <option value="cancelled">ملغي</option>
                </select>

                <select
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="all">جميع  المواد</option>
                    {subjects.map(subject => (
                        <option key={subject.key} value={subject.name}>{subject.name}</option>
                    ))}
                </select>
            </div>
        </div>

    )
}

export default FilterTab