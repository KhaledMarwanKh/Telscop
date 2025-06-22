const express = require('express');
const router = express.Router();
const upload =require('../middlewares/multer')
const adminController =require('../controllers/adminController');
const { authAdmin } = require('../middlewares/authAdmin');

// Auth
router.post('/login-admin', adminController.loginAdmin);
router.post('/logout',authAdmin,adminController.logout)

// Teacher Management
router.get('/all-activate-teachers', authAdmin, adminController.allActivateTeachers);
router.get('/get-new-teachers', authAdmin, adminController.getNewTeachers);
router.post('/acceptOrRejectTeacher', authAdmin, adminController.acceptOrRejectTeacher);
router.get('/teachers-by-class', authAdmin, adminController.teacherByClass);

// Appointments
router.get('/appointments', authAdmin, adminController.adminAppointments);
router.post('/cancel-appointment', authAdmin, adminController.cancelAppointment);
router.get('/admin-current-appointments', authAdmin, adminController.adminCurrentAppointments);
router.get('/admin-completed-appointments', authAdmin, adminController.adminCompletedAppointments);
router.get('/admin-cancelled-appointments', authAdmin, adminController.adminCancelledAppointments);

// Stats
router.get('/stats-by-teacher', authAdmin, adminController.statsByTeacher);
router.get('/general-info', authAdmin, adminController.getGeneralInformation);
router.post('/stats-by-date-range', authAdmin, adminController.statsByDateRange);
router.get('/students-by-class', authAdmin, adminController.studentsByClass);
router.get('/all-students', authAdmin, adminController.allStudents);


module.exports=router