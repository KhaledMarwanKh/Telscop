const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcryptjs");


const teacherSchema =new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required :true,
    unique:true
  },
  password :{
    type:String,
    required:true
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm a password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "passwords are not the same",
    },
  },
  image:{
    type :String,
    required:false
  },
  subject:{
    type:String,
    required:true
  },
  degree :{
    type:String,
    required:true
  },
experience:{
  type:String,
  required:true
}
  ,
  about :{
    type:String,
    required:true
  },
  available:{
    type:Boolean,
    default:true
  },
  gender:{
    type:String,
    default:'not selected'
  },
  address:{
    type:Object,
    required:true
  },
  slots_booked:{
    type:Object,
    default:{}
  },
  date:{
    type:Date,
    required:true
  },
  price:{
    type:Number,
    required:true
  }
},{manimize:false}
)

teacherSchema.pre("save", async function (next) {
  // delete only when password actuly modified
  if (!this.isModified("password")) return next();
  //hash password
  this.password = await bcrypt.hash(this.password, 12);
  //delete password confirm after check our password
  this.passwordConfirm = undefined;
  next();
});
teacherSchema.methods.correctpassword = async function (
  candidatepassword,
  userpassword,
) {
  // copmare use it for verfy from (password encoded) and (password login)
  return await bcrypt.compare(candidatepassword, userpassword);
};

const teacherModel=mongoose.model('teacher',teacherSchema)

module.exports=teacherModel