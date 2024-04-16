const event = require('./eventpool');

module.exports = {
  handlePickup: () => {
    event.on('pickup', (payload) => {
      console.log(`Vendor: Package for order ${payload.orderId} has been picked up.`);
    });
  },
};
