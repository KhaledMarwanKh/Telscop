const catchasync =require('../utils/catchasync')
const appError = require('../utils/appError')
const jwt = require("jsonwebtoken");


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
console.log(decode)
  if(decode.email!==process.env.ADMIN_EMAIL||decode.password !==process.env.ADMIN_PASSWORD){
    return next(
      new appError("you are not logged in , please log in to get access", 401),
    );
  }
  //check if user still exists
  // const currentuser = await user.findById(decode.id);

  // if (!currentuser) {
  //   // may be user not still in my database
  //   return next(
  //     new AppError("the user belonging to this token does no longer exist"),
  //   );
  // }

  // check if user changed password after the token was issued
  // if (currentuser.changedPasswordAafter(decode.iat)) {
  //   return next(
  //     new AppError("user recently changee password!! please log in again", 401),
  //   );
  // }
  // req.user = currentuser;
  //Grant acces to protcted route
  next();
});