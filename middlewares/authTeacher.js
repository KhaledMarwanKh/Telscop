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
  req.body.teacherId =decode.id;
  //Grant acces to protcted route

  next();
});
