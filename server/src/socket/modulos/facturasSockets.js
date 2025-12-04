// src/sockets/modules/ventas.sockets.js
const facturasSockets = (io, socket) => {
	socket.on('factura:creada', (data) => {
		io.emit('factura:agregar_factura', data);
	});
};

export default facturasSockets;
