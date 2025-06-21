const teacherModel = require("../models/teacherModel");
const appError = require("../utils/appError");
const catchasync = require("../utils/catchasync");
const jwt = require("jsonwebtoken");
const appointmentModel = require("../models/appointmentModel");
const apiFeatures = require("./../utils/apiFeatures");
const cloudinary = require("cloudinary").v2;
const fs = require('fs');
const { findByIdAndUpdate } = require("../models/userModel");
const sendEmail =require('../utils/email')

const createSendToken = (nuser, statusCode, res) => {
  const token = generatetoken(nuser);
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: false,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOption.secure = true;
  res.cookie("jwt", token, cookieOption);
  nuser.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
  });
};

const generatetoken = (id) =>
  jwt.sign({ id: id._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.changeAvailablity = catchasync(async (req, res, next) => {
  const { id } = req.body;

  const teaData = await teacherModel.findById(id);
  await teacherModel.findByIdAndUpdate(id, { available: !teaData.available });
  res.status(201).json({
    status: "success",
    message: "Availablity changed",
  });
});

exports.listTeachers = catchasync(async (req, res, next) => {
  let filter = {};
  if (req.params.teacherId) filter = { tour: req.params.teacherId };

  const feature = new apiFeatures(teacherModel.find(filter), req.query)
    .filter()
    .sorting()
    .limitField()
    .pagination();
  const docs = await feature.query;
  const teachers = await teacherModel.find({}).select(["-password", "-email"]);
  res.status(200).json({
    status: "success",
    data: docs,
  });
});
//api for teacher signup

exports.signup_teacher = catchasync(async (req, res, next) => {
  const {
    name, email, password, passwordConfirm,
    degree, about, experience, gender, address,
    subject, price, availableTimes
  } = req.body;

  if (!name || !email || !password || !passwordConfirm || !degree || !about || !experience || !gender || !address || !subject || !price) {
    return next(new appError("Missing details", 400));
  }

  if (!validator.isEmail(email)) {
    return next(new appError("Invalid email!", 400));
  }

  if (password.length < 8) {
    return next(new appError("Password must be at least 8 characters", 400));
  }

  const existing = await teacherModel.findOne({ email });
  if (existing) return next(new appError("Email already registered", 400));

  const uploadAndDelete = async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto"
    });
    fs.unlinkSync(file.path); // حذف الملف
    return result.secure_url;
  };

  // رفع الصور
  const profileImage = req.files?.profileImage?.[0];
  const idImage = req.files?.idImage?.[0];
  const certificates = req.files?.certificates || [];

  const imageUrl = profileImage ? await uploadAndDelete(profileImage) : '';
  const idUrl = idImage ? await uploadAndDelete(idImage) : '';
  const certificateUrls = await Promise.all(certificates.map(uploadAndDelete));

  // بناء بيانات المدرّس
  const teacherData = {
    name,
    email,
    password,
    passwordConfirm,
    degree,
    about,
    experience,
    gender,
    address,
    subject,
    price: Number(price),
    availableTimes: JSON.parse(availableTimes || "[]"),
    image: imageUrl,
    idImage: idUrl,
    certificates: certificateUrls,
    date: Date.now(),
  };

  const teacher = await teacherModel.create(teacherData);
  createSendToken(teacher, 201, res);
});


// api for teacher login
exports.login_teacher = catchasync(async (req, res, next) => {
  const { email, password } = req.body;
  const teacher = await teacherModel.findOne({ email });
  if (!teacher) {
    return next(new appError("invalid credentials", 404));
  }
  if (!teacher.isActive) {
    return res.status(403).send('Your account is not activated yet.');
  }
  const correct = await teacher.correctpassword(password);
  if (correct) {
    createSendToken(teacher, 201, res);
  } else {
    return next(new appError("invalid credentials", 404));
  }
});
// API FOR GET TEACHER APPOINTMENTS
exports.appointmentsTeacher = catchasync(async (req, res, next) => {
  const { teacherId } = req.body;
  const appointments = await appointmentModel.find({ teacherId}).populate('userId', 'name Class subject price comment');

  res.status(200).json({
    success: true,
    data: appointments,
  });
});

// api to mark appointment complete
exports.appointmentComplete = catchasync(async (req, res, next) => {
  const { teacherId, appointmentId } = req.body;

  const appointmentData = await appointmentModel.findById(appointmentId);
  if (!appointmentData || appointmentData.teacherId.toString() !== teacherId) {
    return res.status(400).json({
      success: false,
      message: "Appointment not found or unauthorized",
    });
  }

  // تحديث الموعد
  await appointmentModel.findByIdAndUpdate(appointmentId, {
    isCompleted: true,
  });

  // إزالة الوقت من slots_booked
  const teacher = await teacherModel.findById(teacherId);
  const { slotDate, slotTime } = appointmentData;

  if (teacher.slots_booked?.[slotDate]) {
    teacher.slots_booked[slotDate] = teacher.slots_booked[slotDate].filter(
      (time) => time !== slotTime
    );
    await teacher.save();
  }

  res.status(200).json({
    success: true,
    message: "Appointment marked as completed and slot released.",
  });
});
// api to canclled appointment 

exports.appointmentCancelled = catchasync(async (req, res, next) => {
  const { teacherId, appointmentId } = req.body;

  const appointmentData = await appointmentModel.findById(appointmentId);
  if (!appointmentData || appointmentData.teacherId.toString() !== teacherId) {
    return res.status(400).json({
      success: false,
      message: "Appointment not found or unauthorized",
    });
  }

  // تحديث الموعد
  await appointmentModel.findByIdAndUpdate(appointmentId, {
    cancelled: true,
  });

  // إزالة الوقت من slots_booked
  const teacher = await teacherModel.findById(teacherId);
  const { slotDate, slotTime } = appointmentData;

  if (teacher.slots_booked?.[slotDate]) {
    teacher.slots_booked[slotDate] = teacher.slots_booked[slotDate].filter(
      (time) => time !== slotTime
    );
    await teacher.save();
  }

  res.status(200).json({
    success: true,
    message: "Appointment cancelled and slot released.",
    
  });
  const student = await userModel.findById(appointmentData.userId);

  await sendEmail.sendEmail2({
    email: student.email,
    subject: "❌ تم إلغاء موعد الدرس",
    html: `
      <p>مرحبًا ${student.name}،</p>
      <p>نأسف لإبلاغك بأن أستاذ <strong>${teacher.name}</strong> قد قام بإلغاء حجز الدرس التالي:</p>
      <ul>
        <li><strong>التاريخ:</strong> ${appointmentData.slotDate.toDateString()}</li>
        <li><strong>الوقت:</strong> ${appointmentData.slotTime}</li>
      </ul>
      <p>يرجى حجز موعد جديد في الوقت المناسب لك.</p>
      <hr>
      <p>منصة تيليسكوب للخدمات التعليمية</p>
    `,
    text: `تم إلغاء موعد درسك مع الأستاذ ${teacher.name} بتاريخ ${appointmentData.slotDate}, الساعة ${appointmentData.slotTime}.`
  });
  
});

// api to dashboard for teacher
exports.teacherDashboard = catchasync(async (req, res, next) => {
  const { teacherId } = req.body;

  const appointments = await appointmentModel.find({ teacherId }).sort({ createdAt: -1 });

  let earnings = 0;
  let completedLessons = 0;
  let studentsSet = new Set();

  appointments.forEach((item) => {
    if (item.isCompleted) {
      earnings += item.price;
      completedLessons++;
      studentsSet.add(item.userId.toString()); // add student even if الدرس لم يكتمل
    }
  });

  const dashsdata = {
    earnings,
    completedLessons,
    studentsCount: studentsSet.size,
  };

  res.status(200).json({
    status: "success",
    data: dashsdata
  });
});

// api to get teacher profile
exports.teacherProfile = catchasync(async (req, res, next) => {
  const { teacherId } = req.body;
  const profileData = await teacherModel
    .findById(teacherId)
    .select("-password");
  res.status(200).json({
    success: true,
    data: profileData,
  });
});
// api for update profileData
exports.updateTeacherProfile = catchasync(async (req, res, next) => {
  const { teacherId, address, subject,availableTimes,Class,about,price,phone } = req.body;
  const updateObj = {};
  if (phone) updateObj.phone = phone;
  if (price) updateObj.price = price;
  if (address) updateObj.address = address;
  if (subject) updateObj.subject = subject;
  if (availableTimes) updateObj.availableTimes = availableTimes;
  if (Class) updateObj.Class = Class;
  if (about) updateObj.about = about;
  
  await teacherModel.findByIdAndUpdate(teacherId, updateObj, { new: true }); 
   res.status(200).json({
    success: true,
    message: "profile updated",
  });
});
