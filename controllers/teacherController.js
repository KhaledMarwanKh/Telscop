const teacherModel = require('../models/teacherModel');
const appError = require('../utils/appError');
const catchasync = require('../utils/catchasync');
const jwt = require("jsonwebtoken");
const appointmentModel =require("../models/appointmentModel");
const apiFeatures = require("./../utils/apiFeatures");

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
    { id: id._id},
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );



exports.changeAvailablity =catchasync(async(req,res,next)=>{

const{id }=req.body

const teaData = await teacherModel.findById(id);
await teacherModel.findByIdAndUpdate(id,{available:!teaData.available})
res.status(201).json({
  status: "success",
message :'Availablity changed',
});

})

exports.listTeachers =catchasync(async(req,res,next)=>{
  let filter ={};
  if(req.params.teacherId) filter ={ tour: req.params.teacherId }

  const feature = new apiFeatures(teacherModel.find(filter),req.query)
  .filter()
  .sorting()
  .limitField()
  .pagination();
const docs = await feature.query;
  const teachers = await teacherModel.find({}).select(['-password','-email'])
  res.status(200).json({
    status: "success",
  data :docs
  });
})

// api for teacher login 
exports.login_teacher=catchasync(async(req,res,next)=>{

  const {email,password} =req.body
  const teacher =await teacherModel.findOne({email})
  if(!teacher){
return next(new appError("invalid credentials",404))
  }
  const correct = await teacher.correctpassword(password, teacher.password);
if(correct){
  createSendToken(teacher,201,res)
}
else {
  return next(new appError("invalid credentials",404))
}
})
// API FOR GET TEACHER APPOINTMENTS
exports.appointmentsTeacher= catchasync(async(req,res,next)=>{
  const {teacherId} =req.body
  const appointments = await appointmentModel.find({teacherId})

  res.status(200).json({
    success:true,
    data:appointments
  })
})

// api to mark appointment copmpete

exports.appointmentComplete = catchasync(async(req,res,next)=>{
const {teacherId,appointmentId}=req.body
const appointmentData =await appointmentModel.findById(appointmentId)

if(appointmentData&&appointmentData.teacherId==teacherId){
await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})

res.status(200).json({
  success :true,
  message :"appointment completed"
})
}
else {
  res.status(200).json({
    success :false,
    message :"Mark Filed"
})
}
})
// api to canclled appointment copmpete

exports.appointmentcancelled = catchasync(async(req,res,next)=>{
  const {teacherId,appointmentId}=req.body
  const appointmentData =await appointmentModel.findById(appointmentId)
  
  if(appointmentData&&appointmentData.teacherId==teacherId){
  await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
  
  res.status(200).json({
    success :true,
    message :"appointment cancelled"
  })
  }
  else {
    res.status(200).json({
      success :false,
      message :"cancellation Filed"
  })
  }
  })
  // api to dashboard for doctor 
  exports.teacherDashboard=catchasync(async(req,res,next)=>{
    const {teacherId}=req.body
    const appointments = await teacherModel.find({teacherId})
    let earnings = 0

appointments.map((item)=>{
  if(item.isCompleted||item.payment){
    earnings+=item.amount
  }
})

let students =[]
appointments.map((item)=>{
  if(!students.includes(item.userId)){
    students.push(item.userId)
  }
})

let dashsdata = {
  earnings,
  appointments:appointments.length,
  student :students.length,
latestAppointments:appointments.reverse().slice(0,5)
}

  })

// api to get teacher profile 
exports.teacherProfile =catchasync(async(req,res,next)=>{
  const {teacherId}=req.body
  const profileData=await teacherModel.findById(teacherId).select('-password')
  res.status(200).json({
    success:true ,
    data:profileData
  })
}) 
// api for update profileData
exports.updateTeacherProfile =catchasync(async(req,res,next)=>{
  const{teacherId ,address,available}=req.body 
  await teacherModel.findByIdAndUpdate(teacherId,{address,available})
  res.status(200).json({
    success:true ,
    message:"profile updated"
  })
})