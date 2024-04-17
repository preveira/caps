

const event = require('../eventPool.js');

event.on('pickUp', (payload) => {
  event.emit('inTransit', payload);
});

event.on('delivered', (payload) => {

});

//handles transit and delivery messages