import { useEffect, useState } from 'react';
import {
  FiMessageSquare
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import FilterTab from '../../components/admin components/AdminComplaints/FilterTab';
import StatisBar from '../../components/admin components/AdminComplaints/StatisBar';
import ComplaintsTable from '../../components/admin components/AdminComplaints/ComplaintsTable';
import ComplaintDetailes from '../../components/admin components/AdminComplaints/ComplaintDetailes';
import api from '../../lib/api';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');

  const [once, setOnce] = useState(true);

  const applyFilter = async () => {
    try {
      const { adminToken } = localStorage;

      const filter = {};

      if (userTypeFilter !== "all") {
        filter.role = userTypeFilter;
      }

      if (statusFilter !== "all") {
        filter.status = (statusFilter === "pending") ? false : true;
      }

      const complaints = await (await api.post(
        "/api/admin/get-questions",
        filter,
        {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;

      setComplaints(complaints?.data ? complaints.data : []);

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    applyFilter();
  }, [userTypeFilter, statusFilter])

  const handleResolveComplaint = async (complaintId) => {
    try {
      const { adminToken } = localStorage;

      await api.post(
        "/api/admin/change-state-question",
        {
          status: true,
          questionId: complaintId
        },
        {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      ).then((res) => {
        toast.success("تم حل الاستفسار");
      })

      await api.post(
        "/api/admin/send-respons",
        {
          questionId: complaintId,
          subject: selectedComplaint?.subject,
          message: responseText
        },
        {
          headers:{
            authorization:`Bearer ${adminToken}`
          }
        }
      ).then((res) => {
        toast.success("تم ارسال الرد بنجاح");
      });

      setSelectedComplaint(null);
      setResponseText("");
      applyFilter();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleViewComplaint = (complaint) => {
    if (!complaint) {
      return;
    }

    setSelectedComplaint(complaint);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'في الانتظار' },
      in_progress: { color: 'bg-blue-100 text-blue-800', text: 'قيد المراجعة' },
      resolved: { color: 'bg-green-100 text-green-800', text: 'تم الحل' }
    };
    return badges[status] || badges.pending;
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

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">قائمة الاستفسارات والشكاوى ({complaints?.length})</h3>
          </div>


          {complaints?.length === 0 && (
            <div className="text-center py-12">
              <FiMessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد نتائج</h3>
              <p className="text-gray-500">لم يتم العثور على استفسارات مطابقة لمعايير البحث</p>
            </div>
          )}
        </div>

        {/* Complaint Details Modal */}

        <ComplaintsTable
          getStatusBadge={getStatusBadge}
          filteredComplaints={complaints}
          handleViewComplaint={handleViewComplaint}
        />

        {selectedComplaint && (
          <ComplaintDetailes
            handleResolveComplaint={handleResolveComplaint}
            setResponseText={setResponseText}
            setSelectedComplaint={setSelectedComplaint}
            responseText={responseText}
            selectedComplaint={selectedComplaint}
          />
        )}
      </div>
    </div>
  );
};

export default AdminComplaints;