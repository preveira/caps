
const Chance = require('chance');
const chance = new Chance(Math.random);

function generatePackage(storeName) {
  
  const packagePayload = {
    store: storeName,
    orderId: chance.guid(),
    customer: `${chance.first()} ${chance.last()}`,
    address: chance.address(),
  };

  console.log(`VENDOR: creating package ${packagePayload.orderId}`);

  return packagePayload;
}

module.exports = generatePackage;