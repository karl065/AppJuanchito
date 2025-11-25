import { cargarUsuarios } from '../slices/usuariosSlice.jsx';
import obtenerUsuariosServices from '../../../services/usuarios/obtenerUsuariosServices.jsx';

export const obtenerUsuariosAction = async (dispatch) => {
	try {
		const data = await obtenerUsuariosServices();

		dispatch(cargarUsuarios(data));
	} catch (error) {
		console.log(error);
	}
};
