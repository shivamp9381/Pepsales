const Notification = require('../models/Notification');
const { sendToQueue } = require('../producers/notificationProducer');

exports.sendNotification = async (req, res) => {
  const { userId, type, message } = req.body;
  const notification = await Notification.create({ userId, type, message });

  await sendToQueue(notification);

  res.status(201).json({ message: 'Notification queued', notification });
};

exports.getUserNotifications = async (req, res) => {
  const notifications = await Notification.find({ userId: req.params.id });
  res.json(notifications);
};
