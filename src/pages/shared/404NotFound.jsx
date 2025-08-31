import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ code = 404, message = 'الصفحة غير موجودة' }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50 flex items-center justify-center p-6">
            <div className="text-center max-w-md bg-white shadow-xl rounded-2xl p-10">
                <div className="text-blue-600 text-6xl font-bold mb-2">{code}</div>
                <h2 className="text-2xl font-semibold mb-4">{message}</h2>
                <p className="text-gray-600 mb-6">
                    يبدو أنك وصلت إلى مكان غير موجود. تأكد من الرابط أو ارجع إلى الصفحة الرئيسية.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-bold py-2 px-6 rounded-xl"
                >
                    العودة للرئيسية
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;