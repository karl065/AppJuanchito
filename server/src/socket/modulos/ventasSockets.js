// src/sockets/modules/ventas.sockets.js
const ventasSockets = (io, socket) => {
	socket.on('venta:nueva', (data) => {
		io.emit('venta:actualizada', data);
	});
};

export default ventasSockets;
