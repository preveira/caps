
'use strict';

const io = require('socket.io');

const PORT = process.env.PORT || 3000;

const server = new io.Server(PORT);
const capsServer = server.of('/caps');

capsServer.on('connection', (socket) => {
  console.log('Client has connected to package notification');

  socket.on('join', (payload) => {
    socket.join(payload.capsId);
  });

  socket.on('pickup', (payload) => {
    console.log('PICKUP EVENT', payload.package);
    capsServer.to(payload.capsId).emit('pickup', payload);
  });

  socket.on('inTransit', (payload) => {
    console.log('IN TRANSIT EVENT', payload.package);
    capsServer.to(payload.capsId).emit('inTransit', payload);
  });

  socket.on('delivered', (payload) => {
    console.log('DELIVERED EVENT', payload.package);
    capsServer.to(payload.capsId).emit('delivered', payload);
  });
});