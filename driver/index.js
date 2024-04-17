
'use strict';

const io = require('socket.io-client');

let socket = io.connect('http://localhost:3000/caps');

socket.emit('join', {
  clientId: 'driver',
  capsId: 'caps',
});

socket.on('pickup',(payload) => {
  console.log('DRIVER: picked up package', payload.package.orderId);
  socket.emit('inTransit', payload);
  console.log('DRIVER: delivered package', payload.package.orderId);
  socket.emit('delivered', payload);
});

socket.on('join', console.log);