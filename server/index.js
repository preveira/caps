
'use strict';

const io = require('socket.io');
const { StandardQueue, FifoQueue } = require('../server/lib/queue.js');

const PORT = process.env.PORT || 3000;

const server = new io.Server(PORT);
const capsServer = server.of('/caps');

const pickups = new FifoQueue('pickups'); 
const inTransits = new StandardQueue('inTransits'); 
const deliveries = new StandardQueue('deliveries');


capsServer.on('connection', (socket) => {
  console.log('Client has connected to package notification');
  capsServer.emit('newClient', 'A new Client has joined!!');

  socket.on('join', (payload) => {
    console.log('JOIN EVENT', payload.clientId, payload.vendorId);
    socket.join(payload.vendorId);
    capsServer.emit('join', payload.clientId + ' has joined the banking app!');
  });

  socket.on('pickup', (payload) => {
    pickups.add(payload);
    console.log('PICKUP EVENT', payload);
    capsServer.to(payload.store).emit('pickup', payload);
    console.log('I AM THE PICKUP QUEUE', pickups);
  });

  socket.on('inTransit', (payload) => {
    console.log('IN TRANSIT EVENT', payload);
    inTransits.set(payload.orderId, payload);
    capsServer.to(payload.store).emit('inTransit', payload);
  });

  socket.on('delivered', (payload) => {
    inTransits.remove(payload.orderId);
    console.log('DELIVERED EVENT', payload);
    capsServer.to(payload.store).emit('delivered', payload);
    deliveries.set(payload.orderId, payload);
  });

  socket.on('getPendingPickups', () => {
    console.log('sending out pending pickups.');
    
    Object.values(pickups.data).forEach(pickup => {
      capsServer.emit('pickup', pickup);
    });
    pickups.data = [];
  });

  socket.on('getPendingDeliveries', (payload) => {
    console.log('sending out pending deliveries', payload);
    Object.values(deliveries.data).forEach(delivery => {
      capsServer.to(payload.vendorId).emit('delivered', delivery);
    });

    deliveries.data = {};
  });
});