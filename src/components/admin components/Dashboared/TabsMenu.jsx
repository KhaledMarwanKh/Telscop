import { FiBarChart, FiBookOpen, FiUser, FiUsers } from 'react-icons/fi';

const TabsMenu = (
    {
        setActiveTab,
        activeTab
    }
) => {

    const tabs = [
        { id: 'overview', label: 'نظرة عامة', icon: FiBarChart },
        { id: 'students', label: 'إحصائيات الطلاب', icon: FiUsers },
        { id: 'lessons', label: 'إحصائيات الدروس', icon: FiBookOpen },
        { id: 'teachers', label: 'إحصائيات المعلمين', icon: FiUser }
    ];

    return (
        <div className="mb-8">
            <div className="flex flex-col md:flex-row space-x-2 space-x-reverse bg-gray-100 p-1 rounded-lg">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>

    )
}

export default TabsMenu