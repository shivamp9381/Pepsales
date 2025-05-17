const { connectQueue } = require('../config/rabbitmq');
const { sendEmail } = require('../services/emailService');
const Notification = require('../models/Notification');
const { retryHandler } = require('../utils/retryHandler');

(async () => {
  const channel = await connectQueue();
  channel.consume('notifications', async (msg) => {
    const data = JSON.parse(msg.content.toString());
    try {
      if (data.type === 'email') {
        await sendEmail(data);
      }
      // future: SMS, in-app
      await Notification.findByIdAndUpdate(data._id, { status: 'sent' });
      channel.ack(msg);
    } catch (err) {
      await retryHandler(data);
      channel.nack(msg);
    }
  });
})();
