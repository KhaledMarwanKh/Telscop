import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../lib/api';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState(new Array(6).fill(''));
    const inputsRef = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^\d?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const newCode = [...code];
            newCode[index - 1] = '';
            setCode(newCode);
            inputsRef.current[index - 1].focus();
        }
    };

    useEffect(() => {
        const func = async () => {
            if (code.every(digit => digit !== '')) {
                const enteredCode = code.join('');

                const { email } = localStorage;

                if (email) {
                    const formData = {
                        email,
                        code: enteredCode
                    };

                    try {
                        const varifyCode = await (await api.post(
                            "/api/user/verify-resetcode"
                            , formData
                        )).data;

                        if (varifyCode.status === "success") {
                            toast.success("نجح التحقق");
                            navigate("/reset-password");
                        }
                    } catch (e) {
                        toast.error(e.message);
                        setCode(new Array(6).fill(''));
                    }
                }
            }
        }

        func();
    }, [code]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                <h2 className="text-2xl font-bold mb-4">إعادة تعيين كلمة المرور</h2>
                <p className="text-gray-600 mb-6">أدخل رمز التحقق المكون من 6 أرقام</p>
                <div style={{ direction: 'ltr' }} className="flex justify-center gap-2">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputsRef.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-12 text-center border rounded-xl text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;