import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { toast } from 'react-toastify';

const NewPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
        try {
            const { email } = localStorage;

            if (email) {
                const formData = {
                    email,
                    password,
                    passwordConfirm: confirm
                }

                const updatePasswordRequest = await (await api.patch(
                    "/api/user/resetPassword"
                    , formData
                )).data;

                if (updatePasswordRequest.status === "success") {
                    toast.success("تم تغيير كلمة المرور بنجاح");
                    navigate("/login");
                }
            }
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-white p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-4">تعيين كلمة مرور جديدة</h2>
                <p className="text-gray-600 text-center mb-6">
                    أدخل كلمة مرور قوية وأعد تأكيدها
                </p>

                <div className="mb-4 relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="كلمة المرور الجديدة"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <div className="mb-2 relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="تأكيد كلمة المرور"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-bold py-2 rounded-xl disabled:opacity-50"
                >
                    تحديث كلمة المرور
                </button>

                {submitted && (
                    <div className="mt-4 text-green-700 font-semibold text-center">
                        ✅ تم حفظ كلمة المرور بنجاح
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewPassword;