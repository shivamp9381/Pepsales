const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['email', 'sms', 'in-app'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  email: String,
  phone: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Notification', notificationSchema);
