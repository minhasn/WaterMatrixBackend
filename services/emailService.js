// // /services/emailService.js
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail', // You can use other email services too
//   auth: {
//     user: 'YOUR_EMAIL@gmail.com', // Your email
//     pass: 'YOUR_EMAIL_PASSWORD',    // Your email password (consider using an app password for security)
//   },
// });

// const sendVerificationEmail = (to, otp) => {
//   const mailOptions = {
//     from: 'YOUR_EMAIL@gmail.com',
//     to: to,
//     subject: 'Email Verification',
//     text: `Your verification code is: ${otp}`,
//   };

//   return transporter.sendMail(mailOptions);
// };

// module.exports = { sendVerificationEmail };
