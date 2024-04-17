'use strict';

const io = require('socket.io-client');
const generatePackage = require('./handler.js');

let socket = io.connect('http://localhost:3000/caps');

socket.emit('join', {
  clientId: 'vendor',
  capsId: 'caps',
});

socket.on('delivered', (payload) => {
  console.log('VENDOR: thank you for delivering package', payload.package.orderId);
});

setInterval(() => {
  socket.emit('pickup', {package: generatePackage('1-206-flowers'), capsId: 'caps'} );
}, 2000);