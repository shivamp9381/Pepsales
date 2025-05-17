const twilio = require('twilio');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.sendSMS = async ({ userId, message }) => {
  const phoneNumber = '+91' + userId; 

  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });

  console.log(`SMS sent to ${phoneNumber}`);
};
