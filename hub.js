
const event = require('./eventPool.js');

function showPayloadMessage(payload, type) {
  console.log('EVENT: ', {
    event: type,
    time: new Date().toISOString(),
    payload: payload,
  });
}

event.on('pickup', (payload) => {
  showPayloadMessage(payload, 'pickup');
});

event.on('inTransit', (payload) => {
  showPayloadMessage(payload, 'in-transit');
});

event.on('delivered', (payload) => {
  showPayloadMessage(payload, 'delivered');
});

require('./driver');
require('./vendor');