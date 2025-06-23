import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { FiBookOpen, FiDollarSign, FiTrendingUp, FiUsers } from 'react-icons/fi'
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const RenderOverview = (
    {
        stats,
        monthlyChartData,
        chartOptions
    }
) => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border-r-4 border-emerald-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">إجمالي الطلاب</p>
                            <p className="text-3xl font-bold text-emerald-600">{stats.totalStudents}</p>
                        </div>
                        <div className="p-3 bg-emerald-100 rounded-lg">
                            <FiUsers className="w-8 h-8 text-emerald-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <FiTrendingUp className="w-4 h-4 text-green-500 ml-1" />
                        <span className="text-green-600 font-medium">+12%</span>
                        <span className="text-gray-500 mr-1">هذا الشهر</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border-r-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">إجمالي المعلمين</p>
                            <p className="text-3xl font-bold text-blue-600">{stats.totalTeachers}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <FiUsers className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <FiTrendingUp className="w-4 h-4 text-green-500 ml-1" />
                        <span className="text-green-600 font-medium">+8%</span>
                        <span className="text-gray-500 mr-1">هذا الشهر</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border-r-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">الدروس المكتملة</p>
                            <p className="text-3xl font-bold text-purple-600">{stats.totalLessons}</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <FiBookOpen className="w-8 h-8 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <FiTrendingUp className="w-4 h-4 text-green-500 ml-1" />
                        <span className="text-green-600 font-medium">+15%</span>
                        <span className="text-gray-500 mr-1">هذا الشهر</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border-r-4 border-orange-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">إجمالي الأرباح</p>
                            <p className="text-2xl font-bold text-orange-600">{(stats.totalEarnings / 1000000).toFixed(1)}M</p>
                            <p className="text-xs text-gray-500">ليرة سورية</p>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <FiDollarSign className="w-8 h-8 text-orange-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <FiTrendingUp className="w-4 h-4 text-green-500 ml-1" />
                        <span className="text-green-600 font-medium">+22%</span>
                        <span className="text-gray-500 mr-1">هذا الشهر</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">الاتجاهات الشهرية</h3>
                <div className="h-80  w-full flex justify-center">
                    <Bar data={monthlyChartData} options={chartOptions} />
                </div>
            </div>
        </div>
    )
}

export default RenderOverview