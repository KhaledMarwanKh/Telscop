import React, { useState } from 'react'
import { FiMapPin, FiPhone } from 'react-icons/fi'

const TeacherInfo = ({ teacher }) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="d border-b pb-8 mb-8 border py-3 px-4 rounded shadow-lg">
            <div className="flex items-start space-x-6 space-x-reverse">
                <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {teacher.name}
                    </h2>
                    <p className="text-lg text-primary mb-2">معلم {teacher.subject}</p>
                    <p className="text-gray-600 mb-2">خبرة {teacher.experience}</p>
                    <p className="text-gray-600 mb-4">
                        يدرس للصفوف: {new Array(teacher.Class).join('-')}
                    </p>

                    <div className="flex items-center space-x-4 space-x-reverse mb-4">
                        <span className="text-2xl font-bold text-secondary">
                            {teacher.price} ل.س
                        </span>
                        <span className="text-gray-500">/ الجلسة</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2 space-x-reverse">
                            <FiMapPin className="w-4 h-4" />
                            <span>{`${teacher.address?.city},${teacher.address?.region},${teacher.address?.street}`}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                            <FiPhone className="w-4 h-4" />
                            <span style={{ direction: 'ltr' }}>{teacher.phone}</span>
                        </div>
                    </div>
                </div>
            </div>
            {
                showMore && (
                    <>

                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-800 mb-2">الشهادة والمؤهلات</h3>
                            <p className="text-gray-600">{teacher.degree}</p>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-semibold text-gray-800 mb-2">نبذة عن المعلم</h3>
                            <p className="text-gray-600">{teacher.about}</p>
                        </div>
                    </>
                )
            }

            <div className='mt-5 border-t-[2px] py-2 text-center text-gray-600 cursor-pointer' onClick={() => setShowMore(!showMore)}>
                {
                    showMore ? 'عرض اقل' : "عرض المزيد"
                }
            </div>

        </div>
    )
}

export default TeacherInfo