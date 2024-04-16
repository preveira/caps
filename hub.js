const EventEmitter = require('events');
require('./eventpool.js');

const emitter = new EventEmitter();

const state = {
  pickup: false,
  inTransit: false,
  delivered: false,
};

// const order = {
//   pickupStatus: () => {
//     let value = true;
//     emitter.emit('pickup', { pickup: value })
//   },
//   inTransitStatus: () => {
//     let value = true;
//     emitter.emit('inTransit', { inTransit: value })
//   },
//   deliveredStatus: () => {
//     let value = true;
//     emitter.emit('delivered', { delivered: value })
//   }
// }

emitter.on('new order', (payload) => {
  state.pickup = payload.pickup;
  console.log('order has been picked up', state);
});

emitter.on('order in transit', (payload) => {
  state.inTransit = payload.inTransit;
  console.log('order is in transit', state);
});

emitter.on('order delivered', (payload) => {
  state.delivered = payload.delivered;
  console.log('order delivered', state);
})

require('./driver');
require('./vendor');