const { sendToQueue } = require('../producers/notificationProducer');

exports.retryHandler = async (data) => {
  console.log(`Retrying notification ${data._id}`);
  await new Promise(resolve => setTimeout(resolve, 5000));
  await sendToQueue(data);
};
