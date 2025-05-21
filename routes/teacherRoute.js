const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const authTeacher = require("../middlewares/authTeacher");
router.post(
  "/change-availablity",
  authTeacher.authteacher,
  teacherController.changeAvailablity
);
router.get("/list-teachers", teacherController.listTeachers);
router.post("/login-teacher", teacherController.login_teacher);
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
  teacherController.appointmentcancelled
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
