const dotenv=require('dotenv')
const express=require('express')
const cors=require('cors')
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const morgan =require('morgan')
const {connectDb} =require('./config/mongodb')
const {connectCloudinary} =require('./config/cloudinary')
const appError =require('./utils/appError')
const globalError = require("./controllers/errorController");
const adminRoute =require('./routes/adminRoute')
const teacherRoute =require('./routes/teacherRoute')
const userRoute =require('./routes/userRoute')

dotenv.config({path : './.env'})
//app config 
const app = express();
const port =process.env.PORT || 4000 ;
app.use('/uploads',express.static('uploads')); // توفير الوصول للملفات المرفوعة

connectDb()
connectCloudinary()
// 1)goblal MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors())

//set securety http method
app.use(helmet());
//limit request from same api
const limiter = rateLimit({
  max: 100, // عدد الطلبات المسموح بها لكل IP خلال 15 دقيقة
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again later.",
});

app.use("/api", limiter);
//Body parser reading data from body into req.body
app.use(express.json());

app.use(cors())
//Data sanitization against nosql query injection
app.use(mongoSanitize());
// data sanitize against xss
app.use(xss());
//prevent parameter pollution
app.use(
  hpp({
    whitelist: [
    ],
  }),
);
// api route for admin
app.use('/api/admin',adminRoute)
app.use('/api/teacher',teacherRoute)
app.use('/api/user',userRoute)


app.all("*", (req, res, next) => {
  // res.status(404)
  // .json({
  //   status:"fail",
  //   message : `can't find ${req.originalUrl} on this server!`
  // })
  const err = new appError(
    `can't find ${req.originalUrl} on this server!`,
    404,
  );
  next(err);
});
app.use(globalError);
const server= app.listen(port,() => {
  console.log("listen to port 4000");
});

