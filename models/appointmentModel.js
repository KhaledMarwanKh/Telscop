const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcryptjs");

const appointmentSchema =new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  slotDate:{
    type:Date,
    required:true
  },
  slotTime:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  cancelled:{
    type:Boolean,
    default:false
  },
  isCompleted:{
    type:Boolean,
    default:false
  },
  subject:{
    type :String,
    required:true
  }
},
{timestamps:true}
)

const appointmentModel=mongoose.model('appointment',appointmentSchema)

module.exports=appointmentModel