const catchasync =require('../utils/catchasync')
const appError = require('../utils/appError')
const validator =require('validator')
const cloudinary = require("cloudinary").v2;
const Teacher =require('../models/teacherModel')
const jwt = require("jsonwebtoken");
const teacherModel = require('../models/teacherModel');
const appointmentModel =require("../models/appointmentModel");
const userModel = require('../models/userModel');
const apiFeatures =require('../utils/apiFeatures');
const questionModel = require('../models/questionsModel');
const sendEmail =require('../utils/email')


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

  const admins =await userModel.find({email:email,role:"admin"})
  if(!admins){
    return next(new appError("Invalid email or password", 400));
  }
const correct=  admins.correctpassword(password,admins.password)
if(!correct){
  return next(new appError("Invalid email or password", 400));
}
    createSendToken(email, 201, res);
});

//---------------------------
exports.statsByTeacher = catchasync(async (req, res, next) => {

  const matchStage = {};

  // فلترة حسب المنطقة
  if (req.query["address.region"]) {
    matchStage["address.region"] = req.query["address.region"];
  }
  
  // فلترة حسب المادة
  if (req.query.subject) {
    matchStage.subject = req.query.subject;
  }
  
  if (req.query.Class) {
    matchStage.Class = { $in: [parseInt(req.query.Class)] };
  }
  

  const stats = await teacherModel.aggregate([
  { $match: matchStage },
    {
      $lookup: {
        from: "appointments",
        localField: "_id",
        foreignField: "teacherId",
        as: "appointments"
      }
    },

    {
      $addFields: {
        filteredAppointments: {
          $filter: {
            input: "$appointments",
            as: "app",
            cond: {
              $and: [
                { $eq: ["$$app.cancelled", false] },
                { $eq: ["$$app.isCompleted", true] }
              ]
            }
          }
        }
      }
    },

    // حساب عدد الدروس والإيرادات وعدد الطلاب
    {
      $project: {
        id:1,
        teacherName: "$name",
        image :"$image",
        amountRequired:"$amountMoneyRequired",
        amountMoneyAllTime:"$amountMoneyAllTime",
        subject: 1,
        lessons: { $size: "$filteredAppointments" },
        studentIds: {
          $map: {
            input: "$filteredAppointments",
            as: "appt",
            in: "$$appt.userId"
          }
        }
      }
    },

    {
      $addFields: {
        studentCount: { $size: { $setUnion: ["$studentIds", []] } }
      }
    },

    {
      $project: {
        studentIds: 0
      }
    },

    // ترتيب حسب الإيرادات
    {
      $sort: { amountMoneyAllTime: -1 }
    }
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
  const query = teacherModel.find({activate:false,checkAdmin:false})
  const features = new apiFeatures(query, req.query)
  .filter()
  .sorting()
  .limitField()
  .pagination();

const teachers = await features.query;

res.status(200).json({
  success:true,
  data:teachers
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
      success: true,
      message: 'Teacher rejected and deleted successfully'
    });
  }

  const updatedTeacher = await teacherModel.findByIdAndUpdate(
    teacherId,
    { checkAdmin: true, activate: true },
    { new: true }
  );

  if (!updatedTeacher) {
    return next(new appError("teacher not found", 404));

  }

  res.status(200).json({
    success: true,
    message: 'Teacher accepted and activated successfully',
    data: updatedTeacher
  });
});
//-------------------------------
exports.getGeneralInformation = catchasync(async (req, res, next) => {
  const [
    studentsCount,
    activeTeachersCount,
    completedAppointmentsCount,
    totalRevenueResult
  ] = await Promise.all([
    userModel.countDocuments({}),
    teacherModel.countDocuments({ activate: true }),
    appointmentModel.countDocuments({ isCompleted: true }),
    teacherModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amountMoneyAllTime" }
        }
      }
    ])
  ]);

  const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;

  res.status(200).json({
    studentsCount,
    activeTeachersCount,
    completedAppointmentsCount,
    totalRevenue
  });
});
//-----------------------------

exports.statsByDateRange = catchasync(async (req, res, next) => {
  const { startDate, endDate } = req.body;

  const dateFilter = {};
  if (startDate) dateFilter.$gte = new Date(startDate);
  if (endDate) dateFilter.$lte = new Date(endDate);

  const matchStage = {
    cancelled: false,
    isCompleted: true
  };

  if (startDate || endDate) {
    matchStage.slotDate = dateFilter;
  }

  const stats = await appointmentModel.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$subject",
        totalRevenue: { $sum: { $multiply: ["$price", 0.05] } },
        lessonsCount: { $sum: 1 }
      }
    },
    {
      $project: {
        subject: "$_id",
        totalRevenue: 1,
        lessonsCount: 1,
        _id: 0
      }
    }
  ]);

  res.status(200).json({
    success: true,
    data: stats
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
  const flt = {
    ...(req.query.cancell !== undefined && { cancelled: req.query.cancell === 'true' }),
    ...(req.query.complete !== undefined && { isCompleted: req.query.complete === 'true' })
  };

  const query = appointmentModel.find(flt)
    .populate({
      path: 'userId',
      select: 'name Class image'
    })
    .populate({
      path: 'teacherId',
      select: 'name subject image'
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
  const filter = {
    role:"student"
  };

  // فلترة حسب الصف
  if (req.query.filterClass) {
    filter.Class = Number(req.query.filterClass);
  }

  // فلترة حسب المنطقة
  if (req.query.region) {
    filter["address.region"] = req.query.region;
  }

  const studentLessons = await userModel.aggregate([
    { $match: filter },

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
        createdAt:1,
        class: "$Class",
        address: 1,
        image:1,
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

  const teachers_activate =await teacherModel.find({checkAdmin:true}).select('-password')
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
const dateKey = new Date(slotDate).toISOString().split('T')[0];
let slots_booked=teacherData.slots_booked
console.log(teacherData)
slots_booked[dateKey]= slots_booked[dateKey].filter(e=> e!==slotTime)

await teacherModel.findByIdAndUpdate(teacherId,{slots_booked})
 
res.status(200).json({
  success:true,
  message:"Appoinrment cancelled"
})
})
exports.activateOrNotActivteTeacher=catchasync(async(req,res,next)=>{
  const teacherId =req.body?.id
  const state =req.body.state
  const teacher =await teacherModel.findByIdAndUpdate(teacherId,{activate:state})
  if(!teacher){
    return next(new appError("teacher not found",404))
  }
  res.status(200).json({
    success:true,
    message: `Teacher has been ${state ? "activated" : "deactivated"}`
  })
})


exports.getMonthlyCounts = catchasync(async (req, res, next) => {
  // تابع لتحويل الرقم لاسم شهر
  const getMonthName = (monthNumber) =>
    new Date(2000, monthNumber - 1).toLocaleString('default', { month: 'long' });

  const aggregateByMonth = async (model) => {
    const result = await model.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      }
    ]);

    const data = {};
    result.forEach(item => {
      data[getMonthName(item._id)] = item.count;
    });

    return data;
  };

  const [teachers, students, lessons] = await Promise.all([
    aggregateByMonth(teacherModel),
    aggregateByMonth(userModel),
    aggregateByMonth(appointmentModel)
  ]);

  const allMonths = new Set([
    ...Object.keys(teachers),
    ...Object.keys(students),
    ...Object.keys(lessons)
  ]);

  const result = {};
  allMonths.forEach(month => {
    result[month] = {
      teachers: teachers[month] || 0,
      students: students[month] || 0,
      lessons: lessons[month] || 0
    };
  });

  res.status(200).json({
    success: true,
    data: result
  });
});
exports.getQuestions = catchasync(async (req, res, next) => {
  const { role, status } = req.body || {};
  const filter = {};

  if (role === "teacher") {
    const teacherEmails = await teacherModel.find({}, "email").lean();
    filter.email = { $in: teacherEmails.map(t => t.email) };
  } else if (role === "student") {
    const studentEmails = await userModel.find({}, "email").lean();
    filter.email = { $in: studentEmails.map(s => s.email) };
  } else if (role === "other") {
    const teacherEmails = await teacherModel.find({}, "email").lean();
    const studentEmails = await userModel.find({}, "email").lean();
    const inList = [...teacherEmails, ...studentEmails].map(x => x.email);
    filter.email = { $nin: inList };
  }

  if (typeof status === "boolean") {
    filter.status = status;
  } else if (typeof status === "string") {
    if (status.toLowerCase() === "true") filter.status = true;
    else if (status.toLowerCase() === "false") filter.status = false;
  }

  const questions = await questionModel.find(filter).lean();

  res.status(200).json({
    success: true,
    data: questions
  });
});
exports.changeStatus = catchasync(async (req, res, next) => {
  const { questionId, status } = req.body;

  if (!questionId) {
    return next(new appError("questionId is required", 400));
  }

  let newStatus = true;
  if (typeof status === "boolean") {
    newStatus = status;
  } else if (typeof status === "string") {
    if (status.toLowerCase() === "false") newStatus = false;
  }

  const q = await questionModel.findByIdAndUpdate(
    questionId,
    { status: newStatus },
    { new: true, runValidators: true }
  );

  if (!q) {
    return next(new appError("Question not found", 404));
  }

  res.status(200).json({
    success: true,
    data: q
  });
});
exports.sendRespons = catchasync(async (req, res, next) => {
  const { message, subject, questionId } = req.body;

  // تحقق من وجود questionId
  if (!questionId) {
    return next(new appError("questionId is required", 400));
  }

  // جيب السؤال من الـ DB
  const q = await questionModel.findById(questionId)

  if (!q) {
    return next(new appError("Question not found", 404));
  }

  await sendEmail.sendEmail2({
    email: q.email,
    subject: subject || "رد على استفسار",
    html: `
      <p>مرحبًا ${q.name || ""},</p>
      <p>${message}</p>
      <hr>
      <p>منصة تيليسكوب للخدمات التعليمية</p>
    `,
    text: message
  });

  res.status(200).json({
    success: true,
    message: "Response sent successfully"
  });
});
exports.payTeacher = catchasync(async (req, res, next) => {
  const { teacherId } = req.body;

  const teacher = await teacherModel.findById(teacherId);

  if (!teacher) {
    return next(new Error('Teacher not found'));
  }

  const currentRequired = teacher.amountMoneyRequired || 0;
  const currentTotal = teacher.amountMoneyAllTime || 0;

  teacher.amountMoneyRequired = 0;
  teacher.amountMoneyAllTime = currentTotal + currentRequired;

  await teacher.save();

  res.status(200).json({ 
    success:true,
    message: "seccessful payment"  });
});

exports.deleteUser = catchasync(async (req, res, next) => {
  const { userId } = req.body || {};

  if (!userId) {
    return next(new AppError("userId is required", 400));
  }

  const u = await userModel.findByIdAndDelete(userId);

  if (!u) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
