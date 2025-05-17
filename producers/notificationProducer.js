const { connectQueue, getChannel } = require('../config/rabbitmq');

exports.sendToQueue = async (notification) => {
  const channel = getChannel() || await connectQueue();
  channel.sendToQueue('notifications', Buffer.from(JSON.stringify(notification)));
};
