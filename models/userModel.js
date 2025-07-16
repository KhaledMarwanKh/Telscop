const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto =require('crypto')



const userSchema =new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 8,
    select: false,
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
  image:{type:String,
    default:"https://res.cloudinary.com/drdehmblo/image/upload/v1752519481/mafrruccaveblu51bt99.png"
  },
  address: {
    city: { type: String, required: true },
    street: String,
    region: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  Class:{
    type:Number,
    required:true
  },
  gender:{
    type:String,
    default:'not selected'
  },
  phone:{
    type:String,
    default:'000000'
  },
  passwordChangedAt: {
    type: Date,
  },
  birthDate:{
    type:Date,
    required:true
  },
  role: {
    type: String,
    enum: ['admin', 'student'],
    default:"student"
  },
  resetCode: String,
resetCodeExpires: Date
}
,
{timestamps:true}
)

userSchema.pre("save", async function (next) {
  // delete only when password actuly modified
  if (!this.isModified("password")) return next();
  //hash password
  this.password = await bcrypt.hash(this.password, 12);
  //delete password confirm after check our password
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctpassword = async function (
  candidatepassword,
  userpassword,
) {
  // copmare use it for verfy from (password encoded) and (password login)
  return await bcrypt.compare(candidatepassword, userpassword);
};
userSchema.methods.changedPasswordAfter = function (jwttimetamp) {
  if (this.passwordChangedAt) {
    // the time that user do change password
    const changedtimetamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return changedtimetamp > jwttimetamp;
  }
  // false means password not changed
  return false;
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.methods.createPasswordResetCode = function () {
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); 

  this.resetCode = resetCode;
  this.resetCodeExpires = Date.now() + 10 * 60 * 1000; 

  return resetCode;
};
const userModel=mongoose.model('user',userSchema)

module.exports=userModel