// src/sockets/index.js
import cajaSockets from './modulos/cajaSockets.js';
import usuariosSockets from './modulos/usuariosSockets.js';
import movimientosSockets from './modulos/movimientosSockets.js';
import productosSockets from './modulos/inventarioSockets.js';
import facturasSockets from './modulos/facturasSockets.js';

const registerSocketModules = (io) => {
	io.on('connection', (socket) => {
		console.log('Cliente conectado:', socket.id);

		// Registrar módulos
		cajaSockets(io, socket);
		usuariosSockets(io, socket);
		facturasSockets(io, socket);
		movimientosSockets(io, socket);
		productosSockets(io, socket);

		socket.on('disconnect', () => {
			console.log('Cliente desconectado:', socket.id);
		});
	});
};

export default registerSocketModules;
