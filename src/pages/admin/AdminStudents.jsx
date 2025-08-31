import { useEffect, useState } from 'react';
import {
  FiUsers
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import StatisBar from '../../components/admin components/AdminStudents/StatisBar';
import StudentsTable from '../../components/admin components/AdminStudents/StudentsTable';
import FilterTab from '../../components/admin components/AdminStudents/FilterTab';
import api from '../../lib/api';
import { useNavigate } from 'react-router-dom';

const AdminStudents = () => {
  const navigate = useNavigate();
  const [gradeFilter, setGradeFilter] = useState('all');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [regionFilter, setRegionFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      applyFilter();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setIsLoading(false);
  }, [gradeFilter, regionFilter])

  const applyFilter = async () => {
    const { adminToken } = localStorage;

    const getAllStudentRequest = await (await api.get(
      "/api/admin/all-students",
      {
        headers: {
          authorization: `Bearer ${adminToken}`
        }
      }
    )).data;

    let filteredStudents = getAllStudentRequest.data;

    if (gradeFilter !== "all") {
      filteredStudents = filteredStudents?.filter(student => student["class"] === parseInt(gradeFilter));
    }

    if (regionFilter !== "all") {
      filteredStudents = filteredStudents?.filter(student => student.address.region === regionFilter);
    }

    setFilteredStudents(filteredStudents);
  }

  const handleDeleteStudent = async (studentId) => {
    try {
      const { adminToken } = localStorage;

      await api.post(
        "/api/admin/delete-user",
        {
          userId: studentId
        },
        {
          headers: {
            authorization: `Bearer ${adminToken}`
          }
        }
      ).then((res) => {
        toast.success("تم حذف الطالب بنجاح");
        applyFilter();
      })
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">إدارة الطلاب</h1>
          <p className="text-gray-600">عرض وإدارة جميع الطلاب المسجلين في المنصة</p>
        </div>

        <FilterTab
          setGradeFilter={setGradeFilter}
          setRegionFilter={setRegionFilter}
          regionFilter={regionFilter}
          gradeFilter={gradeFilter}
        />

        <StatisBar
          filteredStudents={filteredStudents}
        />

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">قائمة الطلاب ({filteredStudents.length})</h3>
          </div>

          {
            isLoading ? (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="text-6xl mb-4">⏳</div>
                  <h2 className="text-xl font-semibold text-gray-600">جاري التحميل...</h2>
                </div>
              </div>
            ) : (
              <>
                {
                  filteredStudents.length === 0 ? (
                    <div className="text-center py-12">
                      <FiUsers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد نتائج</h3>
                      <p className="text-gray-500">لم يتم العثور على طلاب مطابقين لمعايير البحث</p>
                    </div>
                  ) : (
                    <StudentsTable
                      handleDeleteStudent={handleDeleteStudent}
                      filteredStudents={filteredStudents}
                    />
                  )
                }
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;