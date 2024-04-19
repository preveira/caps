
function transit(socket, payload) {
  socket.emit('join', {
    clientId: 'driver', 
    vendorId: payload.store, 
  });
  socket.on('join', console.log);
  socket.emit('inTransit', payload);
  console.log('DRIVER: picked up package', payload.orderId);
}

function deliver(socket, payload) {
  socket.emit('delivered', payload);
  console.log('DRIVER: delivered package', payload.orderId);
}

module.exports = {
  transit,
  deliver,
};