import Usuarios from '../../../models/Usuarios.js';
import sanitizarUsuario from '../../../helpers/sanitizadores/sanitizarUsuario.js';

const usuarioAutenticado = async (id) => {
	const usuario = await Usuarios.findById(id)
		.select('-password')
		.populate('movimientos')
		.populate('facturas')
		.populate({
			path: 'caja',
			populate: {
				path: 'facturas',
			},
		});

	if (!usuario) throw new Error('Usuario no encontrado');

	// Validamos si el admin lo desconectó remotamente
	if (!usuario.userStatus) throw new Error('Vuelva a iniciar sesion');

	const usuarioPlano = usuario.toObject();

	const usuarioSeguro = sanitizarUsuario(usuarioPlano);

	return usuarioSeguro;
};

export default usuarioAutenticado;
