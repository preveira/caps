const newPackage = require("./handler.js");
const events = require("../eventPool.js");

function makePayload() {
  let payload = newPackage();
  events.emit("pickup", payload);
}

function delivered() {
  events.on("delivered", () => {
    console.log("VENDOR", "Thank you for the delivery!");
  });
}

module.exports = { makePayload, delivered };