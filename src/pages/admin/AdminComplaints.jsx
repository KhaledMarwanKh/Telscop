import { useEffect, useState } from 'react';
import {
  FiMessageSquare, FiSearch, FiEye, FiCheck, FiX,
  FiPhone, FiMail,
  FiClock, FiAlertCircle
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import FilterTab from '../../components/admin components/AdminComplaints/FilterTab';
import StatisBar from '../../components/admin components/AdminComplaints/StatisBar';
import ComplaintsTable from '../../components/admin components/AdminComplaints/ComplaintsTable';
import ComplaintDetailes from '../../components/admin components/AdminComplaints/ComplaintDetailes';

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

  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [statis, setStatis] = useState({
    pendingCount: 0,
    inProgressCount: 0,
    resolvedCount: 0
  })

  const applyFilter = () => {
    let filteredComplaints = (statusFilter !== 'all') ? complaints.filter(complaint => complaint.status === statusFilter) : complaints;
    filteredComplaints = (userTypeFilter !== 'all') ? filteredComplaints.filter(complaint => complaint.senderType === userTypeFilter) : filteredComplaints;
    const pendingCount = filteredComplaints.filter(c => c.status === 'pending').length;
    const inProgressCount = filteredComplaints.filter(c => c.status === 'in_progress').length;
    const resolvedCount = filteredComplaints.filter(c => c.status === 'resolved').length;
    setStatis({
      pendingCount,
      inProgressCount,
      resolvedCount
    })
    setFilteredComplaints(filteredComplaints);
  }

  useEffect(() => {
    applyFilter();
  }, [userTypeFilter, statusFilter])

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


  const getSenderTypeBadge = (senderType) => {
    const badges = {
      student: { color: 'bg-green-100 text-green-800', text: 'طالب' },
      teacher: { color: 'bg-purple-100 text-purple-800', text: 'معلم' },
      other: { color: 'bg-blue-100 text-blue-800', text: 'اخرون' },
    };
    return badges[senderType] || badges.student;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">الاستفسارات والشكاوى</h1>
          <p className="text-gray-600">مراجعة والرد على استفسارات وشكاوى المستخدمين</p>
        </div>

        <FilterTab
          setStatusFilter={setStatusFilter}
          setUserTypeFilter={setUserTypeFilter}
          userTypeFilter={userTypeFilter}
          statusFilter={statusFilter}
        />

        <StatisBar
          statis={statis}
        />

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">قائمة الاستفسارات والشكاوى ({filteredComplaints.length})</h3>
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

        <ComplaintsTable
          getSenderTypeBadge={getSenderTypeBadge}
          getStatusBadge={getStatusBadge}
          filteredComplaints={filteredComplaints}
          formatDate={formatDate}
          handleMarkInProgress={handleMarkInProgress}
          handleViewComplaint={handleViewComplaint}
        />

        {selectedComplaint && (
          <ComplaintDetailes
            handleMarkInProgress={handleMarkInProgress}
            handleResolveComplaint={handleResolveComplaint}
            setResponseText={setResponseText}
            setSelectedComplaint={setSelectedComplaint}
            responseText={responseText}
            selectedComplaint={selectedComplaint}
            formatDate={formatDate}
            getSenderTypeBadge={getSenderTypeBadge}
          />
        )}
      </div>
    </div>
  );
};

export default AdminComplaints;