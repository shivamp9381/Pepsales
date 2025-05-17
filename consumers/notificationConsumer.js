const { connectQueue } = require('../config/rabbitmq');
const { sendEmail } = require('../services/emailService');
const { sendSMS } = require('../services/smsService');
const { sendInApp } = require('../services/inAppService');
const Notification = require('../models/Notification');
const { retryHandler } = require('../utils/retryHandler');

(async () => {
  const channel = await connectQueue();

  channel.consume('notifications', async (msg) => {
    const data = JSON.parse(msg.content.toString());

    try {
      if (data.type === 'email') {
        await sendEmail(data);
      } else if (data.type === 'sms') {
        await sendSMS(data);
      } else if (data.type === 'in-app') {
        await sendInApp(data);
      } else {
        throw new Error(`Unsupported notification type: ${data.type}`);
      }

      await Notification.findByIdAndUpdate(data._id, { status: 'sent' });

      channel.ack(msg);
    } catch (err) {
      console.error(`Error processing notification ${data._id}:`, err.message);

      await retryHandler(data);

      channel.nack(msg, false, false);
    }
  });

  console.log("📨 Notification consumer is running and listening to the queue...");
})();
