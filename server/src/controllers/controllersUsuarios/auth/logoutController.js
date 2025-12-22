import sanitizarUsuario from '../../../helpers/sanitizadores/sanitizarUsuario.js';
import Usuarios from '../../../models/Usuarios.js';

const logoutController = async (dataUpdate, id) => {
	try {
		await Usuarios.findByIdAndUpdate(id, dataUpdate);
		const logout = await Usuarios.findById(id);

		const logoutSanitizado = sanitizarUsuario(logout);

		return logoutSanitizado;
	} catch (error) {
		console.log(error);
		throw new Error('Error al cerrar sesión en base de datos');
	}
};

export default logoutController;
