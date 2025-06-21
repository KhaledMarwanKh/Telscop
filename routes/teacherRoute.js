const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const authTeacher = require("../middlewares/authTeacher");
const upload =require('../middlewares/multer')

const teacherFiles = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'idImage', maxCount: 1 },
  { name: 'certificates', maxCount: 5 }
]);

router.post(
  "/change-availablity",
  authTeacher.authteacher,
  teacherController.changeAvailablity
);
router.get("/list-teachers", teacherController.listTeachers);
router.post("/login-teacher", teacherController.login_teacher);
router.post("/signup-teacher", teacherFiles,teacherController.signup_teacher);
router.post(
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
  teacherController.updateTeacherProfile
);

module.exports = router;
