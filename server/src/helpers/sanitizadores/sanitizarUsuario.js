import sanitizarDispositivo from './sanitizarDispositivo.js';

const sanitizarUsuario = (usuario) => {
	return {
		_id: usuario._id,
		nombre: usuario.nombre,
		correo: usuario.correo,
		celular: usuario.celular,
		role: usuario.role,
		userStatus: usuario.userStatus,
		movimientos: usuario.movimientos,
		facturas: usuario.facturas,
		caja: usuario.caja,
	};
};

export default sanitizarUsuario;
