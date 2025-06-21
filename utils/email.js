const nodemailer =require('nodemailer')
require('dotenv').config();
const { Resend } = require('resend');

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



const sendEmail3 = async (option) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: '"Telescope for IT Services" <onboarding@resend.dev>',
      to: [option.email],
      subject: option.subject,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1 style="color: #4a90e2;">مرحباً بك!</h1>
          <p>${option.message}</p>
        </div>
      `,
    });

    console.log('📨 Response');
  } catch (error) {
    console.error('❌ failed:', error?.message || error);
  }
};

module.exports = { sendEmail3 };
