const nodemailer =require('nodemailer')

// const sendEmail =async(options)=>{
//   //1) Create transporter 

// const tranporter =await nodemailer.createTransport({
//    host:process.env.HOST,
//    port: process.env.PORT_EMAIL,
//   auth :{
//     user : process.env.USER_NAME,
//     pass : process.env.PASSWORD
//   }
// })

//   //2) Define the Email option
// const mailOptions = {
//   from :"kenan.kh85@outlook.com",
//   to :options.email,
//   subject :options.subject,
//   text :options.message,

// }

//   //3)Actually send the email
// await tranporter.sendMail(mailOptions)
// console.log(process.env.USER_NAME)

// }
const sendEmail2 =async(options)=>{
  //1) Create transporter 

const tranporter =await nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',  
  port: 587,                  
  auth :{
    user :'kenan.kh2223@gmail.com',
    pass : 'rgtp fdqg slzg ydlf'//app password
  }
})
console.log('Email sent to:', options.email);

  //2) Define the Email option
  const mailOptions = {
    from: '"telescope for IT Services" <kenan.kh222@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  

  //3)Actually send the email
await tranporter.sendMail(mailOptions)
console.log(process.env.USER_NAME)

}

module.exports  ={sendEmail2}