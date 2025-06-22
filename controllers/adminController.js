const catchasync =require('../utils/catchasync')
const appError = require('../utils/appError')
const validator =require('validator')
const cloudinary = require("cloudinary").v2;
const Teacher =require('../models/teacherModel')
const jwt = require("jsonwebtoken");
const teacherModel = require('../models/teacherModel');
const appointmentModel =require("../models/appointmentModel");
const userModel = require('../models/userModel');
const apiFeatures =require('../utils/apiFeatures')
const generatetoken = (email) =>
  jwt.sign({email: email }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (adminEmail, statusCode, res) => {
  const token = generatetoken(adminEmail);

  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: false,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOption.secure = true;

  res.cookie("jwt", token, cookieOption);

  res.status(statusCode).json({
    status: "success",
    token,
  });
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
exports.loginAdmin = catchasync(async (req, res, next) => {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    createSendToken(email, 201, res);
  } else {
    return next(new appError("Invalid email or password", 400));
  }
});

//---------------------------
exports.statsByTeacher = catchasync(async (req, res, next) => {
  const stats = await appointmentModel.aggregate([
    {
      $match: {
        cancelled: false,
        isCompleted: true
      }
    },
    {
      $group: {
        _id: "$teacherId",
        lessons: { $sum: 1 },
        totalRevenue: { $sum: "$price" },
        uniqueStudents: { $addToSet: "$userId" } 
      }
    },
    {
      $lookup: {
        from: "teachers",
        localField: "_id",
        foreignField: "_id",
        as: "teacherData"
      }
    },
    { $unwind: "$teacherData" },
    {
      $project: {
        _id: 0,
        teacherName: "$teacherData.name",
        subject: "$teacherData.subject",
        lessons: 1,
        totalRevenue: 1,
        studentCount: { $size: "$uniqueStudents"}
      }
    },
    { $sort: { totalRevenue: -1 } }
  ]);

  res.status(200).json({
    status: "success",
    data: stats
  });
});
//-----------------------------

//api to get number treacher for each class
exports.teacherByClass =catchasync(async(req,res,next)=>{
  const classCount = await teacherModel.aggregate([
    { $unwind: "$Class" }, 
    { 
      $group: {
        _id: "$Class",      
        teacherCount: { $sum: 1 } 
      }
    },
    { $sort: { _id: 1 } } 
  ]);
  res.status(200).json({
    success: true,
    data: classCount.map(e => ({
      class: e._id,
      count: e.teacherCount
    }))
  });

})
//-----------------------------

exports.getNewTeachers=catchasync(async(req,res,next)=>{
  const teacher =await teacherModel.find({activate:false,checkAdmin:false})
res.status(200).json({
  success:true,
  data:teacher
})
})
//------------------------------------------
exports.acceptOrRejectTeacher = catchasync(async (req, res, next) => {
  const { state, teacherId } = req.body;

  if (state === false) {
    const deletedTeacher = await userModel.findByIdAndDelete(teacherId);
    if (!deletedTeacher) {
      return res.status(404).json({
        status: 'fail',
        message: 'Teacher not found for deletion'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Teacher rejected and deleted successfully'
    });
  }

  const updatedTeacher = await userModel.findByIdAndUpdate(
    teacherId,
    { checkAdmin: true, activate: true },
    { new: true }
  );

  if (!updatedTeacher) {
    return next(new appError("teacher not found", 404));

  }

  res.status(200).json({
    status: 'success',
    message: 'Teacher accepted and activated successfully',
    data: updatedTeacher
  });
});
//-------------------------------
exports.getGeneralInformation=catchasync(async(req,res,next)=>{
  
  const students =await userModel.find({}).select('-password')
  const teachers_activate =await teacherModel.find({activate:true}).select('-password')
const appointments =await appointmentModel.find({isCompleted:true})
  const l =students.length
  const l2 =teachers_activate.length
  const l3 =appointments.length
  const totalRevenueResult = await appointmentModel.aggregate([
    { $match: { isCompleted: true } },
    { $group: { _id: null, totalRevenue: { $sum: "$price" } } }
  ]);
  
  const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;
  
  res.status(200).json({
    studentsCount: l,
    activeTeachersCount: l2,
    completedAppointmentsCount: l3,
    totalRevenue: totalRevenue
  });

})
//-----------------------------

exports.statsByDateRange = catchasync(async (req, res, next) => {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return next(new appError("Please provide both startDate and endDate", 400));
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

   const features = new apiFeatures( appointmentModel.find({
    slotDate: { $gte: start, $lte: end }
  }),req.query)
      .filter()
      .sorting()
      .limitField()
      .pagination();
    const appointments = await features.query;;

  const completedLessons = appointments.filter(a=>a.isCompleted).length;
  const cancelledLessons = appointments.filter(a => a.cancelled).length;
  const totalRevenue = appointments.reduce((sum, a) => {
    if (!a.cancelled && a.isCompleted) {
      return sum + (a.price || 0);
    }
    return sum;
  }, 0);
  
  res.status(200).json({
    success: true,
    data: {
      completedLessons,
      cancelledLessons,
      totalRevenue,
    }
  });
});
//-----------------------------------
//API to get completed appointments
exports.adminCompletedAppointments = catchasync(async (req, res, next) => {
  const appointments = await appointmentModel
    .find({ isCompleted: true })
    .populate('userId','-image')
    .populate('teacherId');

  res.status(200).json({
    success: true,
    data: appointments
  });
});

// API to get cancelled appointments
exports.adminCancelledAppointments = catchasync(async (req, res, next) => {
  const appointments = await appointmentModel
    .find({ cancelled: true })
    .populate('userId','-image')
    .populate('teacherId');

  res.status(200).json({
    success: true,
    data: appointments
  });
});

// API to get current (ongoing) appointments
exports.adminCurrentAppointments = catchasync(async (req, res, next) => {
  const appointments = await appointmentModel
    .find({ isCompleted: false, cancelled: false })
    .populate('userId','-image')
    .populate('teacherId');

  res.status(200).json({
    success: true,
    result:appointments.length,
    data: appointments
  });
});

//------------------------
exports.adminAppointments = catchasync(async (req, res, next) => {
  const query = appointmentModel.find({ cancelled: false })
    .populate({
      path: 'userId',
      select: 'name Class'
    })
    .populate({
      path: 'teacherId',
      select: 'name subject '
    });

  const features = new apiFeatures(query, req.query)
    .filter()
    .sorting()
    .limitField()
    .pagination();

  const appointments = await features.query;

  res.status(200).json({
    success: true,
    results: appointments.length,
    data: appointments
  });
});
//------------------------

// api to get all students
exports.allStudents = catchasync(async (req, res, next) => {
  const filterClass = req.query.filterClass;

  const studentLessons = await userModel.aggregate([

    {
      $match: {
        Class: { $exists: true }  // نتأكد فقط أن لديه صف دراسي (طالما هو طالب)
      }
    },
    ...(filterClass
      ? [{ $match: { Class: Number(filterClass) } }]
      : []),
    {
      $lookup: {
        from: "appointments",
        localField: "_id",
        foreignField: "userId",
        as: "appointments"
      }
    },
    {
      $addFields: {
        lessonsCount: {
          $size: {
            $filter: {
              input: "$appointments",
              as: "appt",
              cond: { $eq: ["$$appt.isCompleted", true] }
            }
          }
        }
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        class: "$Class",
        address: 1,
        lessonsCount: 1
      }
    },
    { $sort: { lessonsCount: -1 } }
  ]);

  res.status(200).json({
    status: "success",
    result: studentLessons.length,
    data: studentLessons,
  });
});

//-----------------------
exports.studentsByClass = catchasync(async (req, res, next) => {
  const stats = await userModel.aggregate([
    {
      $group: {
        _id: "$Class",
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 } 
    }
  ]);

  res.status(200).json({
    success: true,
    data: stats.map(e => ({
      class: e._id,
      count: e.count
    }))
  });
});
//-----------------------------


exports.allActivateTeachers = catchasync(async(req,res,next)=>{

  const teachers_activate =await teacherModel.find({activate:true}).select('-password')
  res.status(200).json({
    status: "success",
    number_activate:teachers_activate.length,
    teacher_activate: teachers_activate,
  });
})

exports.cancelAppointment =catchasync(async(req,res,next)=>{
const {appointmentId} =req.body
const appointmentData =  await appointmentModel.findById(appointmentId)
if(!appointmentData){
return next(new appError("this appointment not found",404))  
}
await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

const {teacherId,slotDate,slotTime}=appointmentData
const teacherData= await teacherModel.findById(teacherId)
let slots_booked=teacherData.slots_booked
console.log(teacherData)
slots_booked[slotDate]= slots_booked[slotDate].filter(e=> e!==slotTime)

await teacherModel.findByIdAndUpdate(teacherId,{slots_booked})
 
res.status(200).json({
  success:true,
  message:"Appoinrment cancelled"
})
})

// exports.adminDashboard=catchasync(async(req,res,next)=>{

// const teachers = await teacherModel.find({})
// const users =await userModel.find({})
// const appointments =await appointmentModel.find({})
// const dash_data ={
//   teachers :teachers.length,
//   appointments:appointments.length,
//   students :users.length,
//   latest_appointments: appointments.slice(-5).reverse()
// }
// res.status(200).json({
//   success:true,
//   data:dash_data
// })

// })

// api to get number students for each class
