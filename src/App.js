import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import OverAllLayout from './Layouts/OverAllLayout';
import AppLayout from './Layouts/AppLayout';

import Home from './pages/student/Home';
import Teachers from './pages/student/Teachers';
import About from './pages/student/About';
import Contact from './pages/student/Contact';
import Login from './pages/student/Login';
import Profile from './pages/student/Profile';
import Bookings from './pages/student/Bookings';
import Register from './pages/student/Register';
import Booking from './pages/student/Booking';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherRegister from './pages/teacher/TeacherRegister';
import TeacherProfile from './pages/teacher/TeacherProfile';
import TeacherSettings from "./pages/teacher/TeacherSettings";
import TeacherSupport from "./pages/teacher/TeacherSupport";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminPendingTeachers from "./pages/admin/AdminPendingTeachers";
import AdminComplaints from './pages/admin/AdminComplaints';
import TeacherLayout from './Layouts/TeacherLayout';
import AdminLayout from './Layouts/AdminLayout';

const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<OverAllLayout />}>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path='/teachers' element={<Teachers />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/booking/:teacherId' element={<Booking />} />
      </Route>

      <Route path='/login' element={<Login />} />

      <Route path='/register' element={<Register />} />

      <Route path='/teacher' element={<TeacherLayout/>} >
        <Route path='/teacher/register' element={<TeacherRegister />} />
        <Route path='/teacher/profile' element={<TeacherProfile />} />
        <Route path='/teacher/dashboard' element={<TeacherDashboard />} />
        <Route path="/teacher/settings" element={<TeacherSettings />} />
        <Route path="/teacher/support" element={<TeacherSupport />} />
      </Route>

      <Route path='/admin' element={<AdminLayout/>}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<AdminStudents />} />
        <Route path="/admin/teachers" element={<AdminTeachers />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/pending-teachers" element={<AdminPendingTeachers />} />
        <Route path="/admin/complaints" element={<AdminComplaints />} />
      </Route>

      {/* <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/students" element={<AdminStudents />} />
      <Route path="/admin/teachers" element={<AdminTeachers />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
      <Route path="/admin/pending-teachers" element={<AdminPendingTeachers />} />
      <Route path="/admin/complaints" element={<AdminComplaints />} /> */}
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={browserRouter} />
  )
}

export default App