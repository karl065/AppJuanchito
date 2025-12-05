import Usuarios from '../../../models/Usuarios.js';
import sanitizarUsuario from '../../../helpers/sanitizadores/sanitizarUsuario.js';

const usuarioAutenticado = async (id) => {
	const usuario = await Usuarios.findById(id)
		.select('-password')
		.populate('dispositivos')
		.populate('movimientos')
		.populate('facturas')
		.populate({
			path: 'caja', // 1. Entramos a 'caja'
			populate: {
				path: 'facturas', // 2. Dentro de 'caja', poblamos 'facturas'
			},
		});

	if (!usuario) throw new Error('Usuario no encontrado');

	if (!usuario.userStatus) throw new Error('Vuelva a iniciar sesion');

	const usuarioPlano = usuario.toObject();

	const usuarioSeguro = sanitizarUsuario(usuarioPlano);

	return usuarioSeguro;
};

export default usuarioAutenticado;
