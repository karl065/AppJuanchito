import { emitEvent } from '../../../services/sockets/socketServices';
import crearUsuariosServices from '../../../services/usuarios/crearUsuariosServices';
import { agregarUsuario } from '../slices/usuariosSlice';

export const crearUsuariosAction = async (dispatch, nuevoUsuario) => {
	try {
		const data = await crearUsuariosServices(nuevoUsuario);

		dispatch(agregarUsuario(data));
		emitEvent('usuario:creado', data);
	} catch (error) {
		console.log(error);
	}
};
