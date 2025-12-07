import sanitizarUsuario from '../../helpers/sanitizadores/sanitizarUsuario.js';
import Usuarios from '../../models/Usuarios.js';
import bcryptjs from 'bcryptjs';

const putControllerUsuario = async (dataUpdate, id) => {
	try {
		if (dataUpdate.password) {
			const { password } = dataUpdate;

			const passCrypt = await bcryptjs.hash(password, 10);

			dataUpdate.password = passCrypt;
		}

		if (dataUpdate.usuario) {
			await Usuarios.findByIdAndUpdate(id, {
				$push: { impresoras: dataUpdate._id },
			});
		}

		await Usuarios.findByIdAndUpdate(id, dataUpdate);
		const usuarioActualizado = await Usuarios.findById(id)
			.populate('dispositivos')
			.populate('caja');

		const usuarioPlano = [usuarioActualizado.toObject()];

		const usuariosSanitizados = usuarioPlano.map((u) => sanitizarUsuario(u));

		return usuariosSanitizados;
	} catch (error) {
		return error;
	}
};

export default putControllerUsuario;
