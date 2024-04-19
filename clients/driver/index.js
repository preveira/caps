
'use strict';

const io = require('socket.io-client');
const {transit, deliver} = require('./handler.js');

let socket = io.connect('http://localhost:3000/caps');

socket.on('pickup',(payload) => {
  transit(socket, payload);
  console.log('DRIVER: picked up package', payload.orderId);
});

socket.on('inTransit', (payload) => {
  deliver(socket, payload);
});

socket.emit('getPendingPickups');