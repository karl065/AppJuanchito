// src/sockets/modules/movimientos.sockets.js
const movimientosSockets = (io, socket) => {
	socket.on('movimiento:crear', (data) => {
		socket.broadcast.emit('movimiento:nuevo', data);
	});
};

export default movimientosSockets;
