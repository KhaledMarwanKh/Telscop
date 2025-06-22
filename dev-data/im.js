const mongoose =require('mongoose')
const dotenv=require('dotenv')
const teacherModel =require('../models/teacherModel')
const userModel =require('../models/userModel')
const appointmentModel =require('../models/appointmentModel')

const fs =require('fs')
const { dirname } = require('path')

dotenv.config({path : '../.env'})
mongoose.connect(process.env.DATABASE)
.then(()=>{
  console.log("success to connect on database")
})

let teachers =JSON.parse(fs.readFileSync(`${__dirname}/appointments.json`,'utf-8'))

const import_data = async ()=>{
  try{
  await appointmentModel.create(teachers,{validateBeforeSave:false})
 console.log("successful") 
  }
  catch(err){
    console.log(err.message)
  }
  process.exit()

}
const delete_all_data = async ()=>{
try{  await appointmentModel.deleteMany()

    console.log('data is deleted')
}
  catch(err){
    console.log(err.message)
  }
  process.exit()

}
if(process.argv[2] ==='--import'){
  import_data()
}
else if (process.argv[2] ==='--delete'){
  delete_all_data()
}