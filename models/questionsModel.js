const mongoose = require('mongoose')
const validator = require("validator");



const questionSchema =new mongoose.Schema({
name:{
  type: String,
  required:true
},
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
subject:{
  type: String,
  required:true
},
phone:{
  type: String,
  required:true
},
message:{
  type: String,
  required:true
}
},
{timestamps:true}
)

const questionModel=mongoose.model('question',questionSchema)

module.exports=questionModel