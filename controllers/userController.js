const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchasync = require("../utils/catchasync");
const AppError = require("../utils/appError");
const teacherModel = require("../models/teacherModel");
const appointmentModel =require("../models/appointmentModel")
const cloudinary= require('cloudinary').v2
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
    { email: id.email, password: id.password },
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
exports.appointment =catchasync(async(req,res,next)=>{
  const{userid,teacherId,slotDate,slotTime} =req.body

  const teacherData = await teacherModel.findById(teacherId).select('-password')

  if(!teacherData.available){
    return next(new AppError("teacher is not available",400));
  }
  let slots_booked =teacherData.slots_booked
  if(slots_booked[slotDate]){
    if(slots_booked[slotDate].includes(slotTime))
      return next(new AppError("Slot not available", 400));
    else{
      slots_booked[slotDate].push(slotTime)
    }
  }
  else{
    slots_booked[slotDate]=[]
    slots_booked[slotDate].push(slotTime)
  }
  const userData =await userModel.findById(userid).select('-password')

  delete teacherData.slots_booked
  const appointmentData ={userId:userid,
    teacherId,
    userData,
    teacherData,
    amount:teacherData.price,
    slotDate,
    slotTime,
    date:Date.now()
  }

    const newAppointment =await appointmentModel.create(appointmentData)
    const x = await teacherModel.findByIdAndUpdate(
      teacherId,
      { $set: { slots_booked: slots_booked } }, // تحديث فقط slots_booked
      { new: true }
  );
res.status(201).json({
  success:true,
  message:"Appointment Booked"
})
})

// api to get user appointments for my appointment page
exports.listAppointment =catchasync(async(req,res,next)=>{
  const {userid}=req.body
  const list = await appointmentModel.find({ userId: userid ,cancelled:false });
  res.status(200).json({
    success:true,
    data: list
  })

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