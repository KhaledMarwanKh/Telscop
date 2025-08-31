import React, { useState } from 'react'
import { FiMail } from 'react-icons/fi'
import { toast } from 'react-toastify';
import api from '../../lib/api';
import { useNavigate } from 'react-router-dom';

// /api/user/forget-password {email}
// /api/user/varify-reset  {email,code}
// /api/user/resetPassword {email,password,passwordConfirm}
const VarifyEmail = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: ''
    });

    const [isSubmited, setIsSubmited] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmited(true);

        localStorage.setItem("email", formData.email);

        console.log(formData.email)

        try {

            const varifyEmail = await (await api.post(
                "/api/user/forget-password"
                , formData
            )).data;

            if (varifyEmail.status === "success") {
                navigate("/forgot-password");
                toast.success("تم ارسال الكود");
            }

        } catch (e) {
            console.log(e)
            toast.error(e.message);
            localStorage.removeItem("email");
        }

        setIsSubmited(false);
    }

    return (
        <div className='w-full min-h-[100vh] flex items-center justify-center bg-[#f9f9f9]'>
            <form onSubmit={handleSubmit} className='bg-white w-[300px] md:w-[400px] rounded-md shadow-lg px-6 py-5 flex flex-col gap-5'>
                <div className='group'>
                    <label htmlFor='email' className="block text-sm font-semibold text-gray-700 mb-3">
                        البريد الإلكتروني *
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <FiMail className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            id='email'
                            onChange={({ target: { value } }) => setFormData((prev) => ({
                                email: value
                            }))}
                            className="w-full pl-4 pr-12 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white placeholder:text-gray-400"
                            placeholder="أدخل بريدك الإلكتروني"
                            required
                        />
                    </div>
                </div>
                <input disabled={isSubmited} className="px-4 py-3 cursor-pointer rounded bg-primary text-white font-bold" type="submit" value="ارسال كود التحقق" />
            </form>
        </div>
    )
}

export default VarifyEmail