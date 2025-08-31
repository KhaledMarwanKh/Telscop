import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import OverAllLayout from './Layouts/OverAllLayout';
import AppLayout from './Layouts/AppLayout';
import TeacherLayout from './Layouts/TeacherLayout';
import AdminLayout from './Layouts/AdminLayout';

import Home from './pages/student/Home';
import Teachers, { teachersLoader } from './pages/student/Teachers';
import About from './pages/student/About';
import Contact from './pages/student/Contact';
import Login from './pages/shared/Login';
import Profile, { userInfoLoader } from './pages/student/Profile';
import Bookings from './pages/student/Bookings';
import Register from './pages/student/Register';
import Booking, { getTeacherInfo } from './pages/student/Booking';
import ErrorPage from './pages/shared/404NotFound';
import NewPassword from './pages/shared/ResetPassword';
import VarifyEmail from './pages/shared/VarifyEmail';
import ResetPassword from './pages/shared/VerifcationCodePage';
import ErrPage from './pages/Error/ErrorPage';
import TeacherDashboard, { dashboardInfoLoader } from './pages/teacher/TeacherDashboard';
import TeacherRegister from './pages/teacher/TeacherRegister';
import TeacherProfile, { getInfo } from './pages/teacher/TeacherProfile';
import TeacherSupport from "./pages/teacher/TeacherSupport";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminPendingTeachers from "./pages/admin/AdminPendingTeachers";
import AdminComplaints from './pages/admin/AdminComplaints';

const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<OverAllLayout />} errorElement={<ErrPage />}>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path='/teachers' element={<Teachers />} loader={teachersLoader} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} loader={userInfoLoader} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/booking/:teacherId' element={<Booking />} loader={getTeacherInfo} />
      </Route>

      <Route path='/login' element={<Login />} />

      <Route path='/register' element={<Register />} />

      <Route path="/varify-email" element={<VarifyEmail />} />

      <Route path='/reset-password' element={<NewPassword />} />

      <Route path='/forgot-password' element={<ResetPassword />} />

      <Route path='/teacher' element={<TeacherLayout />} >
        <Route path='/teacher/register' element={<TeacherRegister />} />
        <Route path='/teacher/profile' element={<TeacherProfile />} loader={getInfo} />
        <Route path='/teacher/dashboard' element={<TeacherDashboard />} loader={dashboardInfoLoader} />
        <Route path="/teacher/support" element={<TeacherSupport />} />
      </Route>

      <Route path='/admin' element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<AdminStudents />} />
        <Route path="/admin/teachers" element={<AdminTeachers />} />
         <Route path="/admin/bookings" element={<AdminBookings />} /> 
         <Route path="/admin/pending-teachers" element={<AdminPendingTeachers />} />
         <Route path="/admin/complaints" element={<AdminComplaints />} />
      </Route>

      <Route path='*' element={<ErrorPage />} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={browserRouter} />
  )
}

export default App