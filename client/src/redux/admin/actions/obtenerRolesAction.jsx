import obtenerRolesServices from '../../../services/usuarios/obtenerRolesServices.jsx';
import { cargarRoles } from '../slices/rolesSlice.jsx';

export const obtenerRolesAction = async (dispatch) => {
	try {
		const data = await obtenerRolesServices();
		dispatch(cargarRoles(data));
	} catch (error) {
		console.log(error);
	}
};
