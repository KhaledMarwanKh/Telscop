const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const authTeacher = require("../middlewares/authTeacher");
const upload =require('../middlewares/multer')

const teacherFiles = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'idImage', maxCount: 1 },
  { name: 'certificates', maxCount: 5 }
]);

router.post(
  "/change-availablity",
  authTeacher.authteacher,
  teacherController.changeAvailablity
);
router.post('/logout',authTeacher.authteacher,teacherController.logout)
router.get("/list-teachers", teacherController.listTeachers);
router.post("/login-teacher", teacherController.login_teacher);
router.post("/signup-teacher", teacherFiles,teacherController.signup_teacher);
router.get(
  "/appointments",
  authTeacher.authteacher,
  teacherController.appointmentsTeacher
);
router.post(
  "/complete-appointments",
  authTeacher.authteacher,
  teacherController.appointmentComplete
);
router.post(
  "/cancel-appointments",
  authTeacher.authteacher,
  teacherController.appointmentCancelled
);
router.get(
  "/dashboard",
  authTeacher.authteacher,
  teacherController.teacherDashboard
);
router.get(
  "/profile",
  authTeacher.authteacher,
  teacherController.teacherProfile
);
router.post(
  "/update-profile",
  authTeacher.authteacher,
  upload.fields([
    { name: "image", maxCount: 1 },   // صورة شخصية واحدة
    { name: "certificates", maxCount: 5 },    // حتى 5 شهادات
  ]),
  teacherController.updateTeacherProfile
);

module.exports = router;
