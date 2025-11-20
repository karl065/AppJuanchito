// src/sockets/socketServer.js
import { Server } from 'socket.io';
import registerSocketModules from './index.js';

export default function socket(server) {
	const io = new Server(server, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
		},
	});

	console.log('🟢 Socket.io inicializado');

	// Registrar todos los módulos
	registerSocketModules(io);

	return io;
}
