
const TeacherPanel = ({ filteredTeachers,handleTeacherSelect }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
                <div
                    key={teacher.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                    <div className="flex items-center space-x-4 space-x-reverse mb-4">
                        <img
                            src={teacher.image}
                            alt={teacher.name}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-800 text-lg">
                                {teacher.name}
                            </h3>
                            <p className="text-primary">{teacher.subject}</p>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p>الخبرة: {teacher.experience}</p>
                        <p>الصفوف: {teacher.grades.join(', ')}</p>
                        <p>{teacher.qualification}</p>
                        <p className="font-semibold text-secondary text-lg">
                            {teacher.price.toLocaleString()} ل.س / الجلسة
                        </p>
                    </div>

                    <button
                        onClick={() => handleTeacherSelect(teacher.id)}
                        className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        حجز درس
                    </button>
                </div>
            ))}
        </div>
    )
}

export default TeacherPanel