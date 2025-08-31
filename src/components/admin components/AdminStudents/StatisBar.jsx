import { FiUsers } from 'react-icons/fi'

const StatisBar = (
    {
        filteredStudents
    }
) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border-r-blue-700 border-r-4">
                <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <FiUsers className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">إجمالي الطلاب</p>
                        <p className="text-2xl font-bold text-blue-600">{filteredStudents?.length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border-r-purple-700 border-r-4">
                <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                        <FiUsers className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">المتوسط الصفي</p>
                        <p className="text-2xl font-bold text-purple-600">{
                            (filteredStudents?.reduce((a, b) => a + b["class"], 0) / filteredStudents.length)?.toFixed(2) | 0
                        }
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border-r-orange-700 border-r-4">
                <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-lg">
                        <FiUsers className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">المسجلين مؤخرا</p>
                        <p className="text-2xl font-bold text-orange-600">
                            {//createdAt
                                filteredStudents?.filter(student => {
                                    const currentMonth = new Date().getMonth();
                                    let prevMonth = new Date().getMonth() - 1;

                                    if (prevMonth < 0) {
                                        prevMonth = currentMonth
                                    }

                                    const currentDate = new Date();
                                    const prevDate = new Date();
                                    prevDate.setMonth(prevMonth);

                                    return prevDate <= new Date(student?.createdAt) <= currentDate;
                                }).length
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>)
}

export default StatisBar