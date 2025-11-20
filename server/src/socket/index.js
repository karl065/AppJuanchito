// src/sockets/index.js
import cajaSockets from './modulos/cajaSockets.js';
import usuariosSockets from './modulos/usuariosSockets.js';
import ventasSockets from './modulos/ventasSockets.js';
import movimientosSockets from './modulos/movimientosSockets.js';

export default function registerSocketModules(io) {
	io.on('connection', (socket) => {
		console.log('Cliente conectado:', socket.id);

		// Registrar módulos
		cajaSockets(io, socket);
		usuariosSockets(io, socket);
		ventasSockets(io, socket);
		movimientosSockets(io, socket);

		socket.on('disconnect', () => {
			console.log('Cliente desconectado:', socket.id);
		});
	});
}
