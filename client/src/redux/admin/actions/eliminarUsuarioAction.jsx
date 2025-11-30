import eliminarUsuariosServices from '../../../services/usuarios/eliminarUsuariosServices.jsx';
import { eliminarUsuario } from '../slices/usuariosSlice.jsx';

export const eliminarUsuarioAction = async (dispatch, id) => {
	try {
		const { _id } = await eliminarUsuariosServices(id);

		dispatch(eliminarUsuario(_id));
	} catch (error) {
		console.log(error);
	}
};
