import { FiCalendar } from 'react-icons/fi'

const NoLessions = () => {
    return (
        <div className="text-center py-12">
            <FiCalendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد دروس </h3>
            <p className="text-gray-500">استمتع بيومك!</p>
        </div>
    )
}

export default NoLessions