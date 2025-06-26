const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcryptjs");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  password: {
    type: String,
    required: true
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
  image: {
    type: String,
    required: false
  },
  certificates: {
    type: [String],
    validate: [arr => arr.length > 0, "At least one certificate is required"],
    required: true
  },  
  Class:{
    type:[Number],
    required:true
  },
  subject: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  experience: {
    type: Number, 
    required: true
  },
  about: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  activate:{
    type:Boolean,
    default:false
  },
  checkAdmin:{
    type:Boolean,
    default:false
  },
  gender: {
    type: String,
    default: 'not selected'
  },
  phone:{
type:String,
required:true
  },
  birthDate:{
    type:Date,
    required:true
  },
  address: {
    city: { type: String, required: true },
    street: String,
    region: String,
  },
  slots_booked:{
    type:Object,
    default:{}
  },
  availableTimes: [
    {
      day: {
        type: String,
        enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        required: true
      },
      slots: {
        type: [String], 
        required: true
      }
    }
  ],
  price: {
    type: Number,
    required: true
  },
  passwordChangedAt: {
    type: Date,
  },
  role:{
    type:String,
    default:"teacher"
  },
  resetCode: String,
  resetCodeExpires: Date
}, {
  timestamps: true // ← to add createdAt و updatedAt
});
teacherSchema.index({location: '2dsphere' });

teacherSchema.methods.changedPasswordAfter = function (jwttimetamp) {
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


teacherSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();

  // encoded password
    this.password = await bcrypt.hash(this.password, 12);

 //delete after save
  this.passwordConfirm = undefined;

  next();
});

teacherSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
teacherSchema.methods.createPasswordResetCode = function () {
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); 

  this.resetCode = resetCode;
  this.resetCodeExpires = Date.now() + 10 * 60 * 1000; 

  return resetCode;
};

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
