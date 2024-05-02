const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'wallet-service',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

async function sendMessage(topic, message) {
  try {
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }]
    });
    console.log('Message sent:', message);
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    await producer.disconnect();
  }
}

module.exports = { sendMessage };
