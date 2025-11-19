import Usuarios from '../../../models/Usuarios.js';

const logoutController = async (dataUpdate, id) => {
	try {
		await Usuarios.findByIdAndUpdate(id, dataUpdate);
		const logout = await Usuarios.findById(id);

		if (!logout.userStatus)
			return { msn: 'Usuario desconectado correctamente' };
	} catch (error) {
		return error;
	}
};

export default logoutController;
