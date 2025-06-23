import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMessageSquare, FiSearch, FiFilter, FiEye, FiCheck, FiX, 
  FiHome, FiLogOut, FiShield, FiChevronDown, FiPhone, FiMail,
  FiClock, FiAlertCircle, FiUser, FiSend
} from 'react-icons/fi';
import { adminProfile } from '../../data/adminMockData';
import { toast } from 'react-toastify';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      type: 'complaint',
      subject: 'مشكلة في الدفع',
      message: 'لم أتمكن من إكمال عملية الدفع للدرس المحجوز. أرجو المساعدة في حل هذه المشكلة.',
      senderName: 'أحمد محمد علي',
      senderEmail: 'ahmed@email.com',
      senderPhone: '+963 944 123 456',
      senderType: 'student',
      priority: 'high',
      status: 'pending',
      date: '2024-06-20',
      category: 'payment'
    },
    {
      id: 2,
      type: 'inquiry',
      subject: 'استفسار حول تغيير المواعيد',
      message: 'أريد معرفة كيفية تغيير موعد الدرس المحجوز مسبقاً وما هي الشروط المطلوبة.',
      senderName: 'فاطمة خالد النور',
      senderEmail: 'fatima@email.com',
      senderPhone: '+963 944 234 567',
      senderType: 'teacher',
      priority: 'normal',
      status: 'pending',
      date: '2024-06-19',
      category: 'booking'
    },
    {
      id: 3,
      type: 'complaint',
      subject: 'عدم حضور الطالب',
      message: 'الطالب لم يحضر للدرس المحدد ولم يتم إعلامي مسبقاً. أرجو إيجاد حل لهذه المشكلة المتكررة.',
      senderName: 'سارة محمود القادري',
      senderEmail: 'sara@email.com',
      senderPhone: '+963 944 345 678',
      senderType: 'teacher',
      priority: 'normal',
      status: 'resolved',
      date: '2024-06-18',
      category: 'lesson',
      response: 'تم التواصل مع الطالب وحل المشكلة. سيتم خصم تكلفة الدرس من رصيد الطالب.'
    },
    {
      id: 4,
      type: 'inquiry',
      subject: 'كيفية إضافة مادة جديدة',
      message: 'أريد إضافة مادة الفلسفة إلى قائمة المواد التي أدرسها. ما هي الخطوات المطلوبة؟',
      senderName: 'خالد يوسف المحمد',
      senderEmail: 'khaled@email.com',
      senderPhone: '+963 944 456 789',
      senderType: 'teacher',
      priority: 'low',
      status: 'in_progress',
      date: '2024-06-17',
      category: 'account'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [responseText, setResponseText] = useState('');

  const admin = adminProfile;

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesType = typeFilter === 'all' || complaint.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || complaint.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const handleResolveComplaint = (complaintId) => {
    if (!responseText.trim()) {
      toast.error('يرجى كتابة رد قبل وضع علامة كحل');
      return;
    }

    setComplaints(prev => prev.map(c => 
      c.id === complaintId ? { ...c, status: 'resolved', response: responseText } : c
    ));
    setSelectedComplaint(null);
    setResponseText('');
    toast.success('تم حل الاستفسار بنجاح');
  };

  const handleMarkInProgress = (complaintId) => {
    setComplaints(prev => prev.map(c => 
      c.id === complaintId ? { ...c, status: 'in_progress' } : c
    ));
    toast.info('تم تحديث الحالة إلى قيد المراجعة');
  };

  const handleViewComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setResponseText(complaint.response || '');
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'في الانتظار' },
      in_progress: { color: 'bg-blue-100 text-blue-800', text: 'قيد المراجعة' },
      resolved: { color: 'bg-green-100 text-green-800', text: 'تم الحل' }
    };
    return badges[status] || badges.pending;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      low: { color: 'bg-gray-100 text-gray-800', text: 'منخفضة' },
      normal: { color: 'bg-blue-100 text-blue-800', text: 'عادية' },
      high: { color: 'bg-red-100 text-red-800', text: 'عالية' }
    };
    return badges[priority] || badges.normal;
  };

  const getTypeBadge = (type) => {
    const badges = {
      complaint: { color: 'bg-red-100 text-red-800', text: 'شكوى' },
      inquiry: { color: 'bg-blue-100 text-blue-800', text: 'استفسار' }
    };
    return badges[type] || badges.inquiry;
  };

  const getSenderTypeBadge = (senderType) => {
    const badges = {
      student: { color: 'bg-green-100 text-green-800', text: 'طالب' },
      teacher: { color: 'bg-purple-100 text-purple-800', text: 'معلم' }
    };
    return badges[senderType] || badges.student;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const pendingCount = complaints.filter(c => c.status === 'pending').length;
  const inProgressCount = complaints.filter(c => c.status === 'in_progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved').length;
  const highPriorityCount = complaints.filter(c => c.priority === 'high' && c.status !== 'resolved').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 space-x-reverse ml-8">
                <span className="text-2xl">🔭</span>
                <span className="text-xl font-bold text-blue-600">تلسكوب</span>
              </Link>
              <div className="flex items-center space-x-2 space-x-reverse">
                <FiMessageSquare className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700 font-medium">الاستفسارات والشكاوى</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Link
                to="/admin/dashboard"
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                العودة للوحة التحكم
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-3 space-x-reverse p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={admin.image}
                    alt={admin.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <FiChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      to="/"
                      className="flex items-center space-x-3 space-x-reverse px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FiHome className="w-4 h-4 text-gray-500" />
                      <span>الموقع الرئيسي</span>
                    </Link>
                    <Link
                      to="/admin/login"
                      className="flex items-center space-x-3 space-x-reverse px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="w-4 h-4 text-red-500" />
                      <span>تسجيل الخروج</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">الاستفسارات والشكاوى</h1>
          <p className="text-gray-600">مراجعة والرد على استفسارات وشكاوى المستخدمين</p>
        </div>

        {/* Alert for high priority items */}
        {highPriorityCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <FiAlertCircle className="w-5 h-5 text-red-600 ml-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  يوجد {highPriorityCount} استفسار عالي الأولوية في انتظار المراجعة
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  يرجى مراجعة هذه الاستفسارات والرد عليها في أسرع وقت ممكن
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">البحث</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="البحث في الموضوع، المرسل، أو المحتوى..."
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الحالات</option>
                <option value="pending">في الانتظار</option>
                <option value="in_progress">قيد المراجعة</option>
                <option value="resolved">تم الحل</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">النوع</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الأنواع</option>
                <option value="complaint">شكوى</option>
                <option value="inquiry">استفسار</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الأولوية</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الأولويات</option>
                <option value="high">عالية</option>
                <option value="normal">عادية</option>
                <option value="low">منخفضة</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FiClock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">في الانتظار</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiMessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
                <p className="text-2xl font-bold text-blue-600">{inProgressCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FiCheck className="w-6 h-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">تم الحل</p>
                <p className="text-2xl font-bold text-green-600">{resolvedCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <FiAlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">عالية الأولوية</p>
                <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">قائمة الاستفسارات والشكاوى ({filteredComplaints.length})</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">المرسل</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الموضوع</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">النوع</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الأولوية</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">التاريخ</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredComplaints.map((complaint) => {
                  const statusBadge = getStatusBadge(complaint.status);
                  const priorityBadge = getPriorityBadge(complaint.priority);
                  const typeBadge = getTypeBadge(complaint.type);
                  const senderTypeBadge = getSenderTypeBadge(complaint.senderType);
                  
                  return (
                    <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{complaint.senderName}</div>
                          <div className="text-sm text-gray-500">{complaint.senderEmail}</div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${senderTypeBadge.color} mt-1`}>
                            {senderTypeBadge.text}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                          {complaint.subject}
                        </div>
                        <div className="text-sm text-gray-500 max-w-xs truncate mt-1">
                          {complaint.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeBadge.color}`}>
                          {typeBadge.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityBadge.color}`}>
                          {priorityBadge.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {formatDate(complaint.date)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusBadge.color}`}>
                          {statusBadge.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button
                            onClick={() => handleViewComplaint(complaint)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                            title="عرض التفاصيل"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <a
                            href={`tel:${complaint.senderPhone}`}
                            className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                            title="اتصال"
                          >
                            <FiPhone className="w-4 h-4" />
                          </a>
                          <a
                            href={`mailto:${complaint.senderEmail}`}
                            className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-50"
                            title="إرسال بريد إلكتروني"
                          >
                            <FiMail className="w-4 h-4" />
                          </a>
                          {complaint.status === 'pending' && (
                            <button
                              onClick={() => handleMarkInProgress(complaint.id)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                              title="وضع علامة قيد المراجعة"
                            >
                              <FiClock className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredComplaints.length === 0 && (
            <div className="text-center py-12">
              <FiMessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد نتائج</h3>
              <p className="text-gray-500">لم يتم العثور على استفسارات مطابقة لمعايير البحث</p>
            </div>
          )}
        </div>

        {/* Complaint Details Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
                      <p className="font-medium">{selectedComplaint.senderPhone}</p>
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
                        <span className="text-sm text-gray-500">النوع:</span>
                        <br />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(selectedComplaint.type).color}`}>
                          {getTypeBadge(selectedComplaint.type).text}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">الأولوية:</span>
                        <br />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(selectedComplaint.priority).color}`}>
                          {getPriorityBadge(selectedComplaint.priority).text}
                        </span>
                      </div>
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
        )}
      </div>
    </div>
  );
};

export default AdminComplaints;