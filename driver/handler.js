const event = require('./eventpool.js');

module.exports = {
  handlePickup: () => {
    event.on('pickup', (payload) => {
      console.log(`Driver: Package ${payload.orderId} picked up and in transit.`);
      event.emit('in-transit', payload);
    });
  },

  handleDelivery: () => {
    event.on('delivered', (payload) => {
      console.log(`Driver: Package ${payload.orderId} delivered.`);
    });
  },
};