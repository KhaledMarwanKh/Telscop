const catchasync =require('../utils/catchasync')
const appError = require('../utils/appError')
const jwt = require("jsonwebtoken");
const dotenv =require('dotenv')
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
  console.log(decode.email)
  console.log(process.env.ADMIN_EMAIL)

  if(decode.email!==process.env.ADMIN_EMAIL){
    return next(
      new appError("you are not logged in , please log in to get access", 401),
    );
  }
  next();
});