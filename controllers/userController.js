const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchasync = require("../utils/catchasync");
const AppError = require("../utils/appError");
const questionModel = require("../models/questionsModel");
const teacherModel = require("../models/teacherModel");
const appointmentModel =require("../models/appointmentModel")
const cloudinary= require('cloudinary').v2
const apiFeatures =require('../utils/apiFeatures')
const sendEmail =require('../utils/email')



const createSendToken = (nuser, statusCode, res, userType) => {
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
    userType:userType,
    token
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
  const uploadAndDelete = async (file) => {
    const filePath = path.resolve(file.path);
  
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
  
    fs.unlinkSync(filePath); // حذف الملف بعد رفعه
    return result.secure_url;
  };
  exports.logout = (req, res,next) => {
    res.cookie('jwt', 'loggedout', {
      httpOnly: true,
      expires: new Date(Date.now() + 10 * 1000)
    });
  
    res.status(200).json({
      status: 'success',
      message: 'logout successfly'
    });
  };
exports.signup = catchasync(async (req, res, next) => {
  let {
    name,
    email,
    password,
    passwordConfirm,
    gender,
    address,
    location,
    phone,
    Class,
    birthDate
  } = req.body;

  const profileImage = req.files?.image?.[0];
  const imageUrl = profileImage ? await uploadAndDelete(profileImage) : "";
  const userData = {
    name,
    email,
    password,
    passwordConfirm,
    gender,
    address,
    image: imageUrl,
    phone:phone,
    location:location,
    Class:Class,
    birthDate:birthDate
  };

  const newuser = await userModel.create(userData);


  createSendToken(newuser, 201, res);
});

exports.login = catchasync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  let user;
  let userType;

  user = await userModel.findOne({ email, role: "admin" }).select("+password");
  if (user) {
    userType = "admin";
  }

  if (!user) {
    user = await userModel.findOne({ email }).select("+password");
    if (user) {
      userType = "student";
    }
  }

  if (!user) {
    user = await teacherModel.findOne({ email }).select("+password");
    if (user) {
      userType = "teacher";
    }
  }

  if (!user) {
    return next(new AppError("Incorrect email or password", 401));
  }
  const correct = await user.correctpassword(password, user.password);
  console.log(password)

  if (!correct) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res, { userType });
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
    slotTime,
    subject:teacherData.subject
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
exports.updateAppointment = catchasync(async (req, res, next) => {
  const { appointmentId, newSlotDate, newSlotTime } = req.body;
  const userId = req.body.userid;

  const appointment = await appointmentModel.findById(appointmentId);
  if (!appointment || appointment.userId.toString() !== userId) {
    return next(new AppError("Appointment not found or not yours", 404));
  }

  const teacherData = await teacherModel.findById(appointment.teacherId).select('-password');
  if (!teacherData || !teacherData.available) {
    return next(new AppError("Teacher is not available", 400));
  }

  const dateObj = new Date(newSlotDate);
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = dayNames[dateObj.getDay()];

  const availableDay = teacherData.availableTimes.find(item => item.day === dayName);
  if (!availableDay) {
    return next(new AppError(`Teacher has no available times on ${dayName}`, 400));
  }

  const slots_booked = teacherData.slots_booked || {};

  const bookedSlotsForNewDate = slots_booked[newSlotDate] || [];
  if (bookedSlotsForNewDate.includes(newSlotTime)) {
    return next(new AppError("New slot is already booked", 400));
  }

  // تحقق من أن الوقت الجديد متاح في أوقات الأستاذ
  if (!availableDay.slots.includes(newSlotTime)) {
    return next(new AppError("New slot is not available", 400));
  }

  // إزالة الموعد القديم من slots_booked للأستاذ
  const oldDate = appointment.slotDate.toISOString().split('T')[0];
  const oldTime = appointment.slotTime;

  if (slots_booked[oldDate]) {
    slots_booked[oldDate] = slots_booked[oldDate].filter(slot => slot !== oldTime);
    if (slots_booked[oldDate].length === 0) delete slots_booked[oldDate];
  }

  // إضافة الموعد الجديد إلى slots_booked
  if (!slots_booked[newSlotDate]) slots_booked[newSlotDate] = [];
  slots_booked[newSlotDate].push(newSlotTime);

  // تحديث بيانات الحجز
  appointment.slotDate = new Date(newSlotDate);
  appointment.slotTime = newSlotTime;
  await appointment.save();

  // تحديث الأستاذ بالموعد الجديد
  await teacherModel.findByIdAndUpdate(teacherData._id, { slots_booked }, { new: true });

const studentInfo = await studentModel.findById(userId).select("name email");
if (!studentInfo) {
  return next(new AppError("Student not found", 404));
}

await sendEmail.sendEmail2({
  email: teacherData.email,
  subject: "📚 تم حجز درس جديد",
  html: `
    <p>مرحبًا ${teacherData.name}،</p>
    <p>لقد قام الطالب <strong>${studentInfo.name}</strong> بتعديل موعد درس لديك.</p>
    <ul>
      <li><strong>التاريخ:</strong> ${newSlotDate}</li>
      <li><strong>الوقت:</strong> ${newSlotTime}</li>
      <li><strong>السعر:</strong> ${teacherData.price} ل.س</li>
    </ul>
    <p>يرجى مراجعة لوحة التحكم للاطلاع على التفاصيل.</p>
    <hr>
    <p>منصة تيليسكوب للخدمات التعليمية</p>
  `,
  text: `تم تعديل موعد درس من الطالب ${studentInfo.name} بتاريخ ${newSlotDate}، الساعة ${newSlotTime}. السعر: ${teacherData.price} ل.س.`
});

res.status(200).json({
  success: true,
  message: "Appointment updated successfully",
  appointment
});

});

// api to get user appointments for my appointment page
exports.listCurrentAppointment =catchasync(async(req,res,next)=>{
  const {userid}=req.body
  const list = await appointmentModel.find({ userId:userid,cancelled:false,isCompleted:false});
  res.status(200).json({
    success:true,
    data: list
}).populate('teacherId', 'name subject image location ')

})
//-------------------------
exports.listCompletedAppointment = catchasync(async (req, res, next) => {
  const { userid } = req.body;

  const list = await appointmentModel.find({
    userId:userid,
    cancelled: false,
    isCompleted: true
  }).populate('teacherId', 'name subject image');

  
  const totalPrice = list.reduce((acc, appointment) => acc + (appointment.price || 0), 0);

  res.status(200).json({
    success: true,
    totalLessons: list.length,
    totalPrice, 
    data: list
  });
});
exports.listcancelledAppointment =catchasync(async(req,res,next)=>{
  const {userid}=req.body
  const list = await appointmentModel.find({ userId:userid ,cancelled:true,isCompleted:false })
  .populate('teacherId','name subject image');
  res.status(200).json({
    success:true,
    data: list
})

})
// api to cancle  appointment
exports.cancleAppointment =catchasync(async(req,res,next)=>{
const {userid,appointmentId} =req.body
const appointmentData =  await appointmentModel.findById(appointmentId).populate("teacherId",'email').populate("userId",name)
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


  await sendEmail.sendEmail2({
    email: appointmentData.teacherId?.email,
    subject: "❌ تم إلغاء موعد الدرس",
    html: `
      <p>مرحبًا ${student.name}،</p>
      <p>نأسف لإبلاغك بأن الطالب <strong>${appointmentData.userId?.name}</strong> قد قام بإلغاء حجز الدرس التالي:</p>
      <ul>
        <li><strong>التاريخ:</strong> ${appointmentData.slotDate.toDateString()}</li>
        <li><strong>الوقت:</strong> ${appointmentData.slotTime}</li>
      </ul>
      <p>يرجى حجز موعد جديد في الوقت المناسب لك.</p>
      <hr>
      <p>منصة تيليسكوب للخدمات التعليمية</p>
    `,
    text: `تم إلغاء موعد درسك مع الطالب ${appointmentData.userId?.name} بتاريخ ${appointmentData.slotDate}, الساعة ${appointmentData.slotTime}.`
  });

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
  const { userid, maxDistanceKm  } = req.body;
  const studentId=userid
  const student = await userModel.findById(studentId);
  if (!student || !student.location || !student.location.coordinates) {
    return next(new AppError('Student location not found', 404));
  }
console.log(student.location.coordinates,maxDistanceKm)
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
exports.connectWithUs = catchasync(async (req, res, next) => {
const {name,email,message,subject,phone}=req.body
if(!name||!email||!message||!subject||!phone)
{
  return next(new AppError('messing detailes', 400));

}
let q ={}
q.name=name
q.email=email
q.message=message
q.subject=subject
q.phone=phone

const question= await questionModel.create(q);
if(!question)
  {
    return next(new AppError('error in qeustion', 400));
  
  }
  res.status(200).json({
    success: true,
    message: 'successful sending'
  });
});