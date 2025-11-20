// src/sockets/modules/usuarios.sockets.js
const usuariosSockets = (io, socket) => {
	socket.on('usuario:login', (user) => {
		io.emit('usuario:activo', user);
	});

	socket.on('usuario:logout', (idUsuario) => {
		io.emit('usuario:desconectado', idUsuario);
	});
};

export default usuariosSockets;
