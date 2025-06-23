import { subjects } from "../../../data/adminMockData"

const FilterTab = ({
    statusFilter,
    setStatusFilter,
    setSubjectFilter,
    subjectFilter,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">فلترة بالحالة</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">جميع الحالات</option>
                        <option value="confirmed">مؤكد</option>
                        <option value="completed">مكتمل</option>
                        <option value="cancelled">ملغي</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">فلترة بالمادة</label>
                    <select
                        value={subjectFilter}
                        onChange={(e) => setSubjectFilter(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {subjects.map(subject => (
                            <option key={subject.key} value={subject.key}>{subject.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>

    )
}

export default FilterTab