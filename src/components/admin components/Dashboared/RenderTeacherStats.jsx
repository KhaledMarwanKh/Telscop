import { Bar } from 'react-chartjs-2'

const RenderTeacherStats = (
    {
        teachersByGrade,
        chartOptions,
        activeTeachers
    }
) => {
    const teachersChartData = {
        labels: teachersByGrade.labels,
        datasets: [
            {
                label: 'عدد المعلمين',
                data: teachersByGrade.data,
                backgroundColor: 'rgba(168, 85, 247, 0.8)',
                borderColor: 'rgba(168, 85, 247, 1)',
                borderWidth: 1,
            },
        ],
    };


    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">توزيع المعلمين حسب الصف</h3>
                <div className="h-80 w-full flex justify-center">
                    <Bar data={teachersChartData} options={chartOptions} />
                </div>
            </div>


            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">المعلمين النشطين</h3>
                </div>
                <div className="overflow-auto h-[400px]">
                    <table className="w-full text-center">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">المعلم</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">المادة</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">عدد الدروس</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">عدد الطلاب</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {activeTeachers.sort((a,b)=>b.lessons - a.lessons).map((teacher) => (
                                <tr key={teacher._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-3 space-x-reverse">
                                            <img
                                                src={teacher?.image}
                                                alt=""
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div className="text-sm font-medium text-gray-900">{teacher.teacherName}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900">{teacher.subject}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">{teacher.lessons}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">{teacher.studentCount}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RenderTeacherStats