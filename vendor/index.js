const event = require('./eventpool.js');

module.exports = (storeName) => {
  return {
    pickupPackage: () => {
      const payload = {
        store: storeName,
        orderId: generateUniqueId(),
        customer: generateRandomName(),
        address: generateRandomAddress()
      };
      event.emit('pickup', payload);
    },
    listenForDelivery: () => {
      event.on('delivered', (payload) => {
        console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
      });
    }
  };
};