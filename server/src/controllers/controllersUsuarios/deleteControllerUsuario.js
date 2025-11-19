import Usuarios from './../../models/Usuarios.js';

const deleteControllerUsuario = async (id) => {
	try {
		const usuarioEliminado = await Usuarios.findById(id);

		await Usuarios.findByIdAndDelete(id);

		return usuarioEliminado;
	} catch (error) {
		return error;
	}
};

export default deleteControllerUsuario;
