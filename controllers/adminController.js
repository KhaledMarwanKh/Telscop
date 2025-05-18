const catchasync =require('../utils/catchasync')
const appError = require('../utils/appError')
const validator =require('validator')
const cloudinary = require("cloudinary").v2;
const Teacher =require('../models/teacherModel')
const jwt = require("jsonwebtoken");
const teacherModel = require('../models/teacherModel');
const appointmentModel =require("../models/appointmentModel");
const userModel = require('../models/userModel');

const createSendToken = (nuser, statusCode, res) => {
  const token = generatetoken(nuser);
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
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
    data: nuser,
  });
};

const generatetoken = (id) =>
  jwt.sign({ email:id.email,password:id.password }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });



exports.addTeacher = catchasync(async(req,res,next)=>{
const {name,email,password,passwordConfirm,degree,about,experience,gender,address,subject,price}=req.body
const imageFile =req.file

if(!name||!email||!password||!passwordConfirm||!degree||!about||!experience||!gender||!address||!subject||!price){
  return next(new appError("missing details",400))
}
if(!validator.isEmail(email)){
  return next(new appError("please enter a vlid email!!"))
}
if(password.length<8){
  return next(new appError("please enter a strong password",400))
}
// hash password in qeury middleware
//
if(imageFile){
const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
const imageUrl =imageUpload.secure_url}
const teacherData ={
  name,email,password,passwordConfirm,degree,about,experience,gender,address,subject,date:Date.now(),price:Number(price)
}
const teacher =await Teacher.create(teacherData)
res.status(201).json({
  status: "success",
  data: teacherData,
});

})

exports.loginAdmin = catchasync(async(req,res,next)=>{
const {email,password} =req.body
if(email ===process.env.ADMIN_EMAIL&&password===process.env.ADMIN_PASSWORD){
  createSendToken(req.body,201, res);

}
else{
  return next(new appError('invalid email or password',400))
}
}

)

exports.allTeachers = catchasync(async(req,res,next)=>{

  const teachers =await teacherModel.find({}).select('-password')

  res.status(200).json({
    status: "success",
    result:teachers.length,
    data: teachers,
  });
})
//API to get all appointments
exports.adminAppointments=catchasync(async(req,res,next)=>{

  const appointments = await appointmentModel.find({})
  res.status(200).json({
    success:true,
    data:appointments
  })
})
exports.cancelAppointment =catchasync(async(req,res,next)=>{
  const {appointmentId} =req.body
const appointmentData =  await appointmentModel.findById(appointmentId)

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

exports.adminDashboard=catchasync(async(req,res,next)=>{

const teachers = await teacherModel.find({})
const users =await userModel.find({})
const appointments =await appointmentModel.find({})
const dash_data ={
  teachers :teachers.length,
  appointments:appointments.length,
  students :users.length,
  latest_appointments :[...appointments].reverse().slice(0,5)
}
res.status(200).json({
  success:true,
  data:dash_data
})

})