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
  gender: {
    type: String,
    default: 'not selected'
  },
  address: {
    city: { type: String, required: true },
    street: String,
    region: String,
    zip: String
  },
  slots_booked:{
    type:Object,
    default:{}
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true // ← to add createdAt و updatedAt
});

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

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
