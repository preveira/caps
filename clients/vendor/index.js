'use strict';

const io = require('socket.io-client');
const generatePackage = require('./handler.js');

let socket = io.connect('http://localhost:3000/caps');

socket.emit('join', {
  clientId: 'vendor',
  vendorId: '1-206-flowers',
});

socket.on('delivered', (payload) => {
  console.log('VENDOR: thank you for delivering package', payload.orderId);
});

socket.emit('getPendingDeliveries', { vendorId: '1-206-flowers' });

//setInterval(() => {
socket.emit('pickup', generatePackage('1-206-flowers'));
//}, 2000);