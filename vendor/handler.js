const Chance = require("chance");

const chance = new Chance();

function onNewPackage(payload) {
  return (payload = {
    store: chance.word({ length: 5 }),
    orderID: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  });
}

module.exports = onNewPackage;