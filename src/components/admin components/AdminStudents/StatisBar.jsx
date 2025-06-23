import { FiUsers } from 'react-icons/fi'

const StatisBar = (
    {
        filteredStudents
    }
) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <FiUsers className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">إجمالي الطلاب</p>
                        <p className="text-2xl font-bold text-blue-600">{filteredStudents.length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                        <FiUsers className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">المتوسط الصفي</p>
                        <p className="text-2xl font-bold text-purple-600">5.2</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-lg">
                        <FiUsers className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="mr-4">
                        <p className="text-sm font-medium text-gray-600">جدد هذا الشهر</p>
                        <p className="text-2xl font-bold text-orange-600">12</p>
                    </div>
                </div>
            </div>
        </div>)
}

export default StatisBar