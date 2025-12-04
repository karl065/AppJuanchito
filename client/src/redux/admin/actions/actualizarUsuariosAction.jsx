import { emitEvent } from '../../../services/sockets/socketServices';
import actualizarUsuariosServices from '../../../services/usuarios/actualizarUsuariosServices';
import { actualizarUsuario } from '../slices/usuariosSlice';

export const actualizarUsuariosAction = async (dispatch, id, dataUsuario) => {
	try {
		const data = await actualizarUsuariosServices(id, dataUsuario);

		const usuarioActualizado = data[0];

		dispatch(actualizarUsuario(usuarioActualizado));

		emitEvent('usuario:actualizado', usuarioActualizado);
	} catch (error) {
		console.log(error);
	}
};
