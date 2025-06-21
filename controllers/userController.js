const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchasync = require("../utils/catchasync");
const AppError = require("../utils/appError");
const teacherModel = require("../models/teacherModel");
const appointmentModel =require("../models/appointmentModel")
const cloudinary= require('cloudinary').v2
const apiFeatures =require('../utils/apiFeatures')
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
  jwt.sign(
    { email: id.email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

exports.signup = catchasync(async (req, res, next) => {
  const newuser = await userModel.create(req.body);
  createSendToken(newuser, 201, res);
});
exports.login = catchasync(async (req, res, next) => {
  const { email, password } = req.body;

  // تحقق من وجود البيانات المطلوبة
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400)); // 400 Bad Request
  }

  // البحث عن المستخدم في قاعدة البيانات
  const nuser = await userModel.findOne({ email: email }).select("+password");

  if (!nuser) {
    return next(new AppError("Incorrect email or password", 401)); // 401 Unauthorized
  }

  // التحقق من كلمة المرور
  const correct = await nuser.correctpassword(password, nuser.password);

  if (!correct) {
    return next(new AppError("Incorrect email or password", 401));
  }
  //req.id= nuser._id
  // إنشاء التوكن وإرساله
  createSendToken(nuser, 201, res);
});

exports.getProfile = catchasync(async (req, res, next) => {
  const { userid } = req.body;
  const userdata = await userModel.findById(userid).select("-password");

  res.json({ status: "success", data: userdata });
});
exports.updateProfile = catchasync(async (req, res, next) => {
  let imageUrl=""
  const { userid, name, address, phone, gender } = req.body;
  const imageFile = req.file;
  const updateData = {};
  if(imageFile){
    const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
     imageUrl =imageUpload.secure_url
  }
  if (name) updateData.name = name;
  if (phone) updateData.phone = phone;
  if (gender) updateData.gender = gender;
  if (address) updateData.address =address;
  if(imageFile) updateData.image =imageUrl
  await userModel.findByIdAndUpdate(userid, updateData);

res.status(200).json({
  status:"success",
  message :"updated data"
})
});

//api for create appointment
exports.appointment = catchasync(async (req, res, next) => {
  const { userid, teacherId, slotDate, slotTime } = req.body;

  const teacherData = await teacherModel.findById(teacherId).select('-password');
  if (!teacherData || !teacherData.available) {
    return next(new AppError("Teacher is not available", 400));
  }

  const dateObj = new Date(slotDate);
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = dayNames[dateObj.getDay()];

  
  const availableDay = teacherData.availableTimes.find(item => item.day === dayName);
  if (!availableDay) {
    return next(new AppError(`Teacher has no available times on ${dayName}`, 400));
  }

  const slots_booked = teacherData.slots_booked || {};
  const booked = slots_booked[slotDate] || []

  const isAvailable = availableDay.slots.includes(slotTime) && !booked.includes(slotTime);
  if (!isAvailable) {
    return next(new AppError("Slot not available", 400));
  }

  // 
  const existingAppointment = await appointmentModel.findOne({
    userId: userid,
    slotDate: new Date(slotDate),
    slotTime,
    cancelled: false
  });

  if (existingAppointment) {
    return next(new AppError("You already have an appointment at this time", 400));
  }

  // update 
  if (!slots_booked[slotDate]) slots_booked[slotDate] = [];
  slots_booked[slotDate].push(slotTime);

  const appointmentData = {
    userId: userid,
    teacherId,
    price: teacherData.price,
    slotDate: new Date(slotDate),
    slotTime
  };

  await appointmentModel.create(appointmentData);

  await teacherModel.findByIdAndUpdate(
    teacherId,
    { slots_booked },
    { new: true }
  );

  res.status(201).json({
    success: true,
    message: "Appointment Booked"
  });

  const teacherInfo = await teacherModel.findById(teacherId);
const studentInfo = await userModel.findById(userid);
if(teacherInfo.email){
await sendEmail.sendEmail2({
  email: teacherInfo.email, // ← تأكد أن الحقل موجود في سكيمتك
  subject: "📚 تم حجز درس جديد",
  html: `
    <p>مرحبًا ${teacherInfo.name}،</p>
    <p>لقد قام الطالب <strong>${studentInfo.name}</strong> بحجز درس لديك.</p>
    <ul>
      <li><strong>التاريخ:</strong> ${slotDate}</li>
      <li><strong>الوقت:</strong> ${slotTime}</li>
      <li><strong>السعر:</strong> ${teacherInfo.price} ل.س</li>
    </ul>
    <p>يرجى مراجعة لوحة التحكم للاطلاع على التفاصيل.</p>
    <hr>
    <p>منصة تيليسكوب للخدمات التعليمية</p>
  `,
  text: `تم حجز درس جديد من الطالب ${studentInfo.name} بتاريخ ${slotDate}، الساعة ${slotTime}. السعر: ${teacherInfo.price} ل.س.`
});
}
});

// api to get user appointments for my appointment page
exports.listCurrentAppointment =catchasync(async(req,res,next)=>{
  const {userid}=req.body
  const list = await appointmentModel.find({ userId:  mongoose.Types.ObjectId(userid) ,cancelled:false,isCompleted:false});
  res.status(200).json({
    success:true,
    data: list
}).populate('teacherId', 'name subject image')

})
exports.listCompletedAppointment =catchasync(async(req,res,next)=>{
  const {userid}=req.body
  const list = await appointmentModel.find({ userId:  mongoose.Types.ObjectId(userid) ,cancelled:false,isCompleted:true });
  res.status(200).json({
    success:true,
    data: list
}).populate('teacherId', 'name subject image')

})
exports.listcancelledAppointment =catchasync(async(req,res,next)=>{
  const {userid}=req.body
  const list = await appointmentModel.find({ userId:  mongoose.Types.ObjectId(userid) ,cancelled:true,isCompleted:false });
  res.status(200).json({
    success:true,
    data: list
}).populate('teacherId','name subject image')

})
// api to cancle  appointment
exports.cancleAppointment =catchasync(async(req,res,next)=>{
const {userid,appointmentId} =req.body
const appointmentData =  await appointmentModel.findById(appointmentId)
if(appointmentData.userId!==userid){
  return next(new AppError("unauthorized action"))
}
await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

const {teacherId,slotDate,slotTime}=appointmentData
const teacherData= await teacherModel.findById(teacherId)
let slots_booked=teacherData.slots_booked
slots_booked[slotDate]= slots_booked[slotDate].filter(e=> e!==slotTime)

await teacherModel.findByIdAndUpdate(teacherId,{slots_booked})

res.status(200).json({
  success:true,
  message:"Appoinrment cancelled"
})
})
// api to get teacher
exports.getTeacher = catchasync(async (req, res, next) => {
  const { teacherId } = req.params;

  const teacher = await teacherModel.findById(teacherId).select('-password');

  if (!teacher) {
    return next(new AppError("Teacher not found", 404));
  }

  res.status(200).json({
    success: true,
    data: teacher
  });
});
//api to get all teachers with filltering
exports.getAllTeachers = catchasync(async (req, res, next) => {
  const features = new apiFeatures(teacherModel.find({ activate: true }), req.query)
    .filter()
    .sorting()
    .limitField()
    .pagination();

  const teachers = await features.query;

  res.status(200).json({
    status: "success",
    results: teachers.length,
    data: teachers
  });
});
//api for get nearest teachers 
exports.getNearestTeachersForStudent = catchasync(async (req, res, next) => {
  const { studentId, maxDistanceKm  } = req.body;

  const student = await userModel.findById(studentId);
  if (!student || !student.location || !student.location.coordinates) {
    return next(new appError('Student location not found', 404));
  }

  const [lng, lat] = student.location.coordinates;
  const maxDistanceMeters = maxDistanceKm * 1000;

  let query = teacherModel.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        $maxDistance: maxDistanceMeters,
      },
    },
    activate: true,
  });

  const features = new apiFeatures(query, req.query) 
    .filter()
    .sorting()
    .limitField()
    .pagination();

  const nearbyTeachers = await features.query;

  res.status(200).json({
    status: "success",
    count: nearbyTeachers.length,
    data: nearbyTeachers
  });
});
