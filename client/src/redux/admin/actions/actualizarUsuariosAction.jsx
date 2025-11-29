import actualizarUsuariosServices from '../../../services/usuarios/actualizarUsuariosServices';
import { actualizarUsuario } from '../slices/usuariosSlice';

export const actualizarUsuariosAction = async (dispatch, id, dataUsuario) => {
	try {
		const data = await actualizarUsuariosServices(id, dataUsuario);
		dispatch(actualizarUsuario(data));
	} catch (error) {
		console.log(error);
	}
};
