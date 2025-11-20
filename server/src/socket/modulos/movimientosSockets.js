// src/sockets/modules/movimientos.sockets.js
const movimientosSockets = (io, socket) => {
	socket.on('movimiento:nuevo', (data) => {
		io.emit('movimiento:actualizado', data);
	});
};

export default movimientosSockets;
