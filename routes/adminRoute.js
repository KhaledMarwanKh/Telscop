const express = require('express');
const router = express.Router();
const upload =require('../middlewares/multer')
const adminController =require('../controllers/adminController');
const { authAdmin } = require('../middlewares/authAdmin');


router.post('/login-admin',adminController.loginAdmin)
router.get('/all-teachers',authAdmin,adminController.allTeachers)
router.get('/appointments',authAdmin,adminController.adminAppointments)
router.post('/cancel-appointment',authAdmin,adminController.cancelAppointment)
router.get('/dashboard',authAdmin,adminController.adminDashboard)
router.get('/stats-by-date-range',authAdmin,adminController.statsByDateRange)
router.get('/students-by-class',authAdmin,adminController.studentsByClass)
router.get('/teachers-by-class',authAdmin,adminController.teacherByClass)
router.get('/stats-by-teacher',authAdmin,adminController.statsByTeacher)
router.get('/general-info',authAdmin,adminController.getGeneralInformation)
router.get('/acceptOrRejectTeacher',authAdmin,adminController.acceptOrRejectTeacher)


module.exports=router