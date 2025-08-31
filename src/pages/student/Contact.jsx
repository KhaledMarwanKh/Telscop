import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../lib/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const contactRequest = await (await api.post(
        "/api/user/connect"
        , formData
      )).data;

      if (contactRequest.success === true) {
        toast.success("تم تسجيل طلبك سيتم الرد خلال ال 24 ساعة القادمة");
      } else {
        toast.error("حدث خطا ما");
      }
    } catch (e) {
      toast.error(e.message);
    }

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">اتصل بنا</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white shadow-lg px-4 py-5">
            <h2 className="text-xl font-semibold mb-6">معلومات التواصل</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                  <FiPhone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">الهاتف</h3>
                  <p className="text-gray-600" style={{ direction: 'ltr' }}>+963 31 123 4567</p>
                  <p className="text-gray-600" style={{ direction: 'ltr' }}>+963 944 567 890</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-secondary bg-opacity-10 p-3 rounded-full">
                  <FiMail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">البريد الإلكتروني</h3>
                  <p className="text-gray-600">info@telescope-edu.sy</p>
                  <p className="text-gray-600">support@telescope-edu.sy</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-accent bg-opacity-10 p-3 rounded-full">
                  <FiMapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">العنوان</h3>
                  <p className="text-gray-600">
                    حمص، الجمهورية العربية السورية<br />
                    حي الوعر، شارع الجامعة
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-gray-100 p-3 rounded-full">
                  <FiClock className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">أوقات العمل</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>السبت - الخميس: 8:00 ص - 8:00 م</p>
                    <p>الجمعة: 10:00 ص - 6:00 م</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg px-4 py-5">
            <h2 className="text-xl font-semibold mb-6">أرسل لنا رسالة</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الكامل *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الموضوع *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">اختر الموضوع</option>
                  <option value="استفسار عن الحجز">استفسار عن الحجز</option>
                  <option value="مشكلة في الدفع">مشكلة في الدفع</option>
                  <option value="مشكلة تقنية">مشكلة تقنية</option>
                  <option value="استفسار عن المعلمين">استفسار عن المعلمين</option>
                  <option value="استفسار عام">استفسار عام</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الرسالة *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="اكتب رسالتك هنا..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2 space-x-reverse"
              >
                <FiSend className="w-5 h-5" />
                <span>إرسال الرسالة</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
