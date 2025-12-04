// src/sockets/modules/usuarios.sockets.js
const usuariosSockets = (io, socket) => {
	socket.on('usuario:login', (usuario) => {
		socket.broadcast.emit('usuario:activo', usuario);
	});

	socket.on('usuario:logout', (usuario) => {
		socket.broadcast.emit('usuario:desconectado', usuario);
	});

	socket.on('usuario:creado', (usuario) => {
		socket.broadcast.emit('usuario:agregar_usuario', usuario);
	});

	socket.on('usuario:actualizado', (usuario) => {
		socket.broadcast.emit('usuario:actualizar_usuario', usuario);
	});

	socket.on('usuario:eliminado', (usuario) => {
		socket.broadcast.emit('usuario:eliminar_usuario', usuario);
	});
};

export default usuariosSockets;
