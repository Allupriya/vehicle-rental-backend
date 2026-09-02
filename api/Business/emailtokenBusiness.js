const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const transporter=nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'rentv8005@gmail.com',
    pass:'khhi gyol mfmy arbn'
  }
});

const generateemailtoken=async (email)=>{
  try{  
  const token= jwt.sign({email: email,purpose:'emailtestverify'},'secretkey',{
    expiresIn:'24h'
  });
  const url=``;
  const mailOptions={
    from:'rentv8005@gmail.com',
    to: email,
    subject:'verifying email',
    html: `<h2>Email Verification</h2>
           <p>Click the link below to verify your email:</p>
           <a href="${url}">${url}</a>`
  };
  await transporter.sendMail(mailOptions);
  console.log('verification email sended successfully');
}catch(error){
  console.log('error in sending email: ',error);
}
}

module.exports={generateemailtoken};