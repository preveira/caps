
const event = require('./eventPool.js');

function defineEventMessage(payload, type) {
  console.log({
    event: type,
    time: new Date().toISOString(),
    payload: payload,
  });
}

event.on('pickup', (payload) => {
  defineEventMessage(payload, 'pickup');
});
const events = require("./eventPool");
const driverListening = require("./driver");
const vendor = require("./vendor");

let state = {
  event: "no events yet",
  time: "no time yet",
  payload: {
    store: "store name",
    orderID: "order number",
    customer: "customer name",
    address: "customer address",
  },
};

events.on("pickup", (payload) => {
  state = {
    event: "pickup",
    time: new Date(),
    payload: payload,
  };
  console.log("EVENT:", state);
});

events.on("inTransit", (payload) => {
  state = {
    event: "inTransit",
    time: new Date(),
    payload: payload,
  };
  console.log("EVENT:", state);
});

events.on("delivered", (payload) => {
  state = {
    event: "delivered",
    time: new Date(),
    payload: payload,
  };
  console.log("EVENT:", state);
});

driverListening.listen();
vendor.delivered();

vendor.makePayload();
event.on('inTransit', (payload) => {
  defineEventMessage(payload, 'in-transit');
});

event.on('delivered', (payload) => {
  defineEventMessage(payload, 'delivered');
});

require('./driver');
require('./vendor');


event.emit('create', { store: '1-206-flowers' });