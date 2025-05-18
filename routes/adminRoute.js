const express = require('express');
const router = express.Router();
const upload =require('../middlewares/multer')
const adminController =require('../controllers/adminController');
const { authAdmin } = require('../middlewares/authAdmin');


router.post('/add-teacher',authAdmin,upload.single('image'),adminController.addTeacher)
router.post('/login-admin',adminController.loginAdmin)
router.get('/all-teachers',authAdmin,adminController.allTeachers)
router.get('/appointments',authAdmin,adminController.adminAppointments)
router.post('/cancel-appointment',authAdmin,adminController.cancelAppointment)
router.get('/dashboard',authAdmin,adminController.adminDashboard)

module.exports=router