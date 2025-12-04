// src/sockets/modules/caja.sockets.js

const cajaSockets = (io, socket) => {
	// Cajero abre caja
	socket.on('caja:abrir', (data) => {
		io.emit('caja:caja_nueva', data);
	});

	// Cajero cierra caja
	socket.on('caja:cerrar', (data) => {
		io.emit('caja:cierreEnviado', data);
	});

	// Supervisor valida cierre
	socket.on('caja:verificacion', (data) => {
		io.emit('caja:verificacionActualizada', data);
	});
};

export default cajaSockets;
