const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async ({ userId, message }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: `${userId}@example.com`, // placeholder
    subject: 'Notification',
    text: message,
  });
};
