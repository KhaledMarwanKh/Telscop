const express = require('express');
const router = express.Router();
const userController =require('../controllers/userController');
const authUser =require('../middlewares/authUser')
const upload =require('../middlewares/multer')

router.post('/register',userController.signup)
router.post('/login',userController.login)
router.post('/logout',authUser.authUser,userController.logout)
router.get('/get-profile',authUser.authUser,userController.getProfile)
router.post('/updateProfile',upload.single('image'),authUser.authUser,userController.updateProfile)
router.post('/book-appointment',authUser.authUser,userController.appointment)
router.get('/current-appointments',authUser.authUser,userController.listCurrentAppointment)
router.get('/completed-appointments',authUser.authUser,userController.listCompletedAppointment)
router.get('/cancelled-appointments',authUser.authUser,userController.listcancelledAppointment)
router.post('/cancel-appointment',authUser.authUser,userController.cancleAppointment)
router.get('/get-teacher',authUser.authUser,userController.getTeacher)
router.get('/get-nearest-teacher',authUser.authUser,userController.getNearestTeachersForStudent)
router.post('/forget-password',authUser.forgetPassword)
router.patch('/resetPassword',authUser.resetPassword)
router.post('/connect',userController.connectWithUs);

module.exports =router