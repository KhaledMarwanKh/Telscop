const catchasync =require('../utils/catchasync')
const appError = require('../utils/appError')
const jwt = require("jsonwebtoken");
const dotenv =require('dotenv')
const userModel =require('../models/userModel')
dotenv.config({path : '../.env'})

exports.authAdmin = catchasync(async (req, res, next) => {

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
  const currentuser = await userModel.findOne({email:decode.email}).select('-password');
  if (!currentuser) {
    // may be user not still in my database
    return next(
      new appError("the user belonging to this token does no longer exist"),
    );
  }

//  check if user changed password after the token was issued
  req.body.adminid =currentuser.id;
  //Grant acces to protcted route

  next();
});