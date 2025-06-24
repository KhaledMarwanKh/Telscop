import React from 'react'
import { FiCheck, FiX } from 'react-icons/fi'

const ComplaintDetailes = (
    {
        setResponseText,
        setSelectedComplaint,
        handleMarkInProgress,
        handleResolveComplaint,
        selectedComplaint,
        formatDate,
        getSenderTypeBadge,
        responseText
    }
) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg mt-[70px] shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">تفاصيل الاستفسار</h3>
                        <button
                            onClick={() => setSelectedComplaint(null)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <FiX className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Sender Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-3">معلومات المرسل</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm text-gray-500">الاسم:</span>
                                <p className="font-medium">{selectedComplaint.senderName}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">البريد الإلكتروني:</span>
                                <p className="font-medium">{selectedComplaint.senderEmail}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">رقم الهاتف:</span>
                                <p style={{ direction: 'ltr' }} className="font-medium">{selectedComplaint.senderPhone}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">النوع:</span>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSenderTypeBadge(selectedComplaint.senderType).color}`}>
                                    {getSenderTypeBadge(selectedComplaint.senderType).text}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Complaint Details */}
                    <div>
                        <h4 className="font-medium text-gray-800 mb-3">تفاصيل الاستفسار</h4>
                        <div className="space-y-3">
                            <div>
                                <span className="text-sm text-gray-500">الموضوع:</span>
                                <p className="font-medium">{selectedComplaint.subject}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">المحتوى:</span>
                                <p className="text-gray-700 leading-relaxed mt-1">{selectedComplaint.message}</p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">

                                <div>
                                    <span className="text-sm text-gray-500">التاريخ:</span>
                                    <p className="font-medium">{formatDate(selectedComplaint.date)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Response Section */}
                    <div>
                        <h4 className="font-medium text-gray-800 mb-3">الرد</h4>
                        {selectedComplaint.response ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p className="text-green-800">{selectedComplaint.response}</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <textarea
                                    value={responseText}
                                    onChange={(e) => setResponseText(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows="4"
                                    placeholder="اكتب ردك هنا..."
                                />
                                <div className="flex space-x-3 space-x-reverse">
                                    <button
                                        onClick={() => handleResolveComplaint(selectedComplaint.id)}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 space-x-reverse"
                                    >
                                        <FiCheck className="w-4 h-4" />
                                        <span>حل وإرسال الرد</span>
                                    </button>
                                    <button
                                        onClick={() => handleMarkInProgress(selectedComplaint.id)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        قيد المراجعة
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComplaintDetailes