const amqplib = require('amqplib');

let channel;

async function connectQueue() {
  const connection = await amqplib.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue('notifications');
  return channel;
}

module.exports = { connectQueue, getChannel: () => channel };
