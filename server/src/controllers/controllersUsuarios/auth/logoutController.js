import sanitizarUsuario from '../../../helpers/sanitizadores/sanitizarUsuario.js';
import Usuarios from '../../../models/Usuarios.js';

const logoutController = async (dataUpdate, id) => {
	try {
		await Usuarios.findByIdAndUpdate(id, dataUpdate);
		const logout = await Usuarios.findById(id);

		const logoutSanitizado = sanitizarUsuario(logout);

		if (!logout.userStatus) return logoutSanitizado;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export default logoutController;
