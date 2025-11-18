import Usuarios from '../../../models/Usuarios.js';
import sanitizarUsuario from '../../../helpers/sanitizadores/sanitizarUsuario.js';

const usuarioAutenticado = async (id) => {
	const usuario = await Usuarios.findById(id)
		.select('-password')
		.populate('dispositivos');

	if (!usuario) throw new Error('Usuario no encontrado');

	const usuarioPlano = usuario.toObject();

	const usuarioSeguro = sanitizarUsuario(usuarioPlano);

	return usuarioSeguro;
};

export default usuarioAutenticado;
