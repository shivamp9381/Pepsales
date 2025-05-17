const Notification = require('../models/Notification');

exports.sendNotification = async (req, res) => {
  try {
    const { userId, type, message, email, phone } = req.body;

    if (!userId || !type || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (type === 'email' && !email) {
      return res.status(400).json({ error: 'Email is required for email notification' });
    }

    if (type === 'sms' && !phone) {
      return res.status(400).json({ error: 'Phone number is required for SMS notification' });
    }

    const notification = new Notification({ userId, type, message, email, phone });
    await notification.save();

    res.status(201).json({ message: 'Notification sent successfully', data: notification });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send notification' });
  }
};
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.id;
    const notifications = await Notification.find({ userId });

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};
