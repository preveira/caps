function transit(events, payload) {
  console.log("DRIVER", "picked up", payload.orderID);
  events.emit("inTransit", payload);
}

function delivered(events, payload) {
  console.log("DRIVER", "delivered", payload.orderID);
  events.emit("delivered", payload);
}

module.exports = { transit, delivered };