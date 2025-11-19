import sanitizarUsuario from '../../helpers/sanitizadores/sanitizarUsuario.js';
import Usuarios from '../../models/Usuarios.js';

const putControllerUsuario = async (dataUpdate, id) => {
	try {
		await Usuarios.findByIdAndUpdate(id, dataUpdate);
		const usuarioActualizado = await Usuarios.findById(id).populate(
			'dispositivos'
		);

		const usuarioPlano = [usuarioActualizado.toObject()];

		const usuariosSanitizados = usuarioPlano.map((u) => sanitizarUsuario(u));

		return usuariosSanitizados;
	} catch (error) {
		return error;
	}
};

export default putControllerUsuario;
