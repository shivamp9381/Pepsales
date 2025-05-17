// const { connectQueue } = require('../config/rabbitmq');
// const { sendEmail } = require('../services/emailService');
// const Notification = require('../models/Notification');
// const { retryHandler } = require('../utils/retryHandler');

// (async () => {
//   const channel = await connectQueue();
//   channel.consume('notifications', async (msg) => {
//     const data = JSON.parse(msg.content.toString());
//     try {
//       if (data.type === 'email') {
//         await sendEmail(data);
//       }
//       // future: SMS, in-app
//       await Notification.findByIdAndUpdate(data._id, { status: 'sent' });
//       channel.ack(msg);
//     } catch (err) {
//       await retryHandler(data);
//       channel.nack(msg);
//     }
//   });
// })();



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
      // Process the notification based on its type
      if (data.type === 'email') {
        await sendEmail(data);
      } else if (data.type === 'sms') {
        await sendSMS(data);
      } else if (data.type === 'in-app') {
        await sendInApp(data);
      } else {
        throw new Error(`Unsupported notification type: ${data.type}`);
      }

      // Update status in DB
      await Notification.findByIdAndUpdate(data._id, { status: 'sent' });

      // Acknowledge message
      channel.ack(msg);
    } catch (err) {
      console.error(`Error processing notification ${data._id}:`, err.message);

      // Retry logic
      await retryHandler(data);

      // Nack the message (could requeue based on RabbitMQ config)
      channel.nack(msg, false, false); // false to discard from queue after retryHandler
    }
  });

  console.log("📨 Notification consumer is running and listening to the queue...");
})();
