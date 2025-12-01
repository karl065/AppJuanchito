// src/sockets/modules/movimientos.sockets.js
const movimientosSockets = (io, socket) => {
	socket.on('movimiento:nuevo', (data) => {
		socket.broadcast.emit('movimiento:actualizado', data);
	});
};

export default movimientosSockets;
