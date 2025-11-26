import sanitizarDispositivo from './sanitizarDispositivo.js';

const sanitizarUsuario = (usuario) => {
	return {
		_id: usuario._id,
		nombre: usuario.nombre,
		correo: usuario.correo,
		celular: usuario.celular,
		role: usuario.role,
		userStatus: usuario.userStatus,
		dispositivos: usuario.dispositivos
			? usuario.dispositivos.map((d) => sanitizarDispositivo(d))
			: [],
	};
};

export default sanitizarUsuario;
