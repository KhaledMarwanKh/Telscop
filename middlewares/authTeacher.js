const catchasync =require('../utils/catchasync')
const appError = require('../utils/appError')
const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel');
const teacherModel =require('../models/teacherModel')

exports.authteacher = catchasync(async (req, res, next) => {

  // getting token and check of it's there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {

    return next(
      new appError("you are not logged in , please log in to get access", 401),
    );
  }
  //verfication token
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // check if user still exists
  const currentuser = await teacherModel.findById({ _id:decode.id}).select('-password');
  if (!currentuser) {
    // may be user not still in my database
    return next(
      new appError("the user belonging to this token does no longer exist"),
    );
  }

 //check if user changed password after the token was issued
  if (currentuser.changedPasswordAfter(decode.iat)) {
    return next(
      new appError("user recently changee password!! please log in again", 401),
    );
  }
  req.user = { id: decode.id }; // 👈 هذا هو المعيار في JWT-based auth

  //Grant acces to protcted route

  next();
});

// api for forget  password
  exports.forgetPassword = catchasync(async (req, res, next) => {
    const nteacher = await teacherModel.findOne({ email: req.body.email });
    if (!nuser) {
      return next(new appError("There is no teacher with email address ", 404));
    }
  
    // 2) Generate the random reset token
    const resetCode = nteacher.createPasswordResetCode();
    await nteacher.save({ validateBeforeSave: false });
  
    // 3) Send it to user's email
    try {
      await sendEmail.sendEmail2({
        email: nteacher.email,
        subject: "Your password reset code (valid for 10 minutes)",
        message: `Your password reset code is: <strong>${resetCode}</strong>. It will expire in 10 minutes.`,
        html: `<p>Your password reset code is: <strong>${resetCode}</strong>. It will expire in 10 minutes.</p>`,
      });
      res.status(200).json({
        status: "success",
        message: "token sent to email!",
      });
    } catch (err) {
      nteacher.passwordresetExpired = undefined;
      nteacher.passwordresettoken = undefined;
      await nuser.save({ validateBeforeSave: false });
      return next(err);
    }
  });
// api for reset password
exports.resetPassword = catchasync(async (req, res, next) => {
  // 1) Get user based on the token
  const { email, code, password, passwordConfirm } = req.body;
  const cuser = await teacherModel.findOne({
    email:email,
    resetCode: code,
    resetCodeExpires: { $gt: Date.now() },
  });
  // 2) If token has not expired, and there is user, set the new password
  if (!cuser) {
    return next(new appError("token is invalid or has expired", 400));
  }
  cuser.password = password;
  cuser.passwordConfirm =passwordConfirm;
  cuser.resetCode = undefined;
  cuser.resetCodeExpires = undefined;
  await cuser.save();
  // 4) Log the user in, send JWT
  createSendToken(cuser, 200, res);
});