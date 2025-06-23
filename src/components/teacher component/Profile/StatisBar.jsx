const StatisBar = (
    {
        teacherStat
    }
) => {
    return (
        <div className="mt-8 pt-8 border-t">
            <h2 className="text-xl font-semibold mb-6">إحصائيات الحساب</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">{teacherStat.totalStudents}</div>
                    <div className="text-gray-600 text-sm">إجمالي الطلاب</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">{teacherStat.completedLessons}</div>
                    <div className="text-gray-600 text-sm">الدروس المكتملة</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{teacherStat.totalEarnings}</div>
                    <div className="text-gray-600 text-sm">الأرباح (ل.س)</div>
                </div>
            </div>
        </div>
    )
}

export default StatisBar