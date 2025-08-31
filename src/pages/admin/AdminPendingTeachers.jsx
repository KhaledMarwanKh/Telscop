import { useEffect, useState } from 'react';
import {
  FiUsers, FiClock
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import StatisBar from '../../components/admin components/AdminPendingTeachers/StatisBar';
import PendingTeachersTable from '../../components/admin components/AdminPendingTeachers/PendingTeachersTable';
import FilterTab from '../../components/admin components/AdminTeachers/FilterTab';
import api from '../../lib/api';
import { useNavigate } from "react-router-dom";

const AdminPendingTeachers = () => {
  const navigate = useNavigate();
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      applyFilter();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [subjectFilter, gradeFilter, regionFilter])

  const applyFilter = async () => {

    const { adminToken } = localStorage;

    try {
      const getAllTeacherRequest = await (await api.get(
        "/api/admin/get-new-teachers"
        , {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;

      let filteredTeachers = getAllTeacherRequest.data;

      console.log(filteredTeachers)

      if (regionFilter !== "all") {
        filteredTeachers = filteredTeachers?.filter(teacher => teacher?.address?.region === regionFilter);
      }

      if (gradeFilter !== "all") {
        filteredTeachers = filteredTeachers?.filter(teacher => teacher?.Class?.includes(parseInt(gradeFilter)));
      }

      if (subjectFilter !== "all") {
        filteredTeachers = filteredTeachers?.filter(teacher => teacher?.subject === subjectFilter);
      }

      console.log(filteredTeachers);


      setFilteredTeachers(filteredTeachers);
    } catch (error) {
      console.log(error);
    }
  }

  const handleApproveTeacher = async (teacherId) => {
    try {
      const { adminToken } = localStorage;

      const makeAvailableTrueRequest = await (await api.post(
        "/api/admin/acceptOrRejectTeacher"
        , {
          state: true,
          teacherId
        },
        {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;

      toast.success("تم قبول طلب التدريس بنجاح");
      applyFilter();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleRejectTeacher = async (teacherId) => {
    try {
      const { adminToken } = localStorage;

      const makeAvailableTrueRequest = await (await api.post(
        "/api/admin/acceptOrRejectTeacher"
        , {
          state: false,
          teacherId
        },
        {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      )).data;

      toast.success("تم رفض طلب التدريس بنجاح");
      applyFilter();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const getDaysAgo = (dateString) => {
    const today = new Date();
    const applicationDate = new Date(dateString);
    const diffTime = Math.abs(today - applicationDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">طلبات المعلمين</h1>
          <p className="text-gray-600">مراجعة والموافقة على طلبات التدريس الجديدة</p>
        </div>

        {/* Alert for pending applications */}
        {filteredTeachers?.length && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <FiClock className="w-5 h-5 text-yellow-600 ml-2" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  يوجد {filteredTeachers?.length} طلب في انتظار المراجعة
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  يرجى مراجعة الطلبات والوثائق المرفقة قبل اتخاذ القرار
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}

        <FilterTab
          setGradeFilter={setGradeFilter}
          setRegionFilter={setRegionFilter}
          setSubjectFilter={setSubjectFilter}
          subjectFilter={subjectFilter}
          gradeFilter={gradeFilter}
          regionFilter={regionFilter}
        />

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">طلبات التدريس ({filteredTeachers?.length})</h3>
          </div>

          <PendingTeachersTable
            handleApproveTeacher={handleApproveTeacher}
            handleRejectTeacher={handleRejectTeacher}
            filteredTeachers={filteredTeachers}
            getDaysAgo={getDaysAgo}
          />

          {!filteredTeachers?.length && (
            <div className="text-center py-12">
              <FiUsers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد طلبات جديدة</h3>
              <p className="text-gray-500">جميع طلبات التدريس تمت مراجعتها</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPendingTeachers;