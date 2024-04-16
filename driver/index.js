const events = require("../eventPool.js");
const handler = require("./handler.js");

class Driver {
  listen() {
    events.on("pickup", (payload) => handler.transit(events, payload));
    events.on("inTransit", (payload) => handler.delivered(events, payload));
  }
}

module.exports = new Driver();