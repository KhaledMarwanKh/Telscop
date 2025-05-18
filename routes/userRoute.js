const express = require('express');
const router = express.Router();
const userController =require('../controllers/userController');
const authUser =require('../middlewares/authUser')
const upload =require('../middlewares/multer')

router.post('/register',userController.signup)
router.post('/login',userController.login)
router.get('/get-profile',authUser.authUser,userController.getProfile)
router.post('/updateProfile',upload.single('image'),authUser.authUser,userController.updateProfile)
router.post('/book-appointment',authUser.authUser,userController.appointment)
router.get('/appointments',authUser.authUser,userController.listAppointment)
router.post('/cancel-appointment',authUser.authUser,userController.cancleAppointment)
router.post('/forget-password',authUser.forgetPassword)
router.patch('/resetPassword/:token',authUser.resetPassword)

module.exports =router